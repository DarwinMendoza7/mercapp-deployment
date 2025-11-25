//Middleware para verificar si el usuario está autenticado
exports.isAuthenticated = (req, res, next) => {
    if(req.session && req.session.user){
        return next();
    }
    res.redirect('/auth/login');
};

//Middleware para verificar si el usuario es administrador
exports.isAdmin = (req, res, next) => {
    if(req.session && req.session.user && req.session.user.role === 'admin'){
        return next();
    }
    res.status(403).send('Acceso denegado. Se requieren permisos de administrador');
};

//Middleware para redirigir si ya está autenticado
exports.isGuest = (req, res, next) => {
    if(req.session && req.session.user){
        return res.redirect('/products');
    }
    next();
};