<template>
  <div class="wrapper min-h-screen pb-10 bg-color-gray-lighter dark:bg-color-dark-black-darker">
    <header class="bg-color-gray-lighter dark:bg-color-dark-gray-darker shadow sticky top-0 z-20">
      <div class="max-w-7xl mx-auto py-6 px-4 flex items-center justify-between">
        <h1 class="text-lg md:text-3xl font-bold text-color-dark-gray-darkest dark:text-color-dark-gray-lightest">
          Timesheet Need Approval
        </h1>
        <div class="inline-flex items-center space-x-3">
          <button @click="$router.back()" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <span class="ml-2 hidden sm:block">Back</span> 
          </button>
          <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-2 hidden sm:block">Approve</span> 
          </button>
        </div>
      </div>
    </header>
      <div class="max-w-7xl mx-auto p-4 pb-10">
        <ul v-if="timesheets.length > 0" class="space-y-1">
          <li v-for="ts in timesheets" :key="ts.absensiId">
            <TimesheetCard :timesheet="ts"/>
          </li>
        </ul>
      </div>
  </div>
</template>

<script lang="ts">
import TimesheetAdmin from '@/components/cards/admin/TimesheetAdmin.vue';
import TimesheetCard from '@/components/cards/TimesheetCard.vue';
import { useTimesheetStoreAdmin } from '@/services'
import { IUser } from '@/types/InterfaceType';
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router';

export default defineComponent({
  components: { TimesheetAdmin, TimesheetCard },
  setup () {
    const timesheetStoreAdmin = useTimesheetStoreAdmin();
    const route = useRoute();

    const state = reactive({
      timesheets: computed(()=> timesheetStoreAdmin.timesheetItems)
    })

    onMounted(()=>{
      timesheetStoreAdmin
      .getTimesheetByUserId(route.params.userId as IUser['userId'])
    })
    

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>

</style>