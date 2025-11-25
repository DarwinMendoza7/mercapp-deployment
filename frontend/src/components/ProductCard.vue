<template>
    <div class="product-card">
        <router-link :to="`/product/${product.id}`" class="product-link">
            <div class="product-image-wrapper">
                <img 
                    :src="product.imageUrl" 
                    :alt="product.nombre" 
                    class="product-image"
                    @error="handleImageError"
                />
            </div>

            <div class="product-info">
                <h3 class="product-name">{{ product.nombre }}</h3>
                <p class="product-description">
                    {{ truncateDescription(product.descripcion, 60) }}
                </p>
                <div class="product-price">${{ product.precio.toFixed(2) }}</div>
            </div>
        </router-link>

        <div class="product-actions">
            <button 
                @click.stop="handleAddToCart" 
                class="btn btn-primary btn-add-cart"
                :disabled="isOutOfStock"
            >
                <span v-if="isOutOfStock">Sin stock</span>
                <span v-else>🛒 Agregar</span>
            </button>

            <div class="admin-actions">
                <router-link
                    :to="`/product/${product.id}/edit`"
                    class="btn-icon btn-edit"
                    title="Editar producto"
                >
                    ✏️
                </router-link>
                <button
                    @click.stop="handleDelete"
                    class="btn-icon btn-delete"
                    title="Eliminar producto"
                >
                    🗑️
                </button>    
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
    product: {
        type: Object,
        required: true,
        validator: (value) => {
            return value.id && value.nombre && value.precio
        }
    }
})

// Emits
const emit = defineEmits(['added-to-cart', 'deleted'])

// Computed
const isOutOfStock = computed(() => {
    return props.product.stock !== undefined && props.product.stock === 0
})

// Methods
const handleAddToCart = () => {
    if (!isOutOfStock.value) {
        emit('added-to-cart', props.product)
    }
}

const handleDelete = () => {
    console.log('Clic en eliminar, producto:', props.product) //Debug
    const confirmed = confirm(`¿Estás seguro de eliminar "${props.product.nombre}"?`)
    if(confirmed){
        console.log('Confirmado, emitiendo evento deleted con id:',props.product.id)//Debug
        emit('deleted',props.product.id)
    }
}
const truncateDescription = (text, maxLength) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
}

const handleImageError = (event) => {
    // Si la imagen falla al cargar, usar una imagen por defecto
    event.target.src = 'https://via.placeholder.com/300x300?text=Imagen+no+disponible'
}
</script>

<style scoped>
.product-card {
    background-color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    height: 100%;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-link {
    text-decoration: none;
    color: inherit;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.product-image-wrapper {
    width: 100%;
    height: 250px;
    overflow: hidden;
    background-color: var(--light-color);
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
}

.product-card:hover .product-image {
    transform: scale(1.05);
}

.product-info {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.product-name {
    font-size: 1.2rem;
    color: var(--dark-color);
    margin-bottom: 0.5rem;
    font-weight: 600;
    line-height: 1.4;
}

.product-description {
    color: var(--gray-color);
    font-size: 0.9rem;
    margin-bottom: 1rem;
    flex: 1;
    line-height: 1.5;
}

.product-price {
    font-size: 1.5rem;
    color: var(--secondary-color);
    font-weight: bold;
    margin-bottom: 1rem;
}

.product-actions {
    padding: 0 1.5rem 1.5rem;
}

.btn-add-cart {
    width: 100%;
    padding: 0.75rem;
    font-weight: 600;
}

.btn-add-cart:disabled {
    background-color: var(--gray-color);
    cursor: not-allowed;
    opacity: 0.6;
}

/* Responsive */
@media (max-width: 768px) {
    .product-image-wrapper {
        height: 200px;
    }

    .product-info {
        padding: 1rem;
    }

    .product-name {
        font-size: 1rem;
    }

    .product-price {
        font-size: 1.3rem;
    }
}
</style>