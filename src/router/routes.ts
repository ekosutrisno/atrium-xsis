import { RouteRecordRaw } from "vue-router";

// Views web
import HomePage from '../views/web/HomePage.vue';
import HelpPage from '../views/web/HelpPage.vue';
import LoginPage from '../views/web/LoginPage.vue';
import RegisterPage from '../views/web/RegisterPage.vue';
import ResetPasswordPage from '../views/web/ResetPasswordPage.vue';

// View Admin
import UserAdminAction from '../views/admin/UserAdminAction.vue';
import TimesheetAdminAction from '../views/admin/TimesheetAdminAction.vue';
import ClientAdminAction from '../views/admin/ClientAdminAction.vue';
import StatisticAdminAction from '../views/admin/StatisticAdminAction.vue';
import RoleAdminAction from '../views/admin/RoleAdminAction.vue';

// Views Default
import Dashboard from '../views/Dashboard.vue';
import Project from '../views/Project.vue';
import ProjectDetail from '../views/ProjectDetail.vue';
import VacancyDetail from '../views/VacancyDetail.vue';
import VacancyApply from '../views/VacancyApply.vue';
import StatisticDetail from '../views/StatisticDetail.vue';
import Timesheet from '../views/Timesheet.vue';
import UserSettings from '../views/UserSettings.vue';
import Vacancy from '../views/Vacancy.vue';

// Layouts
import AdminView from '../layouts/AdminView.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import WebLayout from '../layouts/WebLayout.vue';

