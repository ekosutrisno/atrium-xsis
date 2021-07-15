<template>
<div class="flex relative w-full">
   <div class="flex-1 shadow-xl rounded-lg">
      <header class="p-4 pt-[18px] sticky -top-1 bg-color-dark-gray-darker flex justify-between">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-light font-semibold">
            <span>Timesheet</span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
            </span>
         </div>
         <div class="text-color-gray-lighter hidden sm:block text-sm">
            <button type="button" class="p-3 rounded-md bg-indigo-400">
               Cetak Timesheet
            </button>
         </div>
      </header>
      <p class="py-3 px-2 text-color-gray-default">Timesheet List</p>
      <TimesheetTable/>
   </div>
   <button type="button" class="p-3.5 sm:hidden fixed right-5 shadow-xl bottom-[4.5rem] cursor-default text-color-gray-light rounded-full bg-indigo-400">
      <svg xmlns="http://www.w3.org/2000/svg"  area-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd" />
      </svg>
   </button>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TimesheetTable from '../components/TimesheetTable.vue'

export default defineComponent({
  components: { TimesheetTable },
   setup () {
      
      const downloadPdf = (dateFrom: string, dateTo: string) =>{
         var url = 'http://atrium.xsis.co.id/api/timesheet/retrieve-data/2021-7-13/2021-7-14'
         
         // let link = document.createElement('a')
         // link.href = url;
         // link.download = 'Results.pdf'
         // link.click()
         console.log(url);
      }

      return {
         downloadPdf
      }
   }
})
</script>

<style scoped>

</style>