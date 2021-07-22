<template>
<div class="flex relative w-full">
   <div class="flex-1 rounded-lg">
      <header class="p-4 pt-[18px] sticky -top-1 z-10 bg-color-dark-gray-darker flex justify-between">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-light font-semibold">
            <span>Timesheet</span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-dark" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
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
      <div class="card-wrapper-no-rounded rounded-t-lg mt-3">
         <div class="flex items-center justify-between">
            <p class="py-3 px-2 text-color-gray-default">Timesheet List</p>
            <button @click="isOnFilter = !isOnFilter" type="button" class="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
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