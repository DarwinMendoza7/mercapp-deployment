# MercApp - Sistema de Gestión de Productos #

**Nombre:** Darwin Mendoza  
**Carrera:** Software  
**Universidad:** Universidad Politécnica Salesiana  
**Materia:** Aplicaciones Web  
**Correo:** dmendozas@est.ups.edu.ec  

## Aplicación en Producción ##  
- **Frontend (SPA):** https://mercapp-app.netlify.app  
- **Backend (API):** https://mercapp-deployment-production.up.railway.app  
- **Health Check:** https://mercapp-deployment-production.up.railway.app/health  
- **Documentación:** https://darwinmendoza7.github.io/mercapp-deployment/  
- **Repositorio:** https://github.com/DarwinMendoza7/mercapp-deployment.git

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
- Base de datos MongoDB Atlas con Mongoose.  
- Health check endpoint (/health).  
- Variables de entorno para configuración segura.   
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

## Arquitectura de Despliegue ##  

    Usuario (Navegador)
           ↓
    Frontend (Netlify) - Vue 3 SPA
           ↓ HTTPS + CORS
    Backend (Railway) - Express API
           ↓ TLS
    MongoDB Atlas - Base de datos  

## Servicios en la Nube ##  

|Servicio|Propósito|URL|
|:------:|:-------:|:-:|
|MongoDB Atlas|Base de datos (Cluster M0)|mongodb+srv://...|
|Railway|Hosting del backend (Node.js)|mercapp-deployment-production.up.railway.app|
|Netlify|Hosting del frontend (SPA)|mercapp-app.netlify.app|
|GitHub Pages|Documentación del proyecto|darwinmendoza7.github.io/mercapp-deployment/|  

## Configuración de Seguridad ##
- **HTTPS/TLS:** Todas las comunicaciones cifradas.  
- **CORS:** Orígenes restringidos al dominio de Netlify.  
- **Variables de entorno:** Credenciales fuera del código.  
- **MongoDB Atlas:** IP allowist configurada, usuario con rol adecuado.  
- **Validación:** Datos válidos en backend con express validator.  

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
    |  ├──.env.example               # Ejemplo de variables de entorno                     
    |  ├──.gitignore
    |  ├──app.js                     # Servidor Express con CORS
    |  ├──package-lock.json
    |  └──package.json
    ├──frontend/                     # SPA Vue 3
    |  ├──public/ 
    |  |  └──_redirects              # Configuración SPA para Netlify                        
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
    |  ├──.env.production            # Variables de entorno para producción   
    |  ├──.gitignore
    |  ├──index.html
    |  ├──package-lock.json
    |  ├──package.json
    |  └──vite.config.js             # Configuración Vite (alias @ y proxy) 
    |
    |──docs/                         # GitHub Pages- Documentación
    |  ├──screenshots/
    |  |  ├──carrito.png
    |  |  ├──detalle-producto.png
    |  |  ├──formulario.png
    |  |  └──home.png
    |  └──index.html                 # Micrositio del proyecto
    ├──.gitignore
    └──README.md      

## Tecnologías Utilizadas ##  
### Backend ###  
- Node.js v18+- Runtime de JavaScript     
- Express.js 5.1.0 - Framework web.  
- MongoDB Atlas - Base de datos NoSQL en la nube.  
- Mongoose 8.19.2 - ODM para MongoDB.  
- Multer 2.0.2 - Carga de archivos.  
- Express Validator 7.2.1 - Validación de datos.  
- bcryptjs 3.0.2 - Hash de contraseñas.  
- express-session 1.18.2 - Manejo de sesiones.  
- Socket.io 4.8.1 - Chat en tiempo real.  
- CORS 2.8.5 - Habilitación de CORS.  
- dotenv - Gestión de variables de entorno.    
### Frontend ###  
- Vue 3 - Framework progresivo.  
- Vue Router 4 - Enrutamiento SPA.  
- Vite 5.x - Build tool y dev server.  
- JavaScript ES6+ - Lenguaje de programación.  
- CSS3 - Estilos.  
### DevOps&Deployment ###  
- Railway - Despliegue del backend.  
- Netlify - Despliegue del frontend.  
- MongoDB Atlas - Base de datos en la nube.  
- GitHub Pages - Documentación.  
- Git & Github - Control de versiones.  

