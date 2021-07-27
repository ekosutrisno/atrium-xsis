<template>
<div class="flex relative w-full pb-20 md:pb-0">
   <div class="flex-1 rounded-lg">
      <header class="p-4 pt-[18px] sticky -top-1 z-10 bg-color-dark-gray-darker flex justify-between">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-light font-semibold">
            <span>Timesheet</span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-dark" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
               </svg>
            </span>
         </div>
         <div class="text-color-gray-lighter hidden sm:block text-sm">
            <button type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               Send timehseet
            </button>
         </div>
      </header>

      <!-- Lite Date -->
      <div class="card-wrapper-no-rounded rounded-t-lg my-3">
         <div class="flex items-center justify-between">
            <p class="py-3 px-2 text-color-gray-default">Timesheet List</p>
            <button @click="isOnFilter = !isOnFilter" type="button" class="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white">
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </button>
         </div>
      </div>
      <!-- End Lite Date -->
      <TimesheetTable/> 
   </div>
   <button type="button" class="sticky-btn with-transition">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
   </button>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import TimesheetTable from '../components/TimesheetTable.vue';

export default defineComponent({
  components: { TimesheetTable },
   setup () {

      const state = reactive({
         dateValue: [],
         formater: {
            date: 'DD MMM YYYY',
            month: 'MMM'
         },
         isOnFilter: false,
      }) ;


      return {
         ...toRefs(state)
      }
   }
})
</script>

<style scoped>

</style>