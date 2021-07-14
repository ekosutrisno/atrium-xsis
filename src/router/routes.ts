import { RouteRecordRaw } from "vue-router";

// Views
import Home from '../views/Home.vue';
import Project from '../views/Project.vue';
import Timesheet from '../views/Timesheet.vue';
import Settings from '../views/Settings.vue';

// Layouts
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
         },
         {
            path: '/u/0/settings',
            name: 'Settings',
            component: Settings,
            meta: {
               title: 'Settings'
            }
         }
      ]
   }
]

export default routes;