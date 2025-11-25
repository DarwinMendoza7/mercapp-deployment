<template>
    <div class="product-form-page">
        <!-- Navbar -->
        <nav class="navbar">
            <div class="container">
                <div class="nav-content">
                    <router-link to="/" class="back-btn">← Volver</router-link>
                    <h2>{{ isEditMode ? '✏️ Editar Producto' : '➕ Nuevo Producto' }}</h2>
                    <div></div>
                </div>
            </div>
        </nav>

        <div class="container">
            <div class="form-container">
                <!-- Loading al cargar producto para editar -->
                <div v-if="loadingProduct" class="loading-state">
                    <div class="spinner"></div>
                    <p>Cargando producto...</p>
                </div>

                <!-- Formulario -->
                <form v-else @submit.prevent="handleSubmit" class="product-form">
                    <!-- Nombre -->
                    <div class="form-group">
                        <label for="nombre" class="form-label">
                            Nombre del producto *
                        </label>
                        <input
                            id="nombre"
                            v-model="formData.nombre"
                            type="text"
                            class="form-input"
                            :class="{ 'input-error': errors.nombre }"
                            placeholder="Ej: Laptop HP Pavilion"
                            @blur="validateField('nombre')"
                        />
                        <span v-if="errors.nombre" class="error-text">{{ errors.nombre }}</span>
                    </div>

                    <!-- Precio -->
                    <div class="form-group">
                        <label for="precio" class="form-label">
                             Precio *
                        </label>
                        <input
                            id="precio"
                            v-model.number="formData.precio"
                            type="number"
                            step="0.01"
                            min="0"
                            class="form-input"
                            :class="{ 'input-error': errors.precio }"
                            placeholder="99.99"
                            @blur="validateField('precio')"
                        />
                        <span v-if="errors.precio" class="error-text">{{ errors.precio }}</span>
                    </div>

                    <!-- Descripción -->
                    <div class="form-group">
                        <label for="descripcion" class="form-label">
                            Descripción *
                        </label>
                        <textarea
                            id="descripcion"
                            v-model="formData.descripcion"
                            class="form-textarea"
                            :class="{ 'input-error': errors.descripcion }"
                            rows="4"
                            placeholder="Describe el producto (mínimo 10 caracteres)"
                            @blur="validateField('descripcion')"
                        ></textarea>
                        <span v-if="errors.descripcion" class="error-text">{{ errors.descripcion }}</span>
                    </div>

                    <!-- Categoría -->
                    <div class="form-group">
                        <label for="categoryId" class="form-label">
                            Categoría *
                        </label>
                        <select
                            id="categoryId"
                            v-model.number="formData.categoryId"
                            class="form-select"
                            :class="{ 'input-error': errors.categoryId }"
                            @blur="validateField('categoryId')"
                        >
                            <option value="">Selecciona una categoría</option>
                            <option v-for="cat in categoriesList" :key="cat.id" :value="cat.id">
                                {{ cat.name }}
                            </option>
                        </select>
                        <span v-if="errors.categoryId" class="error-text">{{ errors.categoryId }}</span>
                    </div>

                    <!-- Stock -->
                    <div class="form-group">
                        <label for="stock" class="form-label">
                            Stock disponible *
                        </label>
                        <input
                            id="stock"
                            v-model.number="formData.stock"
                            type="number"
                            min="0"
                            class="form-input"
                            :class="{ 'input-error': errors.stock }"
                            placeholder="0"
                            @blur="validateField('stock')"
                        />
                        <span v-if="errors.stock" class="error-text">{{ errors.stock }}</span>
                    </div>

                    <!-- Imagen -->
                    <div class="form-group">
                        <label for="imagen" class="form-label">
                            Imagen del producto {{ isEditMode ? '(opcional)' : '*' }}
                        </label>
                        <input
                            id="imagen"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/gif"
                            class="form-input"
                            :class="{ 'input-error': errors.imagen }"
                            @change="handleFileChange"
                        >
                        <span v-if="errors.imagen" class="error-text">{{ errors.imagen }}</span>
                        <span class="help-text">Formatos permitidos: JPG, PNG, GIF (máx. 5MB)</span>
            
                        <!-- Preview de imagen -->
                        <div v-if="imagePreview" class="image-preview">
                            <img :src="imagePreview" alt="Preview" />
                        </div>
                    </div>

                    <!-- Botones -->
                    <div class="form-actions">
                        <button
                            type="submit"
                            class="btn btn-primary btn-large"
                            :disabled="isSubmitting"
                        >
                            <span v-if="isSubmitting">Guardando...</span>
                            <span v-else>{{ isEditMode ? 'Actualizar producto' : 'Crear producto' }}</span>
                        </button>
                        <router-link to="/" class="btn btn-secondary btn-large">
                            Cancelar
                        </router-link>
                    </div>

                    <!-- Error general -->
                    <div v-if="generalError" class="error-message">
                        {{ generalError }}
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const API_URL = import.meta.env.VITE_API_URL || '/api'

// Estado del formulario
const formData = reactive({
    nombre: '',
    precio: 0,
    descripcion: '',
    categoryId: '',
    stock: 0,
    imagen: null
})

const errors = reactive({
    nombre: '',
    precio: '',
    descripcion: '',
    categoryId: '',
    stock: '',
    imagen: ''
})

const categoriesList = ref([])
const imagePreview = ref(null)
const isSubmitting = ref(false)
const loadingProduct = ref(false)
const generalError = ref(null)

const isEditMode = computed(() => route.name === 'product-edit')

