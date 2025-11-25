<template>
    <div class="not-found-page">
        <div class="container">
            <div class="not-found-content">
                <div class="error-code">404</div>
                <h1>Página no encontrada</h1>
                <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>
        
                <div class="actions">
                    <router-link to="/" class="btn btn-primary btn-large">
                        🏠 Volver al inicio
                    </router-link>
                    <button @click="goBack" class="btn btn-secondary btn-large">
                        ← Volver atrás
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
    router.back()
}
</script>

<style scoped>
.not-found-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    padding: 2rem;
}

.not-found-content {
    text-align: center;
    background-color: white;
    padding: 4rem 3rem;
    border-radius: var(--border-radius);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    max-width: 600px;
}

.error-code {
    font-size: 8rem;
    font-weight: bold;
    color: var(--primary-color);
    line-height: 1;
    margin-bottom: 1rem;
}

.not-found-content h1 {
    color: var(--dark-color);
    font-size: 2rem;
    margin-bottom: 1rem;
}

.not-found-content p {
    color: var(--gray-color);
    font-size: 1.1rem;
    margin-bottom: 2rem;
}

.actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.btn-large {
    padding: 1rem 2rem;
    font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
    .not-found-content {
        padding: 2rem 1.5rem;
    }

    .error-code {
        font-size: 5rem;
    }

    .not-found-content h1 {
        font-size: 1.5rem;
    }

    .actions {
        flex-direction: column;
    }

    .btn-large {
        width: 100%;
    }
}
</style>