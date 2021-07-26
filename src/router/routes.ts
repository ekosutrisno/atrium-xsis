import { RouteRecordRaw } from "vue-router";

// Views
import Home from '../views/Home.vue';
import Project from '../views/Project.vue';
import ProjectDetail from '../views/ProjectDetail.vue';
import VacancyDetail from '../views/VacancyDetail.vue';
import Timesheet from '../views/Timesheet.vue';
import UserSettings from '../views/UserSettings.vue';
import Vacancy from '../views/Vacancy.vue';

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
               title: 'Home',
               requiresAuth: true
            }
         },
         {
            path: '/u/0/project',
            name: 'Project',
            component: Project,
            meta: {
               title: 'Project',
               requiresAuth: true
            }
         },
         {
            path: '/u/0/project/:projectId/detail',
            name: 'ProjectDetail',
            component: ProjectDetail,
            meta: {
               title: 'Project Detail',
               requiresAuth: true
            }
         },
         {
            path: '/u/0/vacancy',
            name: 'Vacancy',
            component: Vacancy,
            meta: {
               title: 'Vacancy',
               requiresAuth: true
            }
         },
         {
            path: '/u/0/vacancy/:vacancyId/detail',
            name: 'VacancyDetail',
            component: VacancyDetail,
            meta: {
               title: 'Vacancy Detail',
               requiresAuth: true
            }
         },
         {
            path: '/u/0/timesheet',
            name: 'Timesheet',
            component: Timesheet,
            meta: {
               title: 'Timesheet',
               requiresAuth: true
            }
         },
         {
            path: '/u/0/settings',
            name: 'UserSettings',
            component: UserSettings,
            meta: {
               title: 'UserSettings',
               requiresAuth: true
            }
         }
      ]
   }
]

export default routes;