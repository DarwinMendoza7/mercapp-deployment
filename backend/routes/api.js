const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');

// Configurar Multer para la API
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

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif)'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

// Validaciones
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

// Helper para construir URL de imagen
const getImageUrl = (req, imageName) => {
    const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
    return `${baseUrl}/uploads/${imageName}`;
};

// ========== RUTAS API REST ==========

// GET /api/products - Obtener todos los productos
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        
        // Transformar para incluir URL completa de la imagen
        const productsWithImageUrl = products.map(product => ({
            id: product._id,
            nombre: product.nombre,
            precio: product.precio,
            descripcion: product.descripcion,
            imagen: product.imagen,
            imageUrl: getImageUrl(req, product.imagen),
            categoryId: product.categoryId || 1,
            stock: product.stock || 0,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }));

        res.json(productsWithImageUrl);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ 
            error: 'Error al obtener productos', 
            message: error.message 
        });
    }
});

// GET /api/products/:id - Obtener un producto específico
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const productWithImageUrl = {
            id: product._id,
            nombre: product.nombre,
            precio: product.precio,
            descripcion: product.descripcion,
            imagen: product.imagen,
            imageUrl: getImageUrl(req, product.imagen),
            categoryId: product.categoryId || 1,
            stock: product.stock || 0,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };

        res.json(productWithImageUrl);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(500).json({ 
            error: 'Error al obtener el producto', 
            message: error.message 
        });
    }
});

// POST /api/products - Crear un nuevo producto
router.post('/products', upload.single('imagen'), productValidation, async (req, res) => {
    try {
        // Validar errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Validación fallida', 
                errors: errors.array() 
            });
        }

        const { nombre, precio, descripcion } = req.body;
        const imagen = req.file ? req.file.filename : 'default.png';

        //Parsear categoryId y stockcomo números
        const categoryId = req.body.categoryId ? parseInt(req.body.categoryId) : 1;
        const stock = req.body.stock ? parseInt(req.body.stock) : 0;

        const newProduct = new Product({
            nombre,
            precio,
            descripcion,
            imagen,
            categoryId,
            stock
        });

        await newProduct.save();

        const productWithImageUrl = {
            id: newProduct._id,
            nombre: newProduct.nombre,
            precio: newProduct.precio,
            descripcion: newProduct.descripcion,
            imagen: newProduct.imagen,
            imageUrl: getImageUrl(req, newProduct.imagen),
            categoryId: newProduct.categoryId || 1,
            stock: newProduct.stock || 0,
            createdAt: newProduct.createdAt,
            updatedAt: newProduct.updatedAt
        };

        res.status(201).json(productWithImageUrl);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ 
            error: 'Error al crear producto', 
            message: error.message 
        });
    }
});

// PUT /api/products/:id - Actualizar un producto completo
router.put('/products/:id', upload.single('imagen'), productValidation, async (req, res) => {
    try {
        // Validar errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Validación fallida', 
                errors: errors.array() 
            });
        }

        const { nombre, precio, descripcion } = req.body;
        const updateData = { nombre, precio, descripcion };

        //Parsear categoryId y stock como números
        if(req.body.categoryId){
            updateData.categoryId = parseInt(req.body.categoryId);
        }

        if(req.body.stock !== undefined && req.body.stock !== null && req.body.stock !== ''){
            updateData.stock = parseInt(req.body.stock);
        }

        // Si se subió una nueva imagen
        if (req.file) {
            updateData.imagen = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const productWithImageUrl = {
            id: updatedProduct._id,
            nombre: updatedProduct.nombre,
            precio: updatedProduct.precio,
            descripcion: updatedProduct.descripcion,
            imagen: updatedProduct.imagen,
            imageUrl: getImageUrl(req, updatedProduct.imagen),
            categoryId: updatedProduct.categoryId || 1,
            stock: updatedProduct.stock || 0,
            createdAt: updatedProduct.createdAt,
            updatedAt: updatedProduct.updatedAt
        };

        res.json(productWithImageUrl);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(500).json({ 
            error: 'Error al actualizar producto', 
            message: error.message 
        });
    }
});

// PATCH /api/products/:id - Actualizar parcialmente un producto
router.patch('/products/:id', upload.single('imagen'), async (req, res) => {
    try {
        const updateData = {};

        // Solo actualizar campos que se envíen
        if (req.body.nombre) updateData.nombre = req.body.nombre;
        if (req.body.precio) updateData.precio = req.body.precio;
        if (req.body.descripcion) updateData.descripcion = req.body.descripcion;
        if (req.body.categoryId) updateData.categoryId = req.body.categoryId;
        if (req.body.stock !== undefined) updateData.stock = req.body.stock;
        if (req.file) updateData.imagen = req.file.filename;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const productWithImageUrl = {
            id: updatedProduct._id,
            nombre: updatedProduct.nombre,
            precio: updatedProduct.precio,
            descripcion: updatedProduct.descripcion,
            imagen: updatedProduct.imagen,
            imageUrl: getImageUrl(req, updatedProduct.imagen),
            categoryId: updatedProduct.categoryId || 1,
            stock: updatedProduct.stock || 0,
            createdAt: updatedProduct.createdAt,
            updatedAt: updatedProduct.updatedAt
        };

        res.json(productWithImageUrl);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(500).json({ 
            error: 'Error al actualizar producto', 
            message: error.message 
        });
    }
});

// DELETE /api/products/:id - Eliminar un producto
router.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ 
            message: 'Producto eliminado exitosamente',
            product: {
                id: deletedProduct._id,
                nombre: deletedProduct.nombre
            }
        });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(500).json({ 
            error: 'Error al eliminar producto', 
            message: error.message 
        });
    }
});

// GET /api/categories - Obtener categorías (simuladas basadas en productos)
router.get('/categories', async (req, res) => {
    try {
        // categorías 
        const categories = [
            { id: 1, name: 'Todos' },
            { id: 2, name: 'Electrónica' },
            { id: 3, name: 'Hogar' },
            { id: 4, name: 'Deportes' },
            { id: 5, name: 'Ropa' }
        ];

        res.json(categories);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ 
            error: 'Error al obtener categorías', 
            message: error.message 
        });
    }
});

module.exports = router;