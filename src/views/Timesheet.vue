<template>
<div class="flex relative w-full pb-20 md:pb-0">
   <!-- Spinner and State Loading -->
    <div v-if="onGenerateProcess" :class="[useBlur ? 'custom-backdrop bg-opacity-50' : 'bg-opacity-70']" class="fixed z-30 inset-0 bg-gray-600 transition-opacity flex items-center justify-center">
      <div class="flex flex-col items-center">
        <Spinner />
        <p class="font-semibold text-white">Generating timesheet</p>
      </div>
    </div>

   <div class="flex-1 rounded-lg">
      <header :class="[useBlur ? 'custom-backdrop bg-opacity-90' : '']" class="shadow-md p-4 pt-[18px] sticky -top-1 z-10 bg-color-dark-gray-darker rounded-md flex justify-between">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-light font-semibold">
            <span>Timesheet</span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-dark" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
               </svg>
            </span>
         </div>
         <div class="text-color-gray-lighter hidden sm:block text-sm">
            <button
               @click="sendTimesheet" 
               :disabled="timesheetStatusReady" 
               type="button"
               :class="[timesheetStatusReady 
                  ? 'bg-gray-600 cursor-not-allowed hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500' 
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
               ]" 
               class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
            >
               Send timehseet
            </button>
         </div>
      </header>

      <!-- Lite Date -->
      <div class="card-wrapper-no-rounded rounded-md mb-3 mt-6">
         <div class="flex relative w-full flex-col sm:flex-row items-start sm:items-center justify-between">
            <p class="py-3 px-2 text-color-gray-darkest dark:text-color-gray-default">Timesheet List</p>
            <div class="flex flex-col w-full sm:w-auto items-start space-y-2 justify-between sm:flex-row sm:items-end sm:space-x-2">
               <div v-if="isOnFilter" class="flex flex-col w-full items-start space-y-2 justify-between sm:flex-row sm:items-end sm:space-x-2">
                  <dd v-if="isOnFilter" class="input-custom-dd with-transition w-full">
                     <label for="search-from" class="text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">From</label>
                     <input
                        type="date" v-model="search.from" name="search-from" id="search-from" autocomplete="off"
                        :readonly="!isOnFilter"
                        :class="[ isOnFilter ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                        class="input-custom-default" 
                     />
                  </dd>
                  <dd v-if="isOnFilter" class="input-custom-dd with-transition w-full">
                     <label for="seacrh-to" class="text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">To</label>
                     <input
                        type="date" v-model="search.to" name="seacrh-to" id="seacrh-to" autocomplete="off"
                        :readonly="!isOnFilter"
                        :class="[ isOnFilter ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                        class="input-custom-default" 
                     />
                  </dd>
               </div>
               <dd v-if="filterPerMonth" class="input-custom-dd with-transition w-full">
                  <label for="seacrh-to" class="text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">Month</label>
                  <input
                     type="month" v-model="search.perMonth" name="seacrh-to" id="seacrh-to" autocomplete="off"
                     :readonly="!filterPerMonth"
                     :class="[ filterPerMonth ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                     class="input-custom-default" 
                  />
               </dd>
              <div class="inline-flex items-center justify-end space-x-3">
                  <button v-if="isOnFilter || filterPerMonth" @click="toggleCancel" type="button" class="inline-flex items-center px-4 py-2 cursor-default sm:cursor-pointer border border-gray-300 dark:border-color-gray-darkest rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-color-gray-lighter bg-white dark:bg-color-gray-darkest dark:hover:bg-color-dark-gray-darker hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                     Cancel
                  </button>
                  <button v-if="isOnFilter || filterPerMonth" @click="onSearchAction" type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                     Search
                  </button>
              </div>
            </div>
            <div v-if="!isOnFilter && !filterPerMonth" class="inline-flex items-center space-x-3">
               <div class="flex flex-col items-center space-y-1">
                  <button @click="toggleSearch" type="button" class="p-2 flex rounded-full bg-color-gray-light text-color-gray-darker hover:bg-color-gray-lighter dark:bg-color-gray-darkest dark:hover:bg-color-gray-darker dark:text-color-gray-lighter">
                     <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w- text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                     </svg>
                  </button>
                  <span class="text-color-gray-darkest dark:text-color-gray-default text-xs">Search</span>
               </div>

               <div class="flex flex-col items-center space-y-1">
                  <button @click="toglePerMonth" type="button" class="p-2 flex rounded-full bg-color-gray-light text-color-gray-darker hover:bg-color-gray-lighter dark:bg-color-gray-darkest dark:hover:bg-color-gray-darker dark:text-color-gray-lighter">
                     <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 text-color-gray-dark" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                     </svg>
                  </button>
                  <span class="text-color-gray-darkest dark:text-color-gray-default text-xs">Per Month</span>
               </div>

               <div class="flex flex-col items-center space-y-1">
                  <button @click="onRefresh" type="button" class="p-2 flex rounded-full bg-color-gray-light text-color-gray-darker hover:bg-color-gray-lighter dark:bg-color-gray-darkest dark:hover:bg-color-gray-darker dark:text-color-gray-lighter">
                     <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 text-color-gray-dark" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                     </svg>
                  </button>
                  <span class="text-color-gray-darkest dark:text-color-gray-default text-xs">Refresh</span>
               </div>
            </div>
         </div>
      </div>
      <TimesheetTable/>
   </div>
   <button type="button" @click="sendTimesheet" :disabled="timesheetStatusReady" :class="[timesheetStatusReady ? 'sticky-btn-disabled' : 'sticky-btn']" class=" with-transition">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
         <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
         <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
   </button>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useTimesheetStore, useUtilityStore } from '../services';
