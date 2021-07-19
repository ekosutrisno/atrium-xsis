<template>
<div :class="[isExpand ? 'h-52' : '']" class="grid sm:cursor-pointer sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-color-gray-lightest dark:bg-color-dark-gray-darker dark:text-color-gray-light md:cursor-pointer hover:shadow-2xl hover:ring-1 hover:ring-indigo-400 hover:ring-opacity-75 transition-all border hover:border-transparent hover:scale-105 border-gray-200 dark:border-color-gray-darkest rounded-md p-4">
   <div class="text-sm">
      <label for="candidates" class="font-medium text-gray-700 dark:text-color-dark-gray-lighter"> {{ timesheet.client }}</label>
      <p class="text-gray-500 dark:text-color-gray-light"> {{ formatDate(date) }} </p>
   </div>

    <div class="text-sm">
      <label for="candidates" class="font-medium text-gray-700 dark:text-color-dark-gray-lighter"> Jam Kerja</label>
      <p class="text-gray-500 dark:text-color-gray-light"> 
         {{ timesheet.jamKerjaMulai ? timesheet.jamKerjaMulai : 'Not define' }} 
         - 
         {{ timesheet.jamKerjaSelesai ? timesheet.jamKerjaSelesai : 'Not define' }}
      </p>
   </div>

   <div class="truncate">{{ timesheet.kegiatan}}</div>
   <div class="inline-flex space-x-3 items-center justify-end">
      <div class="p-0.5 px-2 h-5 inline-flex items-center justify-center rounded-full text-[11px] border border-opacity-50 border-gray-300 dark:border-color-gray-darkest"> {{ timesheet.isDone ? 'done' : 'active' }} </div>
      <svg @click="onExpand" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 md:cursor-pointer text-gray-300 dark:text-color-gray-darkest transition-all hover:text-red-400 dark:hover:text-red-400" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 md:cursor-pointer text-color-gray-default dark:text-color-gray-darker transition-all hover:text-indigo-600 dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
         <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
   </div>
</div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, reactive, toRefs } from 'vue'
import { ITimesheet } from '../../types/InterfaceType'

export default defineComponent({
   props:{
      timesheet: {
         type: Object as ()=> ITimesheet,
         required: true
      },
      date:{
         type: Number as ()=> number,
         required: true
      }
   },
   setup () {
      const state = reactive({
         isExpand: false
      })

      const formatDate = (value: number) =>{
        return dayjs().date(value)
            .format('LL')
      }

      const onExpand = () =>{
        return state.isExpand = !state.isExpand
      }


      return {
         ...toRefs(state),
         formatDate,
         onExpand
      }
   }
})
</script>

<style scoped>

</style>