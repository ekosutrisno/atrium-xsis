<template>
<div class="max-w-7xl mx-auto p-4 min-h-screen">
    <div class="mb-5 flex items-center justify-between border-b border-gray-200 dark:border-color-gray-darkest pb-2">
      <div>
          <p class="text-2xl font-medium dark:text-color-gray-lighter text-color-dark-gray-darker">Administrator</p>
          <p class="text-sm dark:text-color-gray-default text-color-gray-darker">All Action for authorized admin</p>
      </div>
      <div class="inline-flex items-center space-x-3">
        <div class="text-color-gray-lighter hidden sm:block text-sm">
            <router-link to="/a/0/dashboard" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
               </svg>
               <span class="ml-2">Admin Dashboard</span> 
            </router-link>
         </div>
      </div>
    </div>

    <!-- Layout Admin -->
    <div class="grid-cols-4 grid w-full">
      <!-- Left Side (Navigation) -->
      <div class="col-span-1 space-y-6">
          <!-- Switch Tabs -->
            <div class="overflow-hidden max-h-full">
                <div class="text-color-dark-black-default dark:text-color-gray-lightest">
                  <div class="text-color-gray-darkest w-full dark:text-color-gray-default flex flex-col text-sm">
                      <button 
                        @click="switchTab(menu.current)" 
                        v-for="menu in menuTabs" :key="menu.id" 
                        type="button" 
                        :class="[currentTabs === menu.current ? 'text-indigo-400 font-semibold': 'text-gray-700 dark:text-color-gray-light']" 
                        class="py-3 w-full inline-flex items-center cursor-pointer transition-opacity"
                      >
                        {{ menu.text }}
                      </button>
                  </div>
                </div>
            </div>
      </div>

      <!-- Right Side (Content) -->
      <div class="col-span-3 space-y-6 text-white">
          <router-view />
      </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {

    const state = reactive({
      menuTabs:[
        {
          id: 1,
          current: 'user_management',
          text: 'Biodata'
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