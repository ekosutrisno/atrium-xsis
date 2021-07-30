<template>
  <div class="flex flex-col w-full">
   <ul v-if="timesheets.length > 0" class="space-y-1">
     <li v-for="ts in timesheets" :key="ts.absensiId">
       <TimesheetCard :timesheet="ts"/>
     </li>
   </ul>
   <ul v-else>
     <AddTimesheetCard @after-save="onCreate" v-if="isOnCreate"/>
     <div v-if="!isOnCreate" class="flex flex-col space-y-3 mt-5 items-center justify-center">
       <p class="text-color-gray-default text-sm text-center">
         You still don't have a timesheet pending, please create a timesheet for today by clicking the button below.
       </p>
      <button @click="onCreate" type="button" class="inline-flex items-center space-x-2 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span>
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-lighter" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
          </span>
          <span>Today</span> 
      </button>
     </div>
   </ul>

  </div>
</template>

<script>
import dayjs from 'dayjs';
import {computed, defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useTimesheetStore } from '../services';
import AddTimesheetCard from './cards/AddTimesheetCard.vue';
import TimesheetCard from './cards/TimesheetCard.vue';

export default defineComponent({
  components: { TimesheetCard, AddTimesheetCard },
  setup() {
    const timesheetStore = useTimesheetStore();
    const state = reactive({
      timesheets: computed(()=> timesheetStore.timehseets),
      days: dayjs().daysInMonth(),
      isOnCreate: false
    })

    const onCreate = ()=>{
      state.isOnCreate = !state.isOnCreate;
    }

    onMounted(()=> timesheetStore.getAllTimesheet(localStorage.getItem('_uid')));

    return {
      ...toRefs(state),
      onCreate
    }
  },
})
</script>