<template>
    <div class="cart-page">
        <!-- Navbar -->
        <nav class="navbar">
            <div class="container">
                <div class="nav-content">
                    <router-link to="/" class="back-btn">← Volver a la tienda</router-link>
                    <h2>🛒 Mi Carrito</h2>
                    <div></div>
                </div>
            </div>
        </nav>

        <div class="container">
        <!-- Carrito vacío -->
            <div v-if="cartItems.length === 0" class="empty-cart">
                <div class="empty-icon">🛒</div>
                <h2>Tu carrito está vacío</h2>
                <p>Agrega productos para comenzar tu compra</p>
                <router-link to="/" class="btn btn-primary btn-large">
                    Ir a la tienda
                </router-link>
            </div>

            <!-- Carrito con productos -->
            <div v-else class="cart-content">
                <div class="cart-items">
                    <h3>Productos ({{ cartItems.length }})</h3>

                    <div v-for="item in cartItems" :key="item.id" class="cart-item">
                        <img :src="item.imageUrl" :alt="item.nombre" class="item-image" />

                        <div class="item-info">
                            <h4>{{ item.nombre }}</h4>
                            <p class="item-description">{{ item.descripcion.substring(0, 80) }}...</p>
                            <span class="item-price">${{ item.precio.toFixed(2) }} c/u</span>
                        </div>

                        <div class="item-quantity">
                            <button @click="decrementQuantity(item)" class="qty-btn">-</button>
                            <span class="qty-value">{{ item.quantity }}</span>
                            <button @click="incrementQuantity(item)" class="qty-btn">+</button>
                        </div>

                        <div class="item-total">
                            <span class="total-price">${{ (item.precio * item.quantity).toFixed(2) }}</span>
                            <button @click="removeFromCart(item.id)" class="btn-remove">🗑️ Eliminar</button>
                        </div>
                    </div>
                </div>

                <div class="cart-summary">
                    <h3>Resumen del pedido</h3>

                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>${{ total.toFixed(2) }}</span>
                    </div>

                    <div class="summary-row">
                        <span>Envío:</span>
                        <span>Gratis</span>
                    </div>

                    <div class="summary-divider"></div>

                    <div class="summary-row summary-total">
                        <span>Total:</span>
                        <span>${{ total.toFixed(2) }}</span>
                    </div>

                    <button @click="handleCheckout" class="btn btn-primary btn-large btn-block">
                        Proceder al pago
                    </button>

                    <button @click="clearCart" class="btn btn-danger btn-block">
                        Vaciar carrito
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'

const router = useRouter()

const { 
    cartItems, 
    total, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
} = useCart()

const incrementQuantity = (item) => {
    updateQuantity(item.id, item.quantity + 1)
}

const decrementQuantity = (item) => {
    if (item.quantity > 1) {
        updateQuantity(item.id, item.quantity - 1)
    }
}

const handleCheckout = () => {
    console.log('Click en proceder al pago')
    console.log('Carrito:', cartItems.value)
    console.log('Total:', total.value)

    if (cartItems.value.length === 0) {
        alert('Tu carrito está vacío')
        return
    }

    const confirmed = confirm(`¿Confirmar compra por $${total.value.toFixed(2)}?`)

    if (confirmed) {
        alert('¡Compra realizada con éxito! 🎉')
    
        // Limpiar carrito
        cartItems.value = []
        localStorage.removeItem('mercapp_cart')
    
        // Redirigir
        setTimeout(() => {
        router.push('/')
        }, 1500)
    }
}
</script>

<style scoped>
.cart-page {
    min-height: 100vh;
    background-color: #f8f9fa;
    padding-bottom: 3rem;
}

.navbar {
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

.back-btn {
    text-decoration: none;
    color: var(--dark-color);
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    transition: var(--transition);
}

.back-btn:hover {
    background-color: var(--light-color);
}

/* Carrito vacío */
.empty-cart {
    text-align: center;
    padding: 5rem 2rem;
    background-color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
}

.empty-icon {
    font-size: 5rem;
    margin-bottom: 1rem;
}

.empty-cart h2 {
    color: var(--dark-color);
    margin-bottom: 0.5rem;
}

.empty-cart p {
    color: var(--gray-color);
    margin-bottom: 2rem;
}

/* Carrito con productos */
.cart-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
}

.cart-items {
    background-color: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
}

.cart-items h3 {
    margin-bottom: 1.5rem;
    color: var(--dark-color);
}

.cart-item {
    display: grid;
    grid-template-columns: 100px 1fr auto auto;
    gap: 1.5rem;
    padding: 1.5rem;
    border: 1px solid var(--light-color);
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    align-items: center;
}

.item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: var(--border-radius);
}

.item-info h4 {
    margin-bottom: 0.5rem;
    color: var(--dark-color);
}

.item-description {
    color: var(--gray-color);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.item-price {
    color: var(--primary-color);
    font-weight: 600;
}

.item-quantity {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.qty-btn {
    width: 32px;
    height: 32px;
    border: 1px solid var(--light-color);
    background-color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: var(--transition);
}

.qty-btn:hover {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.qty-value {
    font-weight: 600;
    min-width: 30px;
    text-align: center;
}

.item-total {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
}

.total-price {
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--secondary-color);
}

.btn-remove {
    background: none;
    border: none;
    color: var(--danger-color);
    cursor: pointer;
    padding: 0.5rem;
    font-size: 0.9rem;
    transition: var(--transition);
}

.btn-remove:hover {
    text-decoration: underline;
}

/* Resumen */
.cart-summary {
    background-color: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    height: fit-content;
    position: sticky;
    top: 100px;
}

.cart-summary h3 {
    margin-bottom: 1.5rem;
    color: var(--dark-color);
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: var(--gray-color);
}

.summary-divider {
    height: 1px;
    background-color: var(--light-color);
    margin: 1.5rem 0;
}

.summary-total {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--dark-color);
}

.btn-block {
    width: 100%;
    margin-top: 1rem;
}

.btn-large {
    padding: 1rem 2rem;
    font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 968px) {
    .cart-content {
        grid-template-columns: 1fr;
    }

    .cart-item {
        grid-template-columns: 80px 1fr;
        gap: 1rem;
    }

    .item-quantity,
    .item-total {
        grid-column: 2;
    }

    .cart-summary {
        position: static;
    }
}
</style>