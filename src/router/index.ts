import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "../services";

import routes from './routes';

const router = createRouter({
   history: createWebHistory(),
   routes
})

router.beforeEach((to: RouteLocationNormalized) => {
   document.title = `Atrium - ${to.meta.title}`
   const auth = useAuthStore();
   if (to.meta.requiresAuth && !auth.isLoggedIn) return '/user/login';
})

export default router;