<template>
    <div class="about-page">
        <nav class="navbar">
            <div class="container">
                <div class="nav-content">
                    <router-link to="/" class="back-btn">← Volver</router-link>
                    <router-link to="/" class="logo">🛒 MercApp</router-link>
                    <div></div>
                </div>
            </div>
        </nav>

        <div class="container">
            <div class="about-content">
                <h1>Acerca de MercApp</h1>
        
                <section class="about-section">
                    <h2>📱 ¿Qué es MercApp?</h2>
                    <p>
                        MercApp es una aplicación web moderna de catálogo de productos desarrollada como 
                        proyecto académico para demostrar el uso de tecnologías web actuales. 
                    </p>
                    <p>
                        Esta aplicación permite a los usuarios explorar productos, buscar por nombre o descripción,
                        filtrar por categorías y gestionar un carrito de compras de manera intuitiva y eficiente.
                    </p>
                </section>

                <section class="about-section">
                    <h2>🛠️ Tecnologías Utilizadas</h2>
                    <div class="tech-grid">
                        <div class="tech-card">
                            <h3>Frontend</h3>
                            <ul>
                                <li>Vue 3 (Composition API)</li>
                                <li>Vue Router</li>
                                <li>Vite</li>
                                <li>JavaScript ES6+</li>
                            </ul>
                        </div>
                        <div class="tech-card">
                            <h3>Backend</h3>
                            <ul>
                                <li>Node.js</li>
                                <li>Express</li>
                                <li>MongoDB + Mongoose</li>
                                <li>Multer</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section class="about-section">
                    <h2>✨ Características Principales</h2>
                    <ul class="features-list">
                        <li>✅ Catálogo completo de productos</li>
                        <li>✅ Búsqueda en tiempo real</li>
                        <li>✅ Filtrado por categorías</li>
                        <li>✅ Vista detallada de productos</li>
                        <li>✅ Carrito de compras funcional</li>
                        <li>✅ Persistencia con localStorage</li>
                        <li>✅ Diseño responsivo</li>
                        <li>✅ Lazy loading de rutas</li>
                        <li>✅ Manejo de estados de carga y errores</li>
                    </ul>
                </section>

                <section class="about-section">
                    <h2>👨‍💻 Información del Proyecto</h2>
                    <p>
                        <strong>Materia:</strong> Aplicaciones Web - Unidad 3<br>
                        <strong>Objetivo:</strong> Desarrollo de aplicación SPA con Vue 3 consumiendo API REST propio<br>
                        <strong>Año:</strong> 2025
                    </p>
                </section>

                <div class="cta-section">
                    <router-link to="/" class="btn btn-primary btn-large">
                        Explorar productos
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Esta vista es estática, no necesita lógica reactiva
</script>

<style scoped>
.about-page {
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

.logo {
    text-decoration: none;
    color: var(--primary-color);
    font-size: 1.5rem;
    font-weight: bold;
}

.about-content {
    background-color: white;
    padding: 3rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    max-width: 900px;
    margin: 0 auto;
}

.about-content h1 {
    color: var(--dark-color);
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
}

.about-section {
    margin-bottom: 3rem;
}

.about-section h2 {
    color: var(--primary-color);
    font-size: 1.8rem;
    margin-bottom: 1rem;
}

.about-section p {
    color: #666;
    line-height: 1.8;
    font-size: 1.1rem;
    margin-bottom: 1rem;
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-top: 1.5rem;
}

.tech-card {
    background-color: var(--light-color);
    padding: 1.5rem;
    border-radius: var(--border-radius);
}

.tech-card h3 {
    color: var(--dark-color);
    margin-bottom: 1rem;
}

.tech-card ul {
    list-style: none;
    padding: 0;
}

.tech-card li {
    padding: 0.5rem 0;
    color: #666;
    border-bottom: 1px solid #ddd;
}

.tech-card li:last-child {
    border-bottom: none;
}

.features-list {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.features-list li {
    padding: 1rem;
    background-color: var(--light-color);
    border-radius: var(--border-radius);
    color: var(--dark-color);
}

.cta-section {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid var(--light-color);
}

.btn-large {
    padding: 1rem 3rem;
    font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
    .about-content {
        padding: 1.5rem;
    }

    .about-content h1 {
        font-size: 2rem;
    }

    .tech-grid,
    .features-list {
        grid-template-columns: 1fr;
    }
}
</style>