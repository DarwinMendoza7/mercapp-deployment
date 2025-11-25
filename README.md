# MercApp - Catálogo de Productos SPA #

**Nombre:** Darwin Mendoza  
**Carrera:** Software  
**Universidad:** Universidad Politécnica Salesiana  
**Materia:** Aplicaciones Web  
**Correo:** dmendozas@est.ups.edu.ec  

## Descripción del Proyecto ##  
MercApp es una aplicación web completa de gestión de productos que combina:  
- **Backend:** API REST desarrollada con Node.js + Express + MongoDB (adaptado de la Unidad 2 - MiInventarioExpress).
- **Frontend:** Single Page Application (SPA) desarrollada con Vue 3, Vue Router y Composition API.  

La aplicación permite navegar por un catálogo de productos, buscar y filtrar por categorías, gestionar un carrito de compras con persistencia local, y realizar operaciones CRUD completas sobre los productos.  

## Características Principales ##  
### Backend (API REST) ###  
- CRUD completo de productos (Create, Read, Update, Delete).  
- Endpoints RESTful bien estructurados.  
- Validación de datos con express-validator.  
- Carga de imágenes con Multer.  
- Gestión de stock y categorías.  
- CORS habilitado para consumo desde frontend.  
- Manejo de errores (400, 404, 500).  
- Base de datos MongoDB con Mongoose.  
### Frontend (Vue 3 SPA) ###  
- Arquitectura SPA con Vue 3 y Composition API.  
- Enrutamiento con Vue Router (lazy loading).  
- Búsqueda en tiempo real de productos.  
- Filtrado por categorías.  
- Carrito de compras con localStorage.  
- Componentes reutilizables con props y eventos.  
- Composables personalizados (useFetch, useProducts, useCart).  
- Suspense para manejo de carga asíncrona.  
- Formularios con validación en tiempo real.  
- Diseño responsive.  

## Arquitectura del Proyecto ##  
    mercapp-proyecto/  
    |
    ├──backend/                      # API REST (Node.js + Express + MongoDB)
    |  ├──config/
    |  |  └──database.js             # Configuración de MongoDB
    |  ├──controllers/               
    |  |  ├──authController.js        
    |  |  ├──chatController.js       
    |  |  └──productController.js    # Lógica CRUD (vistas Handlebars)
    |  ├──middlewares/
    |  |  └──authMiddleware.js
    |  ├──models/
    |  |  ├──Product.js              # Esquema Mongoose (con stock y categoryId)
    |  |  └──User.js                 
    |  ├──public/                    
    |  |  ├──css/                    
    |  |  |  └──style.css             
    |  |  ├──images/                   
    |  |  |  └──default.jpg                   
    |  ├──routes/                       
    |  |  ├──api.js                  # Rutas API REST (JSON)  
    |  |  ├──auth.js
    |  |  ├──chat.js
    |  |  └──products.js             # Rutas tradicionales (Handlebars)
    |  ├──scripts/
    |  |  ├──createAdmin.js
    |  |  └──updateProducts.js       # Script para agregar stock/categoryId
    |  ├──uploads/                   # Imágenes de productos
    |  ├──views/                     # Vistas Handlebars (backend original)
    |  |  ├──auth/                        
    |  |  |  ├──login.hbs                         
    |  |  |  └──register.hbs                    
    |  |  ├──chat/                          
    |  |  |  └──index.hbs                     
    |  |  ├──layouts/                          
    |  |  |  └──main.hbs                        
    |  |  ├──products/                        
    |  |  |  ├──form.hbs                  
    |  |  |  └──list.hbs                
    |  ├──.env                       # Variables de entorno
    |  ├──.gitignore
    |  ├──app.js                     # Servidor Express con CORS
    |  ├──package-lock.json
    |  └──package.json
    ├──frontend/                     # SPA Vue 3
    |  ├──public/                          
    |  ├──src/                               
    |  |  ├──assets/                              
    |  |  |  └──css                                  
    |  |  ├──components/                            
    |  |  |  ├──LoadingFallback.vue  # Componente de carga (Suspense)
    |  |  |  └──ProductCard.vue      # Tarjeta de producto reutilizable
    |  |  ├──composables/
    |  |  |  ├──useCart.js           # Composables para carrito
    |  |  |  ├──useFetch.js          # Composable genérico HTTP
    |  |  |  └──useProducts.js       # Composable para productos
    |  |  ├──router/
    |  |  |  └──index.js             # Configuración Vue Router
    |  |  ├──views/
    |  |  |  ├──About.vue            # Acerca de (lazy loading)
    |  |  |  ├──Cart.vue             # Carrito de compras
    |  |  |  ├──Home.vue             # Catálogo con búsqueda y filtros
    |  |  |  ├──NotFound.vue         # Página 404 (lazy loading)
    |  |  |  ├──ProductDetail.vue    # Detalle de producto
    |  |  |  └──ProductForm.vue      # Formulario crear/editar
    |  |  ├──App.vue                 # Componente raíz con Suspense
    |  |  ├──main.js                 # Punto de entrada
    |  |  └──style.css               # Estilos globales
    |  ├──.gitignore
    |  ├──index.html
    |  ├──package-lock.json
    |  ├──package.json
    |  └──vite.config.js             # Configuración Vite (alias @ y proxy) 
    |
    |──docs/                         # Capturas de pantalla de la aplicación
    |  ├──screenshots/
    |  |  ├──carrito.png
    |  |  ├──detalle-producto.png
    |  |  ├──formulario.png
    |  |  └──home.png
    ├──.gitignore
    └──README.md      

