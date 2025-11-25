import { ref } from 'vue'
import { useFetch } from './useFetch'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export function useProducts() {
    const products = ref([])
    const product = ref(null)
    const categories = ref([])
    const loading = ref(false)
    const error = ref(null)

    const { fetchData } = useFetch()

    /**
    * Obtener todos los productos
    */
    const fetchProducts = async () => {
        loading.value = true
        error.value = null

        try {
            const result = await fetchData(`${API_URL}/products`, {}, 1)
            products.value = result
            loading.value = false
        } catch (err) {
            error.value = err.message || 'Error al cargar los productos'
            loading.value = false
            console.error('Error fetching products:', err)
        }
    }

    /**
    * Obtener un producto por ID
    * @param {string|number} id - ID del producto
    */
    const fetchProductById = async (id) => {
        loading.value = true
        error.value = null
        product.value = null

        try {
            const result = await fetchData(`${API_URL}/products/${id}`, {}, 1)
            product.value = result
            loading.value = false
            return result
        } catch (err) {
            error.value = err.message || 'Error al cargar el producto'
            loading.value = false
            product.value = null
            console.error('Error fetching product:', err)
            throw err
        }
    }

    /**
    * Obtener todas las categorías
    */
    const fetchCategories = async () => {
        try {
            const result = await fetchData(`${API_URL}/categories`, {}, 1)
            categories.value = result
        } catch (err) {
            console.error('Error fetching categories:', err)
            // No afectar el estado de error principal si falla categorías
        }
    }

    /**
    * Crear un nuevo producto
    * @param {FormData} formData - Datos del producto (incluyendo imagen)
    */
    const createProduct = async (formData) => {
        loading.value = true
        error.value = null

        try {
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                body: formData
                // No incluir Content-Type, fetch lo añadirá automáticamente para FormData
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Error al crear el producto')
            }

            const result = await response.json()
            products.value.unshift(result) // Agregar al inicio
            loading.value = false
            return result

        } catch (err) {
            error.value = err.message || 'Error al crear el producto'
            loading.value = false
            throw err
        }
    }

    /**
    * Actualizar un producto existente
    * @param {string|number} id - ID del producto
    * @param {FormData} formData - Datos actualizados
    */
    const updateProduct = async (id, formData) => {
        loading.value = true
        error.value = null

        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            body: formData
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Error al actualizar el producto')
            }

            const result = await response.json()

            // Actualizar en la lista
            const index = products.value.findIndex(p => p.id === id)
            if (index !== -1) {
                products.value[index] = result
            }

            loading.value = false
            return result

        } catch (err) {
            error.value = err.message || 'Error al actualizar el producto'
            loading.value = false
            throw err
        }
    }

    /**
    * Eliminar un producto
    * @param {string|number} id - ID del producto
    */
    const deleteProduct = async (id) => {
        loading.value = true
        error.value = null

        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE'
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Error al eliminar el producto')
            }

            // Eliminar de la lista
            products.value = products.value.filter(p => p.id !== id)
            loading.value = false

        } catch (err) {
            error.value = err.message || 'Error al eliminar el producto'
            loading.value = false
            throw err
        }
    }

    return {
        products,
        product,
        categories,
        loading,
        error,
        fetchProducts,
        fetchProductById,
        fetchCategories,
        createProduct,
        updateProduct,
        deleteProduct
    }
}