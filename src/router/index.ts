 import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

 const routes: Array<RouteRecordRaw> = [
   {
     path: '/',
    redirect: '/home'
   },
   {
       path: '/home',
       name: 'home',
       meta: {
           keepAlive: true,
           requireAuth: true
       },
       component: () => import('@/components/HelloWorld.vue')
   }
 ]

 const router = createRouter({
   history: createWebHistory(),
   routes
 })
 export default router
