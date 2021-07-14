<template>
  <div class="flex lg:space-x-4 w-full">
   <div class="p-4 flex-1 bg-color-dark-gray-darker shadow-xl rounded-lg">
      <header class="border-b border-color-gray-darkest flex justify-between p-2">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-light font-semibold">
            <span>Statistic</span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
               </svg>
            </span>
         </div>
         <div class="text-color-gray-default hidden sm:block text-sm">Performance {{currentYear}} (Year-To-Date)</div>
      </header>
      <p class="p-2 py-3 text-color-gray-default">Your statistic info</p>
      <div class="grid gap-4 p-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
         <StatisticCard 
            v-for=" stat in statistics"
            :stat="stat"
            :key="stat.id"
         />
      </div>
   </div>
   <div class="flex-shrink-0 hidden lg:flex xl:items-center justify-center rounded-lg hover:bg-color-dark-gray-dark">
      <img class="h-52 w-5h-52 rounded-full" src="https://res.cloudinary.com/ekosutrisno/image/upload/v1625803063/avatars/MyAvatar_taylrm.png" alt="profile">
   </div>
  </div>
  <div class="flex w-full mt-5">
   <div class="p-4 flex-1 lg:max-w-lg bg-color-dark-gray-darker shadow-xl rounded-lg">
       <header class="border-b border-color-gray-darkest flex justify-between p-2">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-light font-semibold">
            <span>Total</span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
               </svg>
            </span>
         </div></header>
      <p class="p-2 py-3 text-color-gray-default">Your performance in {{ currentYear }}</p>
      
      <StatisticCard 
         :stat="statistic"
      />
   </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import StatisticCard, { IStatistic } from '../components/cards/StatisticCard.vue'
const statisticList:IStatistic[] = [
            {
               id: 1,
               progress: 49.329,
               title: 'Absensi',
               to: '#'
            },
            {
               id: 2,
               progress: 47.030,
               title: 'Placement Productivity',
               to: '#'
            },
            {
               id: 3,
               progress: 33.331,
               title: 'Timesheet Collection',
               to: '#'
            },
            {
               id: 4,
               progress: 27.778,
               title: 'Penilaian User',
               to: '#'
            },
];
const statisticTotal: IStatistic = {
      id: 0,
      progress: 43.165,
      title: 'Total Performance',
      to: '#'
};

export default defineComponent({
  components: { StatisticCard },
   setup () {

      const state = reactive({
         statistics: statisticList,
         statistic: statisticTotal, 
         currentYear: new Date().getFullYear()
      })
      

      return {
         ...toRefs(state)
      }
   }
})
</script>