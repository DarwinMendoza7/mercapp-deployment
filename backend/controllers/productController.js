const Product= require('../models/Product');
const { validationResult } = require('express-validator');
const fs = require('fs').promises;
const path = require('path');

//Listar todos los productos
exports.listProducts = async (req, res) => {
    try{
        const products = await Product.find().sort('-createdAt');
        res.render('products/list', {
            title: 'Lista de Productos',
            products
        });
    }catch(error){
        console.error(error);
        res.status(500).send('Error al obtener productos');
    }
};

//Mostrar formulario de creación
exports.createForm = (req, res) => {
    res.render('products/form', {
        title: 'Crear Producto',
        product: {}
    });
};

//Crear producto
exports.createProduct = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.render('products/form', {
            title: 'Crear Producto',
            product: req.body,
            errors: errors.array()
        });
    }

    try {
        const { nombre, precio, descripcion, categoryId, stock } = req.body;
        const imagen = req.file ? req.file.filename : 'default.jpg';

        const product = new Product({
            nombre,
            precio,
            descripcion,
            imagen,
            categoryId: categoryId ? parseInt(categoryId) : 1,
            stock: stock ? parseInt(stock) : 0
        });

        await product.save();
        res.redirect('/products');
    }catch (error) {
        console.error(error);
        res.status(500).send('Error al crear producto');
    }
};

//Mostrar formulario de edición
exports.editForm = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).send('Producto no encontrado');
        }

        res.render('products/form', {
            title: 'Editar Producto',
            product,
            isEdit: true
        });
    }catch(error) {
        console.error(error);
        res.status(500).send('Error al obtener producto');
    }
};

//Actualizar producto
exports.updateProduct = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.render('products/form', {
            title: 'Editar Producto',
            product: {_id: req.params.id, ...req.body },
            isEdit: true,
            errors: errors.array()
        });
    }

    try{
        const { nombre, precio, descripcion, categoryId, stock } = req.body;
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).send('Producto no encontrado');
        }

        //Si hay nueva imagen, eliminar la anterior
        if(req.file && product.imagen !== 'default.jpg'){
            const oldImagePath = path.join(__dirname, '../uploads', product.imagen);
            try{
                await fs.unlink(oldImagePath);
            }catch (err){
                console.error('Error al eliminar imagen anterior:', err);
            }
        }

        product.nombre = nombre;
        product.precio = precio;
        product.descripcion = descripcion;
        product.categoryId = categoryId ? parseInt(categoryId) : 1;
        product.stock = stock ? parseInt(stock) : 0;
        if(req.file){
            product.imagen = req.file.filename;
        }

        await product.save();
        res.redirect('/products');
    }catch (error){
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
};

//Eliminar Producto
exports.deleteProduct = async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).send('Producto no encontrado');
        }

        //Eliminar imagen si no es la por defecto
        if(product.imagen !== 'default.jpg'){
            const imagePath = path.join(__dirname, '../uploads', product.imagen);
            try{
                await fs.unlink(imagePath);
            }catch (err){
                console.error('Error al eliminar imagen:', err);
            }
        }

        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    }catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar producto');
    }
};