<template>
<div class="pb-10">
  <div class="flex lg:space-x-4 w-full">
   <div class="p-4 flex-1 card-wrapper-general-theme">
      <header class="border-b border-color-gray-light dark:border-color-gray-darkest flex justify-between py-2">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-dark-gray-darker dark:text-color-gray-light font-semibold">
            <span>Statistic</span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
               </svg>
            </span>
         </div>
         <div class="text-color-gray-darker dark:text-color-gray-default hidden sm:block text-sm">Performance {{currentYear}} (Year-To-Date)</div>
      </header>
      <p class="py-3 text-color-gray-dark dark:text-color-gray-default">Your statistic info</p>
      <ul class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
         <li  v-for=" stat in statistic.info" :key="stat.id">
            <StatisticCard 
               :stat="stat"
            />
         </li>
      </ul>
   </div>
   <div class="flex-shrink-0 p-2 max-h-60 relative hidden lg:flex xl:items-center justify-center card-wrapper-general-theme">
      <img aria-hidden="true" class="hidden lg:block object-cover absolute inset-0" src="https://www.gstatic.com/mobilesdk/180824_mobilesdk/alertsDrawerEmptyState@2x.png" alt="img">
      <div class="w-52"></div>
   </div>
  </div>
  <div class="flex flex-col sm:space-x-4 space-y-6 sm:space-y-0 sm:flex-row w-full mt-5">
      <div class="p-4 flex-1 lg:max-w-lg card-wrapper-general-theme">
         <header class="border-b border-color-gray-light dark:border-color-gray-darkest flex justify-between py-2">
            <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-darkest dark:text-color-gray-light font-semibold">
               <span>Total Performance</span> 
               <span>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
               </span>
            </div></header>
         <p class="py-3 text-color-gray-dark dark:text-color-gray-default">Performance {{currentYear}}</p>
         
         <StatisticCard 
            :stat="statistic.total"
         />
      </div>
      <div class="p-4 flex-1 card-wrapper-general-theme">
         <header class="border-b border-color-gray-light dark:border-color-gray-darkest flex justify-between py-2">
            <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-darkest dark:text-color-gray-light font-semibold">
               <span>Clients</span> 
               <span>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
               </span>
            </div></header>
         <p class="py-3 text-color-gray-dark dark:text-color-gray-default">Current Clients {{currentYear}}</p>
         
         <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col text-sm">
            <ul v-if="client">
                  <div class="flex items-start w-full">
                     <div class="flex-none text-color-gray-darkest dark:text-color-gray-light">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                     </div>
                     <div class="flex flex-col flex-1 w-full pl-2">
                        <span  class="font-semibold transition-colors text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-400 sm:cursor-pointer"> 
                           {{ client.name }} 
                        </span>
                        <span class="text-sm mt-1">
                           {{ client.address }}, {{ client.provinsi }}, {{ client.country }}.
                        </span>
                     </div>
                  </div>
            </ul>
            <div v-else class="flex items-start w-full">
               <div class="flex-none text-color-gray-darkest dark:text-color-gray-light">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
               </div>
               <div class="flex flex-col flex-1 w-full pl-2">
                  <span  class="font-semibold transition-colors text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-400 sm:cursor-pointer"> 
                     __NO_CLIENT__  
                  </span>
                  <span class="text-sm mt-1">
                     Currently you don't have a client
                  </span>
               </div>
            </div>
         </div>
      </div>
      <div class="p-4 flex-1 sm:hidden lg:max-w-lg card-wrapper-general-theme">
         <header class="border-b border-color-gray-light dark:border-color-gray-darkest flex justify-between py-2">
            <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-darkest dark:text-color-gray-light font-semibold">
               <span>Chart</span> 
               <span>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
               </span>
            </div>
         </header>
         <p class="py-3 text-color-gray-dark dark:text-color-gray-default">Performance {{currentYear}}</p>
         <div class="h-52 w-52 relative mx-auto">
            <img aria-hidden="true" class="object-cover h-full w-full absolute inset-0" src="https://www.gstatic.com/mobilesdk/180824_mobilesdk/alertsDrawerEmptyState@2x.png" alt="img">
         </div>
      </div>
  </div>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import StatisticCard from '../components/cards/StatisticCard.vue'
import { useStatisticStore, useUserStore } from '../services';

export default defineComponent({
  components: { StatisticCard },
   setup () {
      const statisticStore = useStatisticStore();
      const userStore = useUserStore();

      const state = reactive({
         statistic: computed(()=> statisticStore.statistic),
         client: computed(()=> userStore.getUserClient),
         currentYear: new Date().getFullYear(),
         uid: computed(()=> localStorage.getItem('_uid') as string)
      })

      onMounted(()=> {
         statisticStore.getUserStatistic(state.uid);
      })

      return {
         ...toRefs(state)
      }
   }
})
</script>