<template>
  <div class="flex flex-col w-full">
   <ul class="space-y-1">
     <li v-for="ts in days" :key="ts">
       <TimesheetCard :date="ts" :timesheet="timesheets"/>
     </li>
   </ul>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import {defineComponent, reactive, toRefs } from 'vue';
import { useTimesheetStore } from '../services';
import TimesheetCard from './cards/TimesheetCard.vue';

export default defineComponent({
  components: { TimesheetCard },
  setup() {
     const timesheetStore = useTimesheetStore();
     const state = reactive({
        timesheets: timesheetStore.timehseets[0],
        days: dayjs().daysInMonth()
     })

    return {
      ...toRefs(state)
    }
  },
})
</script>