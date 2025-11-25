const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const { isAuthenticated } = require('../middlewares/authMiddleware');

//Configurar Multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype){
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif)'));
    }
};

const upload = multer({
    storage: storage,
    limits : { fileSize: 5 * 1024 * 1024 }, //5MB
    fileFilter: fileFilter
});

//Validaciones 
const productValidation = [
    body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('precio')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
    body('descripcion')
    .trim()
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres')
];

//Rutas
router.get('/', isAuthenticated, productController.listProducts);
router.get('/create', isAuthenticated,productController.createForm);
router.post('/create', isAuthenticated,upload.single('imagen'), productValidation, productController.createProduct);
router.get('/edit/:id', isAuthenticated, productController.editForm);
router.post('/edit/:id', isAuthenticated, upload.single('imagen'), productValidation, productController.updateProduct);
router.post('/delete/:id', isAuthenticated, productController.deleteProduct);

module.exports = router;