<template>
    <router-link :to="`/a/0/dashboard/timesheet_management/need_approve/${info.userId}/detail`" class="cursor-pointer h-auto with-transition relative overflow-hidden bg-color-gray-lightest dark:bg-color-dark-gray-darker dark:text-color-gray-light md:cursor-pointer hover:shadow-xl hover:ring-1 hover:ring-indigo-400 hover:ring-opacity-75 transition-all border border-gray-200 dark:border-color-gray-darkest rounded-md p-3 flex items-start justify-between">
        <p><span class="font-semibold">{{ info.userFullName  }}</span> | <span class="hidden md:inline text-indigo-400">{{ info.userId }}</span></p>
        <div class="inline-flex items-center space-x-4">
            
            <span v-if="availabelToApproveSize.length" class="rounded-full bg-indigo-400 py-0.5 px-2 text-xs">{{ availabelToApproveSize.length }}</span>

            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" :class="[info.isApprove ? 'text-green-400': 'text-red-500']" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
        </div>
    </router-link>
</template>

<script lang="ts">
import { computed, defineComponent  } from 'vue'

export default defineComponent({
    props:{
        info:{
            type: Object as ()=> any,
            required: true
        }
    },
    setup(props){
        const availabelToApproveSize = computed( ()=> 
            props.info.timesheetCollections.filter((ts: any )=> !ts.isApproved)
        )

        return{
            availabelToApproveSize
        }
    }
})
</script>