<template>
    <div class="loading-fallback">
        <div class="loading-content">
            <div class="spinner-large"></div>
            <p>Cargando...</p>
        </div>
    </div>
</template>

<script setup>
//Componente de fallback para Suspense
</script>

<style scoped>
.loading-fallback{
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
}
.loading-content{
    text-align: center;
}

.spinner-large{
    border: 6px solid var(--light-color);
    border-top: 6px solid var(--primary-color);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin{
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-content p{
    color: var(--gray-color);
    font-size: 1.2rem;
}
</style>