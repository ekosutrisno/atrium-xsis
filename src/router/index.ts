import { createRouter, createWebHistory, RouteLocationNormalized } from "vue-router";

import routes from './routes';

const router = createRouter({
   history: createWebHistory(),
   routes
})

router.beforeEach((to: RouteLocationNormalized) => {
   document.title = `Atrium - ${to.meta.title}`;

   const isLogedInUserUID = localStorage.getItem('_uid');
   const exclude = ['6','7'];
   const isNotAdmin = exclude.includes(localStorage.getItem('_role') as string);

   if (to.meta.requiresAuth && !isLogedInUserUID) return '/user/login';
   else if (to.meta.requiresAdmin && (isLogedInUserUID && isNotAdmin)) return '/user/unauthorized'

})

export default router;
