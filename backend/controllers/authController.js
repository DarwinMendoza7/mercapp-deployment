const User = require('../models/User');
const { validationResult } = require('express-validator');

//Mostrar formulario de login
exports.loginForm = (req, res) => {
    //Si ya está autenticado, redirigir a productos
    if(req.session.user){
        return res.redirect('/products');
    }

    res.render('auth/login', {
        title: 'Iniciar Sesión',
        layout: 'main'
    });
};

//Procesar login
exports.login = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.render('auth/login', {
            title: 'Iniciar Sesión',
            errors: errors.array(),
            username: req.body.username
        });
    }

    try{
        const { username, password } = req.body;

        //Buscar usuario
        const user = await User.findOne({ username });

        if(!user){
            return res.render('auth/login', {
                title: 'Iniciar Sesión',
                error: 'Usuario o contraseña incorrectos',
                username
            });
        }

        //Verificar contraseña
        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.render('auth/login', {
                title: 'Iniciar Sesión',
                error: 'Usuario o contraseña incorrectos',
                username
            });
        }

        //Crear sesión
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        res.redirect('/products');
    }catch(error){
        console.error(error);
        res.render('auth/login', {
            title: 'Iniciar Sesión',
            error: 'Error al iniciar sesión.  Intenta nuevamente.',
            username: req.body.username
        });
    }
};

//Logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.error('Error al cerrar sesión:', err);
            return res.redirect('/products');
        }
        res.redirect('/auth/login');
    });
};

//Mostrar formulario de registro
exports.registerForm = (req, res) => {
    if(req.session.user){
        return res.redirect('/products');
    }

    res.render('auth/register', {
        title: 'Registrarse',
        layout: 'main'
    });
};

//Procesar registro
exports.register = async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.render('auth/register', {
            title: 'Registrarse',
            errors: errors.array(),
            username: req.body.username,
            email: req.body.email
        });
    }

    try{
        const { username, password, email} = req.body;

        //Verificar si el usuario ya existe
        const exisitingUser = await User.findOne({ username });
        if(exisitingUser){
            return res.render('auth/register', {
                title: 'Registrarse',
                error: 'El nombre de usuario ya está en uso',
                username,
                email
            });
        }

        //Crear nuevo usuario
        const user = new User({
            username,
            password,
            email
        });

        await user.save();

        //Crear sesión automáticamente después del registro
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        res.redirect('/products');
    }catch(error){
        console.error(error);
        res.render('auth/register', {
            title: 'Registrarse',
            error: 'Error al crear la cuenta. Intenta nuevamente.',
            username: req.body.username,
            email: req.body.email
        });
    }
};