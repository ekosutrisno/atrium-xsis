<template>
  <div class="font-quicksand min-h-screen bg-color-gray-lighter dark:bg-color-dark-black-darker">
      <header class="w-full px-4 lg:px-0 fixed z-20 top-0 h-auto bg-color-dark-gray-darkest border-b border-color-dark-gray-darker shadow">
         <div class="flex items-center justify-between py-4 max-w-7xl mx-auto">
            
            <div class="inline-flex items-center">
               <router-link to="/" class="flex-shrink-0 font-semibold text-color-gray-lightest flex items-center text-2xl">
                  <span class="text-indigo-300 font-semibold">AT</span>RIUM
               </router-link>
               <router-link to="/u/0/dashboard" :class="['bg-gray-900 ml-6 text-white px-3 py-2 rounded-md text-sm font-medium']">
                  Main Dashboard
               </router-link>
            </div>
            
            <span class="py-1 px-3 text-white bg-indigo-400 rounded-full text-sm font-semibold">
               Admin View
            </span>
         </div>
      </header>
      <div class="pt-20 px-4 lg:px-0 lg:pt-14 sm:pt-14 grid sm:grid-cols-4 gap-4 max-w-7xl mx-auto">
         <header class="shadow w-full sm:col-span-1 p-4 sm:mt-6 bg-white dark:bg-color-dark-gray-darker rounded-md flex flex-col justify-between">
               <div class="text-lg inline-flex items-center space-x-1 text-color-dark-gray-darkest dark:text-color-gray-light font-semibold">
                  Current User
               </div>
               <div class="text-color-dark-black-default with-transition relative mt-2 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between dark:text-color-gray-lightest">
                  <div class="flex flex-col mt-1 space-y-2">
                     <div class="flex flex-col">
                        <p class="text-sm text-color-gray-default dark:text-color-gray-default">FullName</p>
                        <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ currentUser.fullName}}</p>
                     </div>
                     <div class="flex flex-col">
                        <p class="text-sm text-color-gray-default dark:text-color-gray-default">Email</p>
                        <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ currentUser.email }}</p>
                     </div>
                     <div class="flex flex-col">
                        <p class="text-sm text-color-gray-default dark:text-color-gray-default">Contact</p>
                        <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ currentUser.telephone }}</p>
                     </div>
                  </div>
                  
                  <router-link to="/u/0/settings" class="z-10 absolute -top-8 -right-0">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                           <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                  </router-link>

                  <Svg2 class="absolute top-[-3.25rem] -right-4 z-0"/>
               </div>
         </header>
         <header class="shadow w-full sm:col-span-3 p-4 sm:mt-6 bg-white dark:bg-color-dark-gray-darker rounded-md flex flex-col justify-between">
               <div class="text-lg inline-flex items-center space-x-1 text-color-dark-gray-darkest dark:text-color-gray-light font-semibold">
                  Authorization and Role
               </div>
               <div class="text-color-dark-black-default with-transition relative mt-2 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between dark:text-color-gray-lightest">
                  <div class="flex flex-col mt-1 space-y-2">
                     <div class="flex flex-col">
                        <p class="text-sm text-color-gray-default dark:text-color-gray-default">Role</p>
                        <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ currentUser.mainRole.roleName}}</p>
                     </div>
                     <div class="flex flex-col">
                        <p class="text-sm text-color-gray-default dark:text-color-gray-default">Role Descrition</p>
                        <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ currentUser.mainRole.roleDescription }}</p>
                     </div>
                     <div class="flex flex-col">
                        <p class="text-sm text-color-gray-default dark:text-color-gray-default">Status</p>
                        <p class="text-color-dark-gray-darker dark:text-color-gray-light">
                           <span class="p-1 text-xs dark:bg-[#71c5b0] bg-[#7cd1c6] font-semibold rounded text-color-gray-lightest dark:text-white shadow-lg">
                              {{ currentUser.mainRole.isActive ? 'Active' : 'InActive' }}
                           </span>
                        </p>
                     </div>
                  </div>
                  <img class="h-36 w-36 rounded-full border-color-dark-gray-lightest dark:border-color-gray-darkest shadow-sm border-2 dark:border-opacity-30" :src="currentUser.photoUrl" alt="profile-avatar" />

                  <div class="absolute p-1 text-xs dark:bg-[#9a6fc3] bg-[#a87cd1] font-semibold -bottom-8 right-0 rounded text-color-gray-lightest dark:text-white shadow-lg">
                     {{currentUser.roleDeveloper.roleDeveloperName }}
                  </div>
                  <Svg2 class="absolute top-[-3.25rem] -right-4 z-0"/>
               </div>
         </header>
      </div>

      <div class="max-w-7xl mx-auto sticky top-0 p-4 pb-10 lg:p-0">
          <div class="mt-8 mb-5">
            <p class="text-2xl font-medium dark:text-color-gray-lighter text-color-dark-gray-darker">Administrator Access</p>
            <p class="text-sm dark:text-color-gray-default text-color-gray-darker">All Menu Action for authorized admin</p>
         </div>

         <!-- Layout Admin -->
         <div class="sm:grid-cols-3 gap-4 grid w-full">
           <router-link :to="`/a/0/dashboard/${tabCard.current}`" v-for="tabCard in menuTabs" :key="tabCard.id" class="shadow hover:shadow-xl w-full col-span-1 p-4 bg-white dark:bg-color-dark-gray-darker rounded-md flex flex-col justify-start hover:ring-1 hover:ring-indigo-400 hover:ring-opacity-75 transition-all">
               <div class="text-lg inline-flex items-center space-x-1 text-color-dark-gray-darkest dark:text-color-gray-light font-semibold">
                  {{ `${tabCard.text} Management` }}
               </div>
               <div class="text-color-dark-black-default with-transition relative mt-2 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between dark:text-color-gray-lightest">
                  <div class="flex flex-col space-y-2">
                     <p class="text-xs text-color-gray-default dark:text-color-gray-default">Description</p>
                     <p class="text-color-dark-gray-darker dark:text-color-gray-light text-sm">
                        {{ tabCard.description }}
                     </p>
                  </div>
                  <Svg1 class="absolute top-[-3.5rem] -right-4 z-0"/>
               </div>
         </router-link>
         </div>
      </div>

      <!-- Footer Copyright -->
      <footer class="text-sm hidden sm:block text-color-gray-darker p-3 pb-5 text-center">
         &copy;Eko Sutrisno {{new Date().getFullYear()}}
      </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import Svg1 from "../components/svg/Svg1.vue";
