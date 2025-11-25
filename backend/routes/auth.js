const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');

//Validaciones para login
const loginValidation = [
    body('username')
    .trim()
    .notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
];

//Validaciones para registro
const registerValidation = [
    body('username')
    .trim()
    .notEmpty().withMessage('El nombre de usuario es obligatorio')
    .isLength({ min: 3 }).withMessage('El usuario debe tener al menos 3 caracteres'),
    body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min:6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('email')
    .optional()
    .isEmail().withMessage('Debe ser un email válido')
];

//Rutas
router.get('/login', authController.loginForm);
router.post('/login', loginValidation, authController.login);
router.get('/logout', authController.logout);
router.get('/register', authController.registerForm);
router.post('/register', registerValidation, authController.register);

module.exports = router;