## Tecnologías Utilizadas ##  
### Backend ###  
- Node.js v16+.  
- Express.js 5.1.0 - Framework web.  
- MongoDB - Base de datos NoSQL.  
- Mongoose 8.19.2 - ODM para MongoDB.  
- Multer 2.0.2 - Carga de archivos.  
- Express Validator 7.2.1 - Validación de datos.  
- bcryptjs 3.0.2 - Hash de contraseñas.  
- express-session 1.18.2 - Manejo de sesiones.  
- Socket.io 4.8.1 - Chat en tiempo real.  
- CORS 2.8.5 - Habilitación de CORS.  
### Frontend ###  
- Vue 3 - Framework progresivo.  
- Vue Router 4 - Enrutamiento SPA.  
- Vite 5.x - Build tool y dev server.  
- JavaScript ES6+ - Lenguaje de programación.  
- CSS3 - Estilos.  

## Instalación y Configuración ##
### Requisitos Previos ###  
- Node.js v16 o superior.  
- MongoDB instalado y corriendo.  
- npm o yarn.  
### 1. Clonar el repositorio ###  

    git clone https://github.com/DarwinMendoza7/MercApp.git  

### 2. Configurar el backend ###

    cd backend

    #Instalar dependencias 
    npm install

    #Crear un archivo .env en la raíz con:
    PORT=3000
    MONGODB_URI=mongodb://127.0.0.1:27017/miinventario
    SESSION_SECRET=tu_contraseña_segura_aqui
    NODE_ENV=development  

    #(Opcional) Crear usuario administrador
    node scripts/createAdmin.js

    #(Opcional) Actualizar productos existentes con stock y categoryId
    node scripts/updateProducts.js

    #Iniciar el servidor backend
    npm run dev

El backend estará disponible en: http://localhost:3000  

**Endpoints API disponibles:**  
- GET /api/products - Listar todos los productos.  
- GET /api/products/:id - Obtener producto por ID.  
- POST /api/products - Crear nuevo producto.  
- PUT /api/products/:id - Actualizar producto.  
- DELETE /api/products/:id - Eliminar producto.  
- GET /api/categories - Listar categorías.  

### 3. Configurar el Frontend ###  

    cd frontend

    # Instalar dependencias
    npm install

    # Iniciar servidor de desarrollo
    npm run dev

El frontend estará disponible en: http://localhost:5173

## Funcionalidades Implementadas ##  
### Diseño del esquema del API y modelos ###  
- Endpoints RESTful completos.  
- Modelo Product con campos: id, nombre, descripción, precio, imageUrl, categoryId, stock.  
- Modelo Category con campos: id, name.  
### Implementación del API REST ###  
- Validación de campos obligatorios y tipos.  
- Manejo de errores HTTP (400/404/500).  
### Semilla de datos y persistencia ###  
- Script para poblar 12 productos y 5 categorías.  
- Persistencia en MongoDB.  
### Bootstrap del proyecto Vue 3 ###  
- Proyecto creado con Vite.  
- Estructura SFC (Single File Components).  
- Configuración de alias @ apuntando a src/.  
- Organización clara de assets.  
### Routing (SPA) ###  
Vue Router configurado con las siguientes rutas:  
- / - Home (Catálogo).  
- /product/new - Crear producto.  
- /product/:id - Detalle de producto.  
- /product/:id/edit - Editar producto.  
- /cart - Carrito de compras.  
- /about - Acerca de  
- /:pathMatch(.*)* - Página 404  
### Listado y búsqueda con reactividad ###  
- Vista Home consume GET /api/products.  
- Buscador por nombre/descripción en tiempo real.  
- Filtro por categoría (consume GET /api/categories).  
- Propiedad computada filteredProducts para lista visible.  
### Detalle de producto y comunicación por props/eventos ###  
- Vista /product/:id obtiene descripción completa.  
- Componente ProductCard reutilizable:  
  - Prop product (objeto).  
  - Evento added-to-cart desde botón "Añadir".  
  - Evento deleted para eliminar producto.  