import Spinner from '../components/modal/Spinner.vue';
import TimesheetTable from '../components/TimesheetTable.vue';

export default defineComponent({
  components: { TimesheetTable, Spinner },
   setup () {
      const timehseetStore = useTimesheetStore();
      const utilityStore = useUtilityStore();

      const state = reactive({
         isOnFilter: false,
         filterPerMonth: false,
         uid: computed(()=> localStorage.getItem('_uid') as string),
         search: {
            from: '',
            to: '',
            perMonth: ''
         },
         timesheetSize: computed(()=> timehseetStore.timehseets.length),
         isSendProgress: computed(()=> timehseetStore.isSendProgress),
         useBlur: computed(()=> utilityStore.useBlur),
         onGenerateProcess: computed(()=> timehseetStore.onGenerateProcess),
         timesheetNotReady: computed(()=> timehseetStore.timesheetNotReady),
      });

      /** Automaticly Generate Timesheet Template 
       * to specific Month if does not exist
      */
      onMounted(()=>{
         timehseetStore.checkCurrentMonthTimesheet();
      });

      const onSearchAction = ()=> {

         const params= { 
            from: state.search.from, 
            to: state.search.to,
            months: state.search.perMonth, 
            perMonth: state.filterPerMonth ? true : false 
         };

         timehseetStore
            .filterAndSearchTimesheet(state.uid, params).then(()=> {
               toggleCancel();
            })
      }

      const timesheetStatusReady = computed(()=> state.timesheetSize > 0 || state.timesheetNotReady);

      const sendTimesheet = ()=>{
         timehseetStore
            .checkTimesheetAlreadyAndUpdate(state.uid, timesheetStatusReady.value);
      }

      const onRefresh = ()=>{
         timehseetStore.getAllTimesheet(state.uid);
      }

      const toggleSearch = ()=> {
         state.isOnFilter = !state.isOnFilter;
         state.search.from = '';
         state.search.to = '';
      }

      const toggleCancel = ()=> {
         state.isOnFilter = false;
         state.filterPerMonth = false;
         state.search.perMonth = '';
         state.search.from = '';
         state.search.to = '';
      }

      const toglePerMonth = ()=> {
         state.filterPerMonth = !state.filterPerMonth;
         state.search.perMonth = '';
      }

      return {
         ...toRefs(state),
         timesheetStatusReady,
         onSearchAction,
         sendTimesheet,
         toggleSearch,
         toglePerMonth,
         toggleCancel,
         onRefresh
      }
   }
})
</script>