const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true
    },
    imagen:{
        type: String,
        default: 'default.jpg'
    },
    categoryId: {
        type: Number,
        default: 1 //1 = Todos / Sin categoría
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'El stock no puede ser negativo']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);