### Composables y manejo de peticiones ###  
- useFetch (genérico):
  - **Estados:** data, loading, error.
  - Reintento automático (1 vez).
  - Manejo de errores.  
- useProducts (específico):
  - **Funciones:** fetchProducts, fetchProductById, createProduct, updateProduct, deleteProduct.
- useCart (carrito):  
  - **Funciones:** addToCart, removeFromCart, updateQuantity, clearCart.  
  - Total calculado con computed.  
### Formulario de alta/edición con v-model y validación ###  
- Vista /product/new para crear productos.  
- Vista /product/:id/edit para editar productos.  
- Validación de campos:  
  - **Nombre:** obligatorio, mínimo 3 caracteres.  
  - **Precio:** obligatorio, número > 0.  
  - **Descipción:** obligatoria, mínimo 10 caracteres.  
  - **Categoría:** obligatoria.  
  - **Stock:** obligatorio,≥ 0.  
  - **Imagen:** obligatoria al crear, opcional al editar, validación de tipo y tamaño (5MB).  
### Lazy loading de vistas y Suspense ###  
- Lazy loading implementado en 5 rutas:    
  - /product/new (ProductForm).  
  - /product/:id (ProductDetail).  
  - /cart (Cart).  
  - /about (About).  
  - /:pathMatch(.*)* (NotFound).  
- Componente <Suspense> en App.vue.  
- Componente LoadingFallback como fallback.  
### Manejo de estado del carrito ###  
- Agregar/quitar items.  
- Cantidad por producto.    
- Total calculado con computed.  
- Persistencia en localStorage.  
- Funciones completas de gestión.  
### Documentación y evidencias ###  
- README.md completo.  
- Instrucciones de instalación y uso.  
- Repositorio en GitHub con múltiples commits.  

## Capturas de Pantalla ##  
### Página Principal (Home) ###  
Catálogo de productos con búsqueda y filtros por categoría.  
![Página Principal](docs/screenshots/home.png)  
### Detalle de Producto ###  
Vista detallada con información completa y opción de agregar al carrito.  
![Detalle de Producto](docs/screenshots/detalle-producto.png)  
### Carrito de compras ###  
Gestión de productos agregados con cálculo de totales.  
![Carrito de Compras](docs/screenshots/carrito.png)    
### Formulario de producto ###  
Crear y editar productos con validación en tiempo real.  
![Formulario](docs/screenshots/formulario.png)    

## Características Técnicas Destacadas ###    
### Reactividad ###  
- Uso de ref, reactive y computed para datos reactivos.  
- Actualizaciones automáticas de la interfaz.  
### Composables ###  
- Lógica reutilizable encapsulada en funciones.  
- Separación de preocupaciones.  
### Props y Eventos ###  
- Comunicación unidireccional con props.  
- Eventos personalizados para comunicación hijo → padre.  
### Lazy Loading ###  
- Carga bajo demanda de componentes.  
- Optimización del rendimiento inicial.  
### Validación ###  
- Validación en tiempo real con @blur.  
- Mensajes de error contextuales.  
### Persistencia ###  
- LocalStorage para carrito de compras.  
- MongoDB para productos.  

## Comandos Útiles ##  
### Backend ###

    cd backend
    npm install                      # Instalar dependencias
    npm run dev                      # Desarrollo con nodemon
    mpm start                        # Producción  
    node scripts/updateProducts.js   # Actualizar productos

### Frontend ###  

    cd frontend
    npm install                      # Instalar dependencias
    npm run dev                      # Desarrollo con vite
    npm run build                    # Build de producción  
    npm run preview                  # Preview del build

## Notas de Desarrollo ##  
- El backend mantiene las vistas originales de Handlebars en las rutas /products, /auth, /chat.    
- Las rutas API REST están en /api/* y devuelven JSON.  
- El frontend Vue consume únicamente las rutas /api/*.  
- Ambas aplicaciones pueden funcionar de forma independiente.  
- CORS está habilitado para permitir peticiones desde http://localhost:5173.  

## Solución de Problemas ##    
### El backend no arranca ###    
- Verifica que MongoDB este corriendo: mongod.  
- Revisa que el archivo .env exista con las variables correctas.  
### El frontend no conecta con el backend ###  
- Verifica que el backend esté corriendo en el puerto 3000.  
- Revisa la configuración de proxy en vite.config.js.  
### Las imágenes no cargan ###  
- Verifica que la carpeta backend/uploads/ exista.  
- Revisa los permisos de la carpeta: chmod 755 uploads.  

## Recursos y Referencias ##  
- Documentación de Vue 3.  
- Vue Router.  
- Vite.  
- Express.js.  
- MongoDB.  
- Mongoose.  

## Licencia ##  
Este proyecto fue desarrollado con fines académicos para la materia de Aplicaciones Web.











