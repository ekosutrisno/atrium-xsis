<template>
  <div class="flex lg:space-x-4 w-full">
   <div class="p-4 flex-1 bg-color-gray-lightest dark:bg-color-dark-gray-darker shadow-md dark:shadow-xl rounded-lg">
      <header class="border-b border-color-gray-light dark:border-color-gray-darkest flex justify-between py-2">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-dark-gray-darker dark:text-color-gray-light font-semibold">
            <span>Statistic</span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
               </svg>
            </span>
         </div>
         <div class="text-color-gray-darker dark:text-color-gray-default hidden sm:block text-sm">Performance {{currentYear}} (Year-To-Date)</div>
      </header>
      <p class="py-3 text-color-gray-dark dark:text-color-gray-default">Your statistic info</p>
      <ul class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
         <li  v-for=" stat in statistics" :key="stat.id">
            <StatisticCard 
               :stat="stat"
            />
         </li>
      </ul>
   </div>
   <div class="flex-shrink-0 p-2 hidden lg:flex xl:items-center justify-center rounded-lg bg-color-gray-lightest shadow-md dark:bg-color-dark-gray-dark">
      <PieCart class="w-52"/>
   </div>
  </div>
  <div class="flex w-full mt-5">
   <div class="p-4 flex-1 lg:max-w-lg bg-color-gray-lightest dark:bg-color-dark-gray-darker shadow-md dark:shadow-xl rounded-lg">
       <header class="border-b border-color-gray-light dark:border-color-gray-darkest flex justify-between py-2">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-darkest dark:text-color-gray-light font-semibold">
            <span>Total</span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
               </svg>
            </span>
         </div></header>
      <p class="py-3 text-color-gray-dark dark:text-color-gray-default">Performance {{currentYear}}</p>
      
      <StatisticCard 
         :stat="statistic"
      />
   </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import StatisticCard from '../components/cards/StatisticCard.vue'
import PieCart from '../components/chart/PieCart.vue';
import { useStatisticStore } from '../services/useStatisticStore';

export default defineComponent({
  components: { StatisticCard, PieCart },
   setup () {
      const statisticStore = useStatisticStore()

      const state = reactive({
         statistics: computed(()=> statisticStore.statisticList),
         statistic: computed(()=> statisticStore.statisticTotal), 
         currentYear: new Date().getFullYear()
      })
      
      return {
         ...toRefs(state)
      }
   }
})
</script>