<template>
  <div class="min-h-screen max-h-screen font-quicksand bg-color-gray-lighter dark:bg-color-dark-black-darker">
      <header class="w-full fixed top-0 h-16 bg-color-dark-gray-darkest border-b border-color-dark-gray-darker shadow">
         <div class="flex items-center justify-between py-4 max-w-7xl mx-auto">
            <router-link to="/" class="flex-shrink-0 font-semibold text-color-gray-lightest flex items-center text-2xl">
               <span class="text-indigo-300 font-semibold">AT</span>RIUM
            </router-link>
            <span class="py-1 px-3 text-white bg-indigo-400 rounded-full text-sm font-semibold">
               Admin View
            </span>
         </div>
      </header>
      <div class="pt-14 grid grid-cols-4 gap-4 max-w-7xl mx-auto">
         <header class="shadow w-full col-span-1 p-4 mt-6 bg-white dark:bg-color-dark-gray-darker rounded-md flex flex-col justify-between">
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
         <header class="shadow w-full col-span-3 p-4 mt-6 bg-white dark:bg-color-dark-gray-darker rounded-md flex flex-col justify-between">
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

      <div class="max-w-7xl mx-auto">
          <div class="mt-8 mb-5">
            <p class="text-2xl font-medium dark:text-color-gray-lighter text-color-dark-gray-darker">Administrator</p>
            <p class="text-sm dark:text-color-gray-default text-color-gray-darker">All Action for authorized admin</p>
         </div>

         <!-- Layout Admin -->
         <div class="lg:grid-cols-4 gap-5 grid w-full">
            <!-- Left Side (Navigation) -->
            <div class="lg:col-span-1 space-y-6">
               <!-- Switch Tabs -->
                  <div class="card-wrapper-custom-default overflow-hidden md:sticky top-6 max-h-full">
                     <div class="text-color-dark-black-default dark:text-color-gray-lightest">
                        <div class="text-color-gray-darkest w-full dark:text-color-gray-default flex flex-col">
                           <button 
                              @click="switchTab(menu.current)" 
                              v-for="menu in menuTabs" :key="menu.id" 
                              :class="[currentTabs === menu.current ? 'border-indigo-600 font-semibold bg-indigo-50 dark:bg-color-gray-darkest': 'dark:hover:bg-color-gray-darkest']" 
                              type="button" 
                              class="px-4 py-3 w-full text-gray-700 dark:text-color-gray-lighter inline-flex items-center cursor-default sm:cursor-pointer border-l-4 transition-opacity border-transparent"
                           >
                              {{ menu.text }}
                           </button>
                        </div>
                     </div>
                  </div>
            </div>

            <!-- Right Side (Content) -->
            <div class="lg:col-span-3 space-y-6 text-white">
               {{ currentTabs }}
               <router-view />
            </div>
         </div>
      </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import Svg2 from "../components/svg/Svg2.vue";
import { useUserStore } from "../services";

export default defineComponent({
  components: { Svg2 },
  setup() {
     const userStore = useUserStore();

     const state = reactive({
        currentUser: computed(() => userStore.currentUser),
        menuTabs:[
        {
          id: 1,
          current: 'user_management',
          text: 'User'
        },
        {
          id: 2,
          current: 'timesheet_approval',
          text: 'Timesheet'
        },
        {
          id: 3,
          current: 'statistic_management',
          text: 'Statistic'
        },
        {
          id: 4,
          current: 'client_management',
          text: 'Cient'
        },
        {
          id: 5,
          current: 'role_management',
          text: 'Role'
        },
       ],
      currentTabs: 'user_management',
     })

     
    const switchTab = (current: string): void => {
      state.currentTabs = current;
    }

   return {
      ...toRefs(state),
      switchTab
    };
  },
});
</script>

<style scoped>
</style>