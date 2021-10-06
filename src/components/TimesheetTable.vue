z<template>
  <div class="flex flex-col w-full px-0.5">
     <div v-if="!currentMonthExist" class="flex flex-col with-transition space-y-3 my-5 items-center justify-center">
       <p class="text-color-gray-default text-sm text-center"> 
         You still don't have a timesheet generated for this month, please generate timesheet for this month by clicking the button below.
       </p>
     <button @click="generateTimesheet" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
       Timesheet {{ currentMonthAndYear(new Date()) }}
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
import { useTimesheetStore, useUtilityStore } from '../services';
import { isWeekend, currentMonthAndYear } from '../utils/helperFunction';
import TimesheetCard from './cards/TimesheetCard.vue';

export default defineComponent({
  components: { TimesheetCard },
  setup() {
    const timesheetStore = useTimesheetStore();
    const utilityStore = useUtilityStore();

    const state = reactive({
      timesheets: computed(()=> timesheetStore.timehseets),
      todayAbsentAlready: computed(()=> timesheetStore.todayAbsentAlready),
      currentMonthExist: computed(()=> timesheetStore.currentMonthExist),
      isWeekend: computed(()=> isWeekend(new Date())),
      uid: computed(() => localStorage.getItem('_uid') as string)
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