const routes: RouteRecordRaw[] = [
   {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/web/404.vue"),
      meta: {
         title: 'Not Found Page',
         description: 'The page you are looking for is not available or not found.',
         requiresAuth: false
      }
   },
   {
      path: '/',
      name: 'WebLayout',
      component: WebLayout,
      children: [
         {
            path: '/',
            name: 'HomePage',
            component: HomePage,
            meta: {
               title: 'Home Page',
               description: 'Welcome to the Atrium app.',
               requiresAuth: false
            }
         },
         {
            path: '/user/help',
            name: 'HelpPage',
            component: HelpPage,
            meta: {
               title: 'Help Page',
               description: 'Is a help page, if there are problems in the process of using the Atrium application.',
               requiresAuth: false
            }
         },
         {
            path: '/user/login',
            name: 'LoginPage',
            component: LoginPage,
            meta: {
               title: 'Login',
               description: 'Login page, after logging in you will be able to carry out activities in the application.',
               requiresAuth: false
            }
         },
         {
            path: '/user/register',
            name: 'RegisterPage',
            component: RegisterPage,
            meta: {
               title: 'Register',
               description: `You don't have me Atrium? if not, let's register immediately and enjoy all the features and conveniences.`,
               requiresAuth: false
            }
         },
         {
            path: '/user/reset-password',
            name: 'ResetPasswordPage',
            component: ResetPasswordPage,
            meta: {
               title: 'Reset Password',
               description: `Please enter your new password, and don't forget it again.`,
               requiresAuth: false
            }
         },
         {
            path: '/user/unauthorized',
            name: 'UnAuthorize',
            component: () => import("../views/web/401.vue"),
            meta: {
               title: 'UnAuthorize',
               description: `Oops, sorry it looks like you are not authorized to access this page.`,
               requiresAuth: true
            }
         },
         {
            path: '/user/__/auth/action',
            name: 'AuthAction',
            component: () => import("../views/web/AuthActionPage.vue"),
            meta: {
               title: 'Auth Action',
               description: `If you've forgotten your password, this is the place to fix it.`,
               requiresAuth: false
            }
         },
      ]
   },
   {
      path: '/',
      name: 'DashboardLayout',
      component: DashboardLayout,
      children: [
         {
            path: `/u/0/dashboard`,
            name: `Dashboard`,
            component: Dashboard,
            meta: {
               title: `Dashboard`,
               description: 'This is the main dashboard page, which contains an overview of your performance.',
               requiresAuth: true
            }
         },
         {
            path: `/u/0/project`,
            name: `Project`,
            component: Project,
            meta: {
               title: `Project`,
               description: 'Project page to record all the project portfolios that you have worked on so far.',
               requiresAuth: true
            }
         },
         {
            path: `/u/0/project/:projectId/detail`,
            name: `ProjectDetail`,
            component: ProjectDetail,
            meta: {
               title: `Project Detail`,
               description: 'Here you can see the details and also make updates if needed.',
               requiresAuth: true
            }
         },
         {
            path: `/u/0/vacancy`,
            name: `Vacancy`,
            component: Vacancy,
            meta: {
               title: `Vacancy`,
               description: 'All internal job openings are attached here, so please if you are interested in applying.',
               requiresAuth: true
            }
         },
         {
            path: `/u/0/vacancy/:vacancyId/detail`,
            name: `VacancyDetail`,
            component: VacancyDetail,
            meta: {
               title: `Vacancy Detail`,
               description: 'To see more details about the internals of the currently open job.',
               requiresAuth: true
            }
         },
         {
            path: `/u/0/vacancy/:vacancyId/apply`,
            name: `VacancyApply`,
            component: VacancyApply,
            meta: {
               title: `Vacancy Apply`,
               description: 'You can apply for jobs here, and prepare your best CV.',
               requiresAuth: true
            }
         },
         {
            path: `/u/0/timesheet`,
            name: `Timesheet`,
            component: Timesheet,
            meta: {
               title: `Timesheet`,
               description: 'This is where you write down all your daily activities.',
               requiresAuth: true
            }
         },
         {
            path: `/u/0/settings`,
            name: `UserSettings`,
            component: UserSettings,
            meta: {
               title: `UserSettings`,
               description: 'Where you can update your profile and preferences.',
               requiresAuth: true
            }
         },
         {
            path: `/u/0/statistic/:year/:category/detail`,
            name: `StatisticDetail`,
            component: StatisticDetail,
            meta: {
               title: `Statistic Detail`,
               description: 'On this page you will be able to see in detail your performance statistics.',
               requiresAuth: true
            }
         },
      ]
   },
   {
      path: '/a/0/dashboard',
      name: 'AdminView',
      component: AdminView,
      meta: {
         title: 'Admin View',
         description: 'Main dashboard page exclusively for admins.',
         requiresAuth: true,
         requiresAdmin: true
      }
   },
   {
      path: '/',
      name: 'AdminLayout',
      component: AdminLayout,
      children: [
         {
            path: `/a/0/dashboard/user_management`,
            name: `UserAdminAction`,
            component: UserAdminAction,
            meta: {
               title: `User Admin Action`,
               description: 'Pages for managing all users',
               requiresAuth: true,
               requiresAdmin: true
            }
         },
         {
            path: `/a/0/dashboard/timesheet_management`,
            name: `TimesheetAdminAction`,
            component: TimesheetAdminAction,
            meta: {
               title: `Timesheet Admin Action`,
               description: 'Pages for managing all timesheets',
               requiresAuth: true,
               requiresAdmin: true
            }
         },
         {
            path: `/a/0/dashboard/statistic_management`,
            name: `StatisticAdminAction`,
            component: StatisticAdminAction,
            meta: {
               title: `Statistic Admin Action`,
               description: 'Pages for managing all users statistics',
               requiresAuth: true,
               requiresAdmin: true
            }
         },
         {
            path: `/a/0/dashboard/client_management`,
            name: `ClientAdminAction`,
            component: ClientAdminAction,
            meta: {
               title: `Client Admin Action`,
               description: 'Pages for managing all company client',
               requiresAuth: true,
               requiresAdmin: true
            }
         },
         {
            path: `/a/0/dashboard/role_management`,
            name: `RoleAdminAction`,
            component: RoleAdminAction,
            meta: {
               title: `Role Admin Action`,
               description: 'Pages for managing all roles',
               requiresAuth: true,
               requiresAdmin: true
            }
         },
      ]
   }

]

export default routes;