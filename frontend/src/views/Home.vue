<template>
    <div>
        <!-- Navbar -->
        <nav class="navbar">
            <div class="container">
                <div class="nav-content">
                    <router-link to="/" class="logo">
                        <h1>🛒 MercApp</h1>
                    </router-link>
                    <div class="nav-links">
                        <router-link to="/" class="nav-link">Inicio</router-link>
                        <router-link to="/about" class="nav-link">Acerca de</router-link>
                        <router-link to="/cart" class="nav-link cart-link">
                            🛒 Carrito
                            <span v-if="cartItemsCount > 0" class="cart-badge">{{ cartItemsCount }}</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="hero">
            <div class="container">
                <h2>Encuentra los mejores productos</h2>
                <p>Calidad y variedad para ti</p>
            </div>
        </section>

        <!-- Filtros y búsqueda -->
        <section class="filters">
            <div class="container">
                <div class="filter-header">
                    <h3>Buscar y filtrar productos</h3>
                    <router-link to="/product/new" class="btn btn-secondary">
                        ➕ Agregar Producto
                    </router-link>
                </div>
        
                <div class="search-bar">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="🔍 Buscar productos..."
                        class="search-input"
                    />
                </div>
        
                <div class="category-filters">
                    <button
                        v-for="category in categories"
                        :key="category.id"
                        @click="selectedCategory = category.id"
                        :class="['category-btn', { active: selectedCategory === category.id }]"
                    >
                        {{ category.name }}
                    </button>
                </div>
            </div>
        </section>

        <!-- Lista de productos -->
        <section class="products-section">
            <div class="container">
                <!-- Loading -->
                <div v-if="loading" class="loading-state">
                    <div class="spinner"></div>
                    <p>Cargando productos...</p>
                </div>

                <!-- Error -->
                <div v-else-if="error" class="error-message">
                    <p>❌ {{ error }}</p>
                    <button @click="loadProducts" class="btn btn-primary">Reintentar</button>
                </div>

                <!-- Productos -->
                <div v-else-if="filteredProducts.length > 0" class="products-grid">
                    <ProductCard
                        v-for="product in filteredProducts"
                        :key="product.id"
                        :product="product"
                        @added-to-cart="handleAddToCart"
                        @deleted="handleDeleteProduct"
                    />
                </div>

                <!-- Sin resultados -->
                <div v-else class="no-results">
                    <p>😕 No se encontraron productos</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import { useProducts } from '@/composables/useProducts'
import { useCart } from '@/composables/useCart'

const router = useRouter()

// Composables
const { products, categories, loading, error, fetchProducts, fetchCategories, deleteProduct } = useProducts()
const { addToCart, getCartItemsCount } = useCart()

// Estado local
const searchQuery = ref('')
const selectedCategory = ref(1) // 1 = "Todos"

// Computadas
const filteredProducts = computed(() => {
    let filtered = products.value

    // Filtrar por categoría (excepto "Todos" que es id 1)
    if (selectedCategory.value !== 1) {
        filtered = filtered.filter(product => product.categoryId === selectedCategory.value)
    }

    // Filtrar por búsqueda
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(product =>
            product.nombre.toLowerCase().includes(query) ||
            product.descripcion.toLowerCase().includes(query)
        )
    }

    return filtered
})

const cartItemsCount = computed(() => getCartItemsCount())

// Métodos
const loadProducts = async () => {
    await fetchProducts()
    await fetchCategories()
}

const handleAddToCart = (product) => {
    addToCart(product)
    // Mostrar mensaje temporal (opcional)
    alert(`✅ ${product.nombre} agregado al carrito`)
}

const handleDeleteProduct = async (productId) => {
    try{
        await deleteProduct(productId)
        alert('✅ Producto eliminado correctamente')
    }catch (err){
        alert('❌ Error al eliminar el producto')
        console.error('Error:',err)
    }
}

// Lifecycle
onMounted(() => {
    loadProducts()
})
</script>

<style scoped>
/* Navbar */
.navbar {
    background-color: white;
    box-shadow: var(--box-shadow);
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
}

.logo {
    text-decoration: none;
    color: var(--primary-color);
}

.logo h1 {
    font-size: 1.8rem;
    font-weight: bold;
}

.nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.nav-link {
    text-decoration: none;
    color: var(--dark-color);
    font-weight: 500;
    transition: var(--transition);
    position: relative;
}

.nav-link:hover {
    color: var(--primary-color);
}

.cart-link {
    background-color: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    position: relative;
}

.cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: var(--danger-color);
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
}

/* Hero */
.hero {
    background: linear-gradient(135deg, #3498db, #2ecc71);
    color: white;
    padding: 3rem 0;
    text-align: center;
}

.hero h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: white;
}

.hero p {
    color: white;
    font-size: 1.2rem;
}

/* Filtros */
.filters {
    background-color: white;
    padding: 2rem 0;
    box-shadow: var(--box-shadow);
}

.filter-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.filter-header h3{
    color: var(--dark-color);
    font-size: 1.2rem;
}
.search-bar {
    margin-bottom: 1.5rem;
}

.search-input {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 2px solid var(--light-color);
    border-radius: var(--border-radius);
    transition: var(--transition);
}

.search-input:focus {
    outline: none;
    border-color: var(--primary-color);
}

.category-filters {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.category-btn {
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--light-color);
    background-color: white;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
    font-weight: 500;
}

.category-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.category-btn.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

/* Productos */
.products-section {
    padding: 3rem 0;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.loading-state,
.no-results {
    text-align: center;
    padding: 3rem 0;
    font-size: 1.2rem;
    color: var(--gray-color);
}

/* Responsive */
@media (max-width: 768px) {
    .nav-content {
        flex-direction: column;
        gap: 1rem;
    }

    .hero h2 {
        font-size: 1.8rem;
    }

    .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
    }
}
</style>