require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB conectado');
    } catch (error) {
        console.error('❌ Error al conectar MongoDB:', error);
        process.exit(1);
    }
};

const updateProducts = async () => {
    try {
        // Actualizar todos los productos para agregar stock y categoryId si no existen
        const result = await Product.updateMany(
            { 
                $or: [
                    { stock: { $exists: false } },
                    { stock: null }
                ]
            },
            { 
                $set: { 
                    stock: 50,  // Stock por defecto
                    categoryId: 2  // Categoría "Electrónica" por defecto
                } 
            }
        );

        console.log(`✅ ${result.modifiedCount} productos actualizados con stock`);

        // Mostrar productos actualizados
        const products = await Product.find();
        console.log('\n📦 Productos en la base de datos:');
        products.forEach(p => {
            console.log(`- ${p.nombre}: Stock: ${p.stock}, CategoryId: ${p.categoryId}`);
        });

    } catch (error) {
        console.error('❌ Error al actualizar productos:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n✅ Conexión cerrada');
    }
};

// Ejecutar
connectDB().then(() => {
    updateProducts();
});