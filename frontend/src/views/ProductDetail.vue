<template>
    <div class="product-detail-page">
        <!-- Navbar simple -->
        <nav class="navbar">
            <div class="container">
                <div class="nav-content">
                    <router-link to="/" class="back-btn">← Volver</router-link>
                    <router-link to="/" class="logo">🛒 MercApp</router-link>
                    <router-link to="/cart" class="cart-btn">🛒 Carrito</router-link>
                </div>
            </div>
        </nav>

        <div class="container">
            <!-- Loading -->
            <div v-if="loading" class="loading-state">
                <div class="spinner"></div>
                <p>Cargando producto...</p>
            </div>

            <!-- Error -->
            <div v-else-if="error" class="error-message">
                <h2>❌ Error al cargar el producto</h2>
                <p>{{ error }}</p>
                <router-link to="/" class="btn btn-primary">Volver al inicio</router-link>
            </div>

            <!-- Detalle del producto -->
            <div v-else-if="product" class="product-detail">
                <div class="product-image-section">
                    <img :src="product.imageUrl" :alt="product.nombre" class="product-image" />
                </div>

                <div class="product-info-section">
                    <h1 class="product-title">{{ product.nombre }}</h1>

                    <div class="product-price">
                        <span class="price">${{ product.precio.toFixed(2) }}</span>
                    </div>

                    <div class="product-description">
                        <h3>Descripción</h3>
                        <p>{{ product.descripcion }}</p>
                    </div>

                    <div class="product-stock">
                        <span v-if="product.stock && product.stock > 0" class="in-stock">
                            ✅ Disponible ({{ product.stock }} unidades)
                        </span>
                        <span v-else class="out-of-stock">
                            ❌ Sin stock
                        </span>
                    </div>

                    <div class="product-actions">
                        <button 
                            @click="handleAddToCart" 
                            class="btn btn-primary btn-large"
                            :disabled="!product.stock || product.stock === 0"
                            >
                            🛒 Agregar al carrito
                        </button>
                        <router-link to="/" class="btn btn-secondary btn-large">
                            Seguir comprando
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { useProducts } from '@/composables/useProducts'
import { useCart } from '@/composables/useCart'

const route = useRoute()
const router = useRouter()

const { product, loading, error, fetchProductById } = useProducts()
const { addToCart } = useCart()

const handleAddToCart = () => {
    if(product.value){
        addToCart(product.value)
        alert(`${product.value.nombre} agregado al carrito`)
    }
}

onMounted(async () => {
    const productId = route.params.id
    await fetchProductById(productId)

    //Si no se encuentra el producto,redirigir a 404
    if(!loading.value && !product.value && error.value){
        router.púsh('/404')
    }
})
</script>

<style scoped>
.product-detail-page{
    min-height: 100vh;
    background-color: #f8f9fa;
}

.navbar{
    background-color: white;
    box-shadow: var(--box-shadow);
    padding: 1rem 0;
    margin-bottom: 2rem;
}

.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.back-btn,
.cart-btn{
    text-decoration: none;
    color: var(--dark-color);
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    transition: var(--transition);
}

.back-btn:hover,
.cart-btn:hover{
    background-color: var(--light-color);
}

.logo{
    text-decoration: none;
    color: var(--primary-color);
    font-size: 1.5rem;
    font-weight: bold;
}

.product-detail{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    background-color: white;
    padding: 3rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin-bottom: 3rem;
}

.product-image-section{
    display: flex;
    align-items: center;
    justify-content: center;
}

.product-image{
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
}

.product-info-section{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.product-title{
    font-size: 2.5rem;
    color: var(--dark-color);
    margin: 0;
}

.product-price{
    font-size: 2rem;
    color: var(--secondary-color);
    font-weight: bold;
}

.product-description h3{
    color: var(--dark-color);
    margin-bottom: 0.5rem;
}

.product-description p{
    columns: #666;
    line-height: 1.8;
    font-size: 1.1rem;
}

.product-stock{
    padding: 1rem;
    border-radius: var(--border-radius);
    background-color: var(--light-color);
}

.in-stock{
    color: var(--secondary-color);
    font-weight: 600;
}

.out-of-stock{
    color: var(--danger-color);
    font-weight: 600;
}

.product-actions{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
}

.btn-large{
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
}

.btn:disabled{
    opacity: 0.5;
    cursor: not-allowed;
}

.loading-state{
    text-align: center;
    padding: 5rem 0;
}

/* Responsive */
@media (max-width: 768px){
    .product-detail{
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 1.5rem;
    }

    .product-title{
        font-size: 1.8rem;
    }

    .product-price{
        font-size: 1.5rem;
    }
}
</style>