import Svg2 from "../components/svg/Svg2.vue";
import Svg3 from "../components/svg/Svg3.vue";
import { useUserStore } from "../services";

export default defineComponent({
  components: { Svg2, Svg3, Svg1 },
    setup() {
     const userStore = useUserStore();

     const state = reactive({
        currentUser: computed(() => userStore.currentUser),
        menuTabs:[
        {
          id: 1,
          current: 'user_management',
          text: 'User',
          description: 'Manage and manage users, such as editing biodata, checking timesheets, statistics, clients, and user roles.'
        },
        {
          id: 2,
          current: 'timesheet_management',
          text: 'Timesheet',
          description: 'Manage and manage timesheets, add to users, delete timesheets, update, validate, and approve timesheets.'
        },
        {
          id: 3,
          current: 'statistic_management',
          text: 'Statistic',
          description: 'Statistics are part of monitoring user development and productivity for a year, the assessment is carried out in four categories, namely Absence, Placement Productivity, Timesheet Collection, and User Assessment.'
        },
        {
          id: 4,
          current: 'client_management',
          text: 'Cient',
          description: 'Manage and perform create, update, delete clients.'
        },
        {
          id: 5,
          current: 'role_management',
          text: 'Role',
          description: 'Set and assign roles to users, delete roles, change roles, and add new roles.'
        },
      ],
     })

   return {
      ...toRefs(state)
    };
  },
});
</script>