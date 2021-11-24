<template>
  <div class="flex flex-col w-full px-0.5">
     <div v-if="!currentMonthExist" class="flex flex-col with-transition space-y-8 my-5 items-center justify-center">
       <div class="flex flex-col items-center space-y-1">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 class="font-semibold dark:text-color-gray-lighter">No Timesheet</h3>
            <p class="text-sm text-gray-700 dark:text-gray-400 text-center">Get started by generating a timesheet. <span v-if="!client">You can generate timesheets if you have a client.</span></p>
       </div>
     <button @click="generateTimesheet" :disabled="!client" class="inline-flex justify-center disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-700 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
      <span class="ml-2"> Timesheet {{ currentMonthAndYear(new Date()) }}</span>
      </button>
     </div>
   <ul v-if="timesheets.length > 0" class="space-y-1">
     <li v-for="ts in timesheets" :key="ts.absensiId">
       <TimesheetCard :timesheet="ts"/>
     </li>
   </ul>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import {computed, defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useTimesheetStore, useUserStore, useUtilityStore } from '../services';
import { isWeekend, currentMonthAndYear } from '../utils/helperFunction';
import TimesheetCard from './cards/TimesheetCard.vue';

export default defineComponent({
  components: { TimesheetCard },
  setup() {
    const timesheetStore = useTimesheetStore();
    const utilityStore = useUtilityStore();
    const userStore = useUserStore();

    const state = reactive({
      timesheets: computed(()=> timesheetStore.timehseets),
      todayAbsentAlready: computed(()=> timesheetStore.todayAbsentAlready),
      currentMonthExist: computed(()=> timesheetStore.currentMonthExist),
      isWeekend: computed(()=> isWeekend(new Date())),
      uid: computed(() => localStorage.getItem('_uid') as string),
      client: computed(()=> userStore.getUserClient)
    })

    const generateTimesheet = () => {
      if(!utilityStore.isOffline)
        timesheetStore.generateTimesheetTemplate(state.uid);
    }

    onMounted(()=> {
      timesheetStore.toDayTimesheet(state.uid, dayjs().format('YYYY-MM-DD'));
      timesheetStore.getAllTimesheet(state.uid);
    });

    return {
      ...toRefs(state),
      generateTimesheet,
      currentMonthAndYear
    }
  },
})
</script>