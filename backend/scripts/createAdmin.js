require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

console.log('=== Iniciando script de crectión de admin ===');
console.log('MongoDB URI:', process.env.MONGODB_URI);

const createAdmin = async() => {
    try{
        console.log('Intentando conectar a MongoDB...');

        //Conectar a MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MongoDB exitosamente');

        //Verificar si ya existe el usuario admin
        console.log('Verificando si el usuario admin existe...');
        let existingAdmin;
        try{
            existingadmin = await User.findOne({ username: 'admin'});
        }catch (err){
            console.log('Primera vez creando usuarios, continuando...');
            existingAdmin = null;
        }         

        if(existingAdmin){
            console.log('El usuario admin ya existe');
            await mongoose.connection.close();
            console.log('Conexión cerrada');
            process.exit(0);
        }

        console.log('Creando usuario admin...')

        //Crear usuario admin
        const admin = new User({
            username: 'admin',
            password: 'admin123',
            email: 'admin@miinventario.com',
            role: 'admin'
        });

        await admin.save();
        console.log('Usuario admin creado exitosamente');
        console.log(' Credenciales:');
        console.log('Usuario: admin');
        console.log('Contraseña: admin123');
        
        await mongoose.connection.close();
        console.log('Conexión cerrada');
        process.exit(0);
    }catch(error){
        console.error('Error en el script:', error);
        console.error('Error al crear usuario admin:', error);
        await mongoose.connection.close().catch(() => {});
        process.exit(1);
    }
};

createAdmin();