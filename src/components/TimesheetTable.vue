<template>
  <div class="flex flex-col w-full">
   <ul class="">
     <li ref="target" v-for="ts in timesheets" :key="ts.absensiId">
       <TimesheetCard :timesheet="ts"/>
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
        timesheets: timesheetStore.timehseets,
        days: dayjs().daysInMonth(),
        isOnExpand: false
     })

    return {
      ...toRefs(state),
    }
  },
})
</script>