require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

//Conectar a MongoDB
connectDB();

// ========== CONFIGURAR CORS DINÁMICO SOLO PARA /api ==========
const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.NETLIFY_URL,
    process.env.BACKEND_URL,
    'http://localhost:5173', // Para desarrollo local
    'http://localhost:3000'
].filter(Boolean); // Eliminar valores undefined

const corsOptions = {
    origin: function (origin, callback) {
        // Permitir requests sin origin (mobile apps, curl, Postman, etc)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('❌ Origen bloqueado por CORS:', origin);
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true
};

// Aplicar CORS solo a rutas /api
app.use('/api', cors(corsOptions));

//Configurar Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        ifEquals: function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Configurar sesiones
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        maxAge: 1000 * 60 * 60 * 24 //24 horas
    }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// ========== ENDPOINT DE HEALTH CHECK ==========
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development',
        mongodb: 'connected'
    });
});

//Rutas existentes (Handlebars)
const productRoutes = require('./routes/products');
const authRoutes =  require('./routes/auth');
const chatRoutes = require('./routes/chat');

app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

//Rutas API REST (para Vue 3)
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

//Ruta principal
app.get('/', (req, res) =>{
    res.redirect('/products');
});

//Iniciar servidor con Socket.io
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server, {
    cors: corsOptions
});

//Configurar Socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    //Escuchar mensajes del chat
    socket.on('chat-message', (data) => {
        console.log('Mensaje recibido:', data);
        //Enviar mensaje a todos los usuarios conectados
        io.emit('chat-message', {
            username: data.username,
            message: data.message,
            timestamp: new Date().toLocaleDateString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            })
        });
    });

    //Usuario desconectado
    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

// ========== INICIAR SERVIDOR EN PUERTO DINÁMICO ==========
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📦 API REST: http://localhost:${PORT}/api`);
    console.log(`💚 Health Check: http://localhost:${PORT}/health`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✅ CORS habilitado para:`, allowedOrigins);
});