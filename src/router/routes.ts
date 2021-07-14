import { RouteRecordRaw } from "vue-router";

import Home from '../views/Home.vue';
import Project from '../views/Project.vue';
import Timesheet from '../views/Timesheet.vue';
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
         },
         {
            path: '/u/0/project',
            name: 'Project',
            component: Project,
            meta: {
               title: 'Project'
            }
         },
         {
            path: '/u/0/timesheet',
            name: 'Timesheet',
            component: Timesheet,
            meta: {
               title: 'Timesheet'
            }
         }
      ]
   }
]

export default routes;