import { RouteRecordRaw } from "vue-router";

// Views
import Dashboard from '../views/Dashboard.vue';
import HomePage from '../views/HomePage.vue';
import Project from '../views/Project.vue';
import ProjectDetail from '../views/ProjectDetail.vue';
import VacancyDetail from '../views/VacancyDetail.vue';
import StatisticDetail from '../views/StatisticDetail.vue';
import Timesheet from '../views/Timesheet.vue';
import UserSettings from '../views/UserSettings.vue';
import Vacancy from '../views/Vacancy.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout.vue';
import WebLayout from '../layouts/WebLayout.vue';

const routes: RouteRecordRaw[] = [
   {
      path: '/',
      name: 'WebLayout',
      component: WebLayout,
      children:[
         {
            path: '/',
            name: 'HomePage',
            component: HomePage,
            meta: {
               title: 'Home Page',
               requiresAuth: false
            }
         },
         {
            path: '/user/login',
            name: 'LoginPage',
            component: LoginPage,
            meta: {
               title: 'Login',
               requiresAuth: false
            }
         },
         {
            path: '/user/register',
            name: 'RegisterPage',
            component: RegisterPage,
            meta: {
               title: 'Register',
               requiresAuth: false
            }
         },
      ]
   },
   {
      path: '/',
      name: 'DashboardLayout',
      component: DashboardLayout,
      children:[
         {
            path: `/u/0/dashboard`,
            name: `Dashboard`,
            component: Dashboard,
            meta: {
               title: `Dashboard`,
               requiresAuth: true
            }
         },
         {
            path: `/u/0/project`,
            name: `Project`,
            component: Project,
            meta: {
               title: `Project`,
               requiresAuth: true
            }
         },
         {
            path: `/u/0/project/:projectId/detail`,
            name: `ProjectDetail`,
            component: ProjectDetail,
            meta: {
               title: `Project Detail`,
               requiresAuth: true
            }
         },
         {
            path: `/u/0/vacancy`,
            name: `Vacancy`,
            component: Vacancy,
            meta: {
               title: `Vacancy`,
               requiresAuth: true
            }
         },
         {
            path: `/u/0/vacancy/:vacancyId/detail`,
            name: `VacancyDetail`,
            component: VacancyDetail,
            meta: {
               title: `Vacancy Detail`,
               requiresAuth: true
            }
         },
         {
            path: `/u/0/timesheet`,
            name: `Timesheet`,
            component: Timesheet,
            meta: {
               title: `Timesheet`,
               requiresAuth: true
            }
         },
         {
            path: `/u/0/settings`,
            name: `UserSettings`,
            component: UserSettings,
            meta: {
               title: `UserSettings`,
               requiresAuth: true
            }
         },
         {
            path: `/u/0/statistic/:year/:category/detail`,
            name: `StatisticDetail`,
            component: StatisticDetail,
            meta: {
               title: `Statistic Detail`,
               requiresAuth: true
            }
         },
      ]
   }
]

export default routes;