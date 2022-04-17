<template>
  <div class="wrapper min-h-screen pb-10 bg-color-gray-lighter dark:bg-color-dark-black-darker">
    <header class="bg-color-gray-lighter dark:bg-color-dark-gray-darker shadow sticky top-0 z-20">
      <div class="max-w-7xl mx-auto py-6 px-4 flex items-center justify-between">
        <h1 class="text-lg md:text-3xl font-bold text-color-dark-gray-darkest dark:text-color-dark-gray-lightest">
          Timesheet Management
        </h1>
        <div class="inline-flex items-center space-x-3">
          <router-link to="/a/0/dashboard" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span class="ml-2 hidden sm:block">Admin View</span> 
          </router-link>
        </div>
      </div>
    </header>
     <div class="max-w-7xl mx-auto px-4">
       <div class="max-w-7xl mx-auto sticky top-0 p-4 pb-10 lg:p-0">
          <div class="mt-8 mb-5">
            <p class="text-2xl font-medium dark:text-color-gray-lighter text-color-dark-gray-darker">Timesheet Type</p>
            <p class="text-sm dark:text-color-gray-default text-color-gray-darker">All Menu Action</p>
         </div>

         <!-- Layout Admin -->
         <div class="sm:grid-cols-2 md:grid-cols-3 gap-4 grid w-full">
           <router-link :to="`/a/0/dashboard/timesheet_management/${tab.current}`" v-for="tab in menuTabs" :key="tab.id" class="shadow hover:shadow-xl w-full col-span-1 p-4 bg-white dark:bg-color-dark-gray-darker rounded-md flex flex-col justify-start hover:ring-1 hover:ring-indigo-400 hover:ring-opacity-75 transition-all">
               <div class="text-lg inline-flex items-center space-x-1 text-color-dark-gray-darkest dark:text-color-gray-light font-semibold">
                  {{ tab.text }}
               </div>
               <div class="text-color-dark-black-default with-transition relative mt-2 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between dark:text-color-gray-lightest">
                  <div class="flex flex-col space-y-2">
                     <p class="text-xs text-color-gray-default dark:text-color-gray-default">Description</p>
                     <p class="text-color-dark-gray-darker dark:text-color-gray-light text-sm">
                        {{ tab.description }}
                     </p>
                  </div>
                  <Svg1 class="absolute top-[-3.4rem] -right-4 z-0"/>
               </div>
         </router-link>
         </div>
      </div>
     </div>
  </div>
</template>

<script lang="ts">
import Svg1 from '@/components/svg/Svg1.vue'
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  components: { Svg1 },
  setup () {
    const state = reactive({
      menuTabs:[
        {
          id: 1,
          current: 'need_approve',
          text: 'Need Approval',
          description: 'Timesheet that requires approval, this timesheet is guilty of the employee under the responsibility of ERO.'
        },
      ]
    })
    

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>

</style>