import { createRouter, createWebHistory, RouteLocationNormalized } from "vue-router";

import routes from './routes';

const router = createRouter({
   history: createWebHistory(),
   routes
})

router.beforeEach((to: RouteLocationNormalized) => {
   document.title = `Atrium - ${to.meta.title}`

   const isLogedInUserUID = localStorage.getItem('_uid');
   const isNotAdmin = localStorage.getItem('_role') === '6';

   if (to.meta.requiresAuth && !isLogedInUserUID) return '/user/login';
   else if (to.meta.requiresAdmin && (isLogedInUserUID && isNotAdmin)) return '/user/unauthorized'

})

export default router;
