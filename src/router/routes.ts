import { RouteRecordRaw } from "vue-router";

import Home from '../views/Home.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';

const routes: RouteRecordRaw[] = [
   {
      path: '/',
      name: 'DashboardLayout',
      component: DashboardLayout,
      children:[
         {
            path: '/u/0/dashboard',
            name: 'Home',
            component: Home,
            meta: {
               title: 'Home'
            }
         }
      ]
   }
]

export default routes;