import { createRouter, createWebHistory, RouteLocationNormalized } from "vue-router";

import routes from './routes';

const router = createRouter({
   history: createWebHistory(),
   routes
})

router.beforeEach((to: RouteLocationNormalized) => {
   document.title = `Atrium - ${to.meta.title}`
   if (to.meta.requiresAuth && !localStorage.getItem('_uid')) return '/user/login';
})

export default router;