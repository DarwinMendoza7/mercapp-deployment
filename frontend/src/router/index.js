import { createRouter, createWebHistory } from 'vue-router'

//Importación normal para vistas principales
import Home from '@/views/Home.vue'

//Lazy loading para vistas secundarias
const ProductDetail = () => import('@/views/ProductDetail.vue')
const ProductForm = () => import('@/views/ProductForm.vue')
const Cart = () => import('@/views/Cart.vue')
const About = () => import('@/views/About.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: 'Inicio - MercApp' }
    },
    {
        path: '/product/new',
        name: 'product-create',
        component: ProductForm,
        meta: { title: 'Nuevo Producto - MercApp' }
    },
    {
        path: '/product/:id/edit',
        name: 'product-edit',
        component: ProductForm,
        meta: { title: 'Editar Producto - MercApp' }
    },
    {
        path: '/product/:id',
        name: 'product-detail',
        component: ProductDetail,
        meta: { title: 'Detalle del Producto - MercApp' }
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
        meta: { title: 'Carrito - MercApp' } 
    },
    {
        path:'/about',
        name: 'about',
        component: About,
        meta: { title: 'Acerca de - MercApp' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
        meta: { title: '404 - Página no encontrada' }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition){
        if(savedPosition){
            return savedPosition
        }else{
            return { top:0 }
        }
    }
})

//Actualizar el título de la página
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'MercApp'
    next()
})

export default router