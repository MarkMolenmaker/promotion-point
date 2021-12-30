import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },{
        path: '/search',
        name: 'Search',
        component: () => import('../views/search/Search.vue')
    },
    {
        path: '/scanner',
        beforeEnter() { location.href = 'https://markmolenmaker.github.io/KaartjesLive/' }
    },
    {
        path: '/multiple',
        beforeEnter() { location.href = 'https://markmolenmaker.github.io/personalized-propaganda/' }
    }
    // {
    //     path: '/dashboard',
    //     name: 'Dashboard',
    //     component: () => import('../views/Dashboard.vue')
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router