// Cargar categorías
const loadCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/categories`)
        if (response.ok) {
            categoriesList.value = await response.json()
        }
    } catch (error) {
        console.error('Error al cargar categorías:', error)
    }
}

// Cargar producto para editar
const loadProduct = async (id) => {
    loadingProduct.value = true
    try {
        const response = await fetch(`${API_URL}/products/${id}`)
        if (response.ok) {
            const product = await response.json()
            formData.nombre = product.nombre
            formData.precio = product.precio
            formData.descripcion = product.descripcion
            formData.categoryId = product.categoryId || 1
            formData.stock = product.stock || 0
            imagePreview.value = product.imageUrl
            
            console.log('Producto cargado para editar:', product)
            console.log('Stock cargado:', formData.stock)
        } else {
            generalError.value = 'No se pudo cargar el producto'
        }
    } catch (error) {
        generalError.value = 'Error al cargar el producto'
        console.error(error)
    } finally {
        loadingProduct.value = false
    }
}

// Validaciones
const validateField = (field) => {
    errors[field] = ''

    switch (field) {
        case 'nombre':
            if (!formData.nombre.trim()) {
                errors.nombre = 'El nombre es obligatorio'
            } else if (formData.nombre.length < 3) {
                errors.nombre = 'El nombre debe tener al menos 3 caracteres'
            }
        break

        case 'precio':
            if (!formData.precio || formData.precio <= 0) {
                errors.precio = 'El precio debe ser mayor a 0'
            }
        break

        case 'descripcion':
            if (!formData.descripcion.trim()) {
                errors.descripcion = 'La descripción es obligatoria'
            } else if (formData.descripcion.length < 10) {
                errors.descripcion = 'La descripción debe tener al menos 10 caracteres'
            }
        break

        case 'categoryId':
            if (!formData.categoryId) {
                errors.categoryId = 'Debes seleccionar una categoría'
            }
        break

        case 'stock':
            if (formData.stock < 0) {
                errors.stock = 'El stock no puede ser negativo'
            }
        break

        case 'imagen':
            if (!isEditMode.value && !formData.imagen) {
                errors.imagen = 'Debes seleccionar una imagen'
            }
        break
    }
}

const validateForm = () => {
    validateField('nombre')
    validateField('precio')
    validateField('descripcion')
    validateField('categoryId')
    validateField('stock')

    if (!isEditMode.value) {
        validateField('imagen')
    }

    return !Object.values(errors).some(error => error !== '')
}

// Manejo de archivo
const handleFileChange = (event) => {
    const file = event.target.files[0]
    errors.imagen = ''

    if (!file) {
        formData.imagen = null
        imagePreview.value = null
        return
    }

    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
        errors.imagen = 'La imagen no puede superar los 5MB'
        event.target.value = ''
        return
    }

    // Validar tipo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
        errors.imagen = 'Solo se permiten imágenes JPG, PNG o GIF'
        event.target.value = ''
        return
    }

    formData.imagen = file

    // Preview
    const reader = new FileReader()
    reader.onload = (e) => {
        imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
}

// Submit
const handleSubmit = async () => {
    if (!validateForm()) {
        generalError.value = 'Por favor corrige los errores antes de continuar'
        return
    }

    isSubmitting.value = true
    generalError.value = null

    try {
        const formDataToSend = new FormData()
        formDataToSend.append('nombre', formData.nombre.trim())
        formDataToSend.append('precio', parseFloat(formData.precio))
        formDataToSend.append('descripcion', formData.descripcion.trim())
        formDataToSend.append('categoryId', parseInt(formData.categoryId))
        formDataToSend.append('stock', parseInt(formData.stock))
        
        if (formData.imagen) {
            formDataToSend.append('imagen', formData.imagen)
        }

        console.log('Enviando datos:')
        console.log('- nombre:', formData.nombre)
        console.log('- precio:', formData.precio)
        console.log('- categoryId:', formData.categoryId)
        console.log('- stock:', formData.stock)

        const url = isEditMode.value 
        ? `${API_URL}/products/${route.params.id}`
        : `${API_URL}/products`
    
        const method = isEditMode.value ? 'PUT' : 'POST'

        const response = await fetch(url, {
            method: method,
            body: formDataToSend
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Error al guardar el producto')
        }

        alert(isEditMode.value ? '✅ Producto actualizado exitosamente' : '✅ Producto creado exitosamente')
        router.push('/')

    } catch (error) {
        generalError.value = error.message || 'Error al guardar el producto'
        console.error('Error:', error)
    } finally {
        isSubmitting.value = false
    }
}

// Lifecycle
onMounted(async () => {
    await loadCategories()

    if (isEditMode.value && route.params.id) {
        await loadProduct(route.params.id)
    }
})
</script>

<style scoped>
.product-form-page {
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

.form-container {
    max-width: 700px;
    margin: 0 auto;
    background-color: white;
    padding: 3rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
}

.product-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-label {
    font-weight: 600;
    color: var(--dark-color);
}

.form-input,
.form-textarea,
.form-select {
    padding: 0.75rem;
    border: 2px solid var(--light-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    transition: var(--transition);
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
    outline: none;
    border-color: var(--primary-color);
}

.input-error {
    border-color: var(--danger-color);
}

.error-text {
    color: var(--danger-color);
    font-size: 0.875rem;
}

.help-text {
    color: var(--gray-color);
    font-size: 0.875rem;
}

.image-preview {
    margin-top: 1rem;
}

.image-preview img {
    max-width: 300px;
    max-height: 300px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
}

.form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.btn-large {
    padding: 1rem 2rem;
    font-size: 1rem;
    flex: 1;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.loading-state {
    text-align: center;
    padding: 3rem 0;
}

/* Responsive */
@media (max-width: 768px) {
    .form-container {
        padding: 1.5rem;
    }

    .form-actions {
        flex-direction: column;
    }
}
</style>