## Instalación y Configuración ##
### Requisitos Previos ###  
- Node.js v18 o superior.    
- npm o yarn.  
- Git.  
- Cuenta en MongoDB Atlas (para producción).    
### 1. Clonar el repositorio ###  

    git clone https://github.com/DarwinMendoza7/mercapp-deployment.git
    cd mercapp-deployment   

### 2. Configurar el backend ###

    cd backend

    #Instalar dependencias 
    npm install

    #Crear un archivo .env en la raíz con:
    PORT=3000
    MONGODB_URI=mongodb://127.0.0.1:27017/miinventario # local
    # o para producción:
    # MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/mercapp
    SESSION_SECRET=tu_contraseña_segura_aqui
    NODE_ENV=development  
    FRONTEND_URL=http://localhost:5173  
    NETLIFY_URL=http://localhost:5173
    BACKEND_URL=http://localhost:3000

    #(Opcional) Crear usuario administrador
    node scripts/createAdmin.js

    #(Opcional) Actualizar productos existentes con stock y categoryId
    node scripts/updateProducts.js

    #Iniciar el servidor backend
    npm run dev

El backend estará disponible en: http://localhost:3000  

**Endpoints API disponibles:**  
- GET /health - Health check del servidor.    
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

    # Crear archivo .env con:
    VITE_API_URL=http://localhost:3000/api

    # Iniciar servidor de desarrollo
    npm run dev

El frontend estará disponible en: http://localhost:5173  

## Despliegue en Producción ##
### Fase 1: MongoDB Atlas ###  
1. Crear Organización/Proyecto en MongoDB Atlas.  
2. Crear Cluster M0 (gratuito) en región cercana.  
3. Crear usuario de base de datos con rol readWrite.  
4. Configurar IP Allowist:  
- Agregar 0.0.0.0/0 (permitir desde cualquier IP) para Railway.  
5. Obtener cadena de conexión:  
- Drivers → Node.js  
- Formato: mongodb+srv://usuario:password@cluster.mongodb.net/mercapp  
6. Validar con MongoDB Compass.  
### Fase 2: Backend en Railway ##  
1. Conectar repositorio de GitHub.  
2. Railway detecta automáticamente Node.js (Nixpacks).  
3. Configurar variables de entorno:  

        MONGODB_URI=mongodb+srv://...  
        PORT=3000  
        SESSION_SECRET=clave_secreta  
        NODE_ENV=production  
        FRONTEND_URL=https://mercapp-app.netlify.app  
        NETLIFY_URL=https://mercapp-app.netlify.app  
        BACKEND_URL=https://mercapp-deployment-production.up.railway.app  

4. Deploy automático.  
5. Verificar en: https://mercapp-deployment-production.up.railway.app/health  
### Fase 3: Frontend en Netlify ###  
1. Crear archivo .env.production:

        VITE_API_URL=https://mercapp-deployment-production.up.railway.app/api  

