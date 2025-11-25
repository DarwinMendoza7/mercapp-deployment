import { ref, computed, watch } from 'vue'

const CART_STORAGE_KEY = 'mercapp_cart'

// Estado compartido del carrito (singleton)
const cartItems = ref([])

// Inicializar carrito desde localStorage
const initCart = () => {
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (savedCart) {
            cartItems.value = JSON.parse(savedCart)
        }   
    } catch (error) {
        console.error('Error al cargar el carrito:', error)
        cartItems.value = []
    }
}

// Guardar carrito en localStorage
const saveCart = () => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value))
    } catch (error) {
        console.error('Error al guardar el carrito:', error)
    }
}

// Inicializar al cargar el módulo
initCart()

export function useCart() {
    /**
   * Agregar un producto al carrito
   * @param {object} product - Producto a agregar
   * @param {number} quantity - Cantidad (por defecto 1)
   */
    const addToCart = (product, quantity = 1) => {
        const existingItem = cartItems.value.find(item => item.id === product.id)

        if (existingItem) {
            // Si ya existe, incrementar cantidad
            existingItem.quantity += quantity
        } else {
            // Si no existe, agregar nuevo item
            cartItems.value.push({
                id: product.id,
                nombre: product.nombre,
                descripcion: product.descripcion,
                precio: product.precio,
                imageUrl: product.imageUrl,
                quantity: quantity
            })
        }

        saveCart()
    }

    /**
    * Eliminar un producto del carrito
    * @param {string|number} productId - ID del producto
    */
    const removeFromCart = (productId) => {
        cartItems.value = cartItems.value.filter(item => item.id !== productId)
        saveCart()
    }

    /**
    * Actualizar la cantidad de un producto
    * @param {string|number} productId - ID del producto
    * @param {number} quantity - Nueva cantidad
    */
    const updateQuantity = (productId, quantity) => {
        const item = cartItems.value.find(item => item.id === productId)
    
        if (item) {
            if (quantity <= 0) {
                removeFromCart(productId)
            } else {
                item.quantity = quantity
                saveCart()
            }
        }
    }

    /**
    * Vaciar el carrito completamente
    */
    const clearCart = () => {
        if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
            cartItems.value = []
            saveCart()
        }
    }

    /**
    * Obtener la cantidad total de items en el carrito
    */
    const getCartItemsCount = () => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0)
    }

    /**
    * Calcular el total del carrito
    */
    const total = computed(() => {
        return cartItems.value.reduce((sum, item) => {
            return sum + (item.precio * item.quantity)
        }, 0)
    })

    /**
    * Verificar si un producto está en el carrito
    * @param {string|number} productId - ID del producto
    */
    const isInCart = (productId) => {
        return cartItems.value.some(item => item.id === productId)
    }

    /**
    * Obtener la cantidad de un producto específico en el carrito
    * @param {string|number} productId - ID del producto
    */
    const getProductQuantity = (productId) => {
        const item = cartItems.value.find(item => item.id === productId)
        return item ? item.quantity : 0
    }

    // Watch para sincronizar cambios automáticamente
    watch(
        cartItems,
        () => {
            saveCart()
        },
        { deep: true }
    )

    return {
        cartItems,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemsCount,
        isInCart,
        getProductQuantity
    }
}