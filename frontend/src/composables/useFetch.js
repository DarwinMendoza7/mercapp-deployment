import { ref } from 'vue'

export function useFetch() {
    const data = ref(null)
    const loading = ref(false)
    const error = ref(null)

    /**
   * Realiza una petición HTTP con reintento
   * @param {string} url - URL de la petición
   * @param {object} options - Opciones de fetch
   * @param {number} retries - Número de reintentos (por defecto 1)
   */
    const fetchData = async (url, options = {}, retries = 1) => {
        loading.value = true
        error.value = null
        data.value = null

        let lastError = null

        // Intentar la petición con reintentos
        for (let i = 0; i <= retries; i++) {
            try {
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    ...options
                })

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
                }

                const result = await response.json()
                data.value = result
                loading.value = false
                return result

            } catch (err) {
                lastError = err
        
                // Si no es el último intento, esperar un poco antes de reintentar
                if (i < retries) {
                    await new Promise(resolve => setTimeout(resolve, 1000))
                }
            }
        }

        // Si llegamos aquí, todos los intentos fallaron
        error.value = lastError.message || 'Error al realizar la petición'
        loading.value = false
        throw lastError
    }

    /**
   * Cancela la petición actual (placeholder para futuras implementaciones con AbortController)
   */
    const cancel = () => {
        // Para implementaciones futuras con AbortController
        loading.value = false
    }

    return {
        data,
        loading,
        error,
        fetchData,
        cancel
    }
}