2. Crear archivo public/_redirects  

        /* /index.html 200  

3. Build:    

         npm run build

4. Deploy en Netlify:
- Conectar repositorio de GitHub  
- Build command: npm run build  
- Publish directory: dist  
- Variables de entorno: VITE_API_URL  

5. Verificar: https://mercapp-app.netlify.app  

### Fase 4: GitHub Pages ###  
1. Crear micrositio en/docs/index.html  
2. Activar Pages:  
- Settings → Pages  
- Source: main -> /docs  
3. Acceder: https://darwinmendoza7.github.io/mercapp-deployment/   

## Variables de Entorno ##  
**Backend (.env)**

      # Base de datos
      MONGODB_URI_mongodb+srv://usuario:password@cluster.mongodb.net/mercapp

      # Servidor
      PORT=3000
      NODE_ENV=production

      # Seguridad
      SESSION_SECRET=clave_secreta_muy_segura

      # CORS - Orígenes permitidos
      FRONTEND_URL=https://mercapp-app.netlify.app
      NETLIFY_URL=https://mercapp-app.netlify.app
      BACKEND_URL=https://mercapp-deployment-production.up.railway.app

Frontend (.env.production) 

    VITE_API_URL=https://mercapp-deployment-production.up.railway.app/api  

## Documentación de la API ##  
### Base URL ###  

    https://mercapp-deployment-production.up.railway.app

### Endpoints de Productos ###  
|Método|Endpoint|Descripción|Body|
|:----:|:------:|:---------:|:--:|
|GET|/products|Listar todos los productos|-|
|GET|/products/:id|Obtener un producto|-|
|POST|/products|Crear producto|FormData con imagen|
|PUT|/products/:id|Actualizar producto|FormData con Imagen|
|DELETE|/products/:id|Eliminar producto|-|

### Ejemplo de Response(GET/api/products)
    [
      {
        "id": "692886d28c24682d629aaf52",
        "nombre": "Laptop Asus Vivobook 15",
        "precio": 579,
        "descripcion": "Laptop Asus Vivobook 15 AMD...",
        "imagen": "1764269743892-245964075.png",
        "imageUrl": "https://mercapp-deployment-production.up.railway.app/uploads/1764269743892-245964075.png",
        "categoryId": 2,
        "stock": 5,
        "createdAt": "2025-11-27T17:13:54.375Z",
        "updatedAt": "2025-11-27T18:55:44.224Z"
      }
    ]

### Endpoints de Categorías ###
|Método|Endpoint|Descripión|
|:----:|:------:|:--------:|
|GET|/categories|Listar todas las categorías|

## Funcionalidades Implementadas ##  
### Diseño del esquema del API y modelos ###  
- Endpoints RESTful completos.  
- Modelo Product con campos: id, nombre, descripción, precio, imageUrl, categoryId, stock.  
- Modelo Category con campos: id, name.  
### Implementación del API REST ###  
- Validación de campos obligatorios y tipos.  
- Manejo de errores HTTP (400/404/500).  
- CORS configurado dinámicamente.  
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
### Despliegue en Producción ###  
- MongoDB Atlas configurado.    
- Backend desplegado en Railway.    
- Frontend desplegado en Netlify.    
- CORS configurado correctamente.    
- Variables de entorno parametrizadas.  
- GitHub Pages con documentación.    

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

## Comandos Útiles ##  
### Backend ###

    cd backend
    npm install                      # Instalar dependencias
    npm run dev                      # Desarrollo con nodemon
    mpm start                        # Producción  
    node scripts/updateProducts.js   # Actualizar productos
    node scripts/createAdmin.js      # Crear usuario admin

### Frontend ###  

    cd frontend
    npm install                      # Instalar dependencias
    npm run dev                      # Desarrollo con vite
    npm run build                    # Build de producción  
    npm run preview                  # Preview del build

## Solución de Problemas ##    
### El backend no arranca ###    
- Verifica que MongoDB este corriendo (local) o que la URI de Atlas sea correcta.    
- Revisa que el archivo .env exista con las variables correctas.  
- Verifica que el puerto 3000 no esté  en uso.    
### El frontend no conecta con el backend ###  
- Verifica que el backend esté corriendo.  
- Revisa la configuración VITE_API_URL en .env o .env.production.
- Verifica que CORS esté habilitado en el backend. 
### Errores de CORS ###  
- Verifica qye NETLIFY_URL esté configurada en Railway.  
- Asegúrate de que el dominio de Netlify esté en la lista de orígenes permitidos.  
- Revisa los logs de Railway para ver qué origen está siendo bloqueado.    
### Las imágenes no cargan ###  
- Nota: Las imágenes son efímeras en Railway (se borran en cada redeploy).  
- Para persistencia, considera usar un servicio como Cloudinary.  
- Verifica que la carpeta backend/uploads/ exista con .gitkeep.  
### Problemas con el despliegue en Netlify ###  
- Verifica que el archivo public/_redirects exista.  
- Asegúrate de que la carpeta de build sea dist.  
- Revisa los logs de build en Netlify.  

## Recursos y Referencias ##  
- Documentación de Vue 3.  
- Vue Router.  
- Vite.  
- Express.js.  
- MongoDB.  
- Mongoose.  
- Railway Docs.  
- Netlify Docs.    

## Licencia ##  
Este proyecto fue desarrollado con fines académicos para la materia de Aplicaciones Web.  

## Autor ##
Darwin Mendoza  
Estudiante de Ingeniería de Software  
Universidad Politécnica Salesiana 
dmendozas@est.ups.edu.ec  
🔗 [GitHub](https://github.com/DarwinMendoza7/mercapp-deployment.git)











