import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useUtilityStore } from "../services";

import routes from './routes';

const router = createRouter({
   history: createWebHistory(),
   routes
})

router.beforeEach((to: RouteLocationNormalized) => {
   document.title = `Atrium - ${to.meta.title}`
   const store = useUtilityStore();
   if (to.meta.requiresAuth && !store.isLoggedIn) return '/user/login';
})

export default router;