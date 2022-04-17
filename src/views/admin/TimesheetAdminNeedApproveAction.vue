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
        </div>
      </div>
    </header>
      <div class="max-w-7xl mx-auto p-4 pb-10">
        <ul class="grid grid-cols-1">
            <TimesheetAdmin 
              v-for="ts in allNeedApproval" 
              :key="ts.userId"
              :info="ts"
            />
        </ul>
     </div>
  </div>
</template>

<script lang="ts">
import TimesheetAdmin from '@/components/cards/admin/TimesheetAdmin.vue';
import { useTimesheetStoreAdmin } from '@/services'
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'

export default defineComponent({
  components: { TimesheetAdmin },
  setup () {
    const timesheetStoreAdmin = useTimesheetStoreAdmin();

    const state = reactive({
      allNeedApproval: computed(()=> timesheetStoreAdmin.timesheetNeedApprovalList)
    })

    onMounted(()=>{
      timesheetStoreAdmin.listAll()
    })
    

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>

</style>