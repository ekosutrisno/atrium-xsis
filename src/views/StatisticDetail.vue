<template>
<div class="flex relative w-full pb-20">
   <div class="flex-1">
      <header :class="[useBlur ? 'custom-backdrop bg-opacity-90' : '']" class="shadow-sm p-4 pt-[18px] sticky -top-1 z-20 bg-color-dark-gray-darker rounded-md flex justify-between">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-light font-semibold">
            <span>Statistic</span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
               </svg>
            </span>
         </div>
         <div class="text-color-gray-lighter hidden sm:block text-sm">
            <router-link to="/u/0/dashboard" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
               </svg>
               <span class="ml-2">Dashboard</span> 
            </router-link>
         </div>
      </header>
      <header class="shadow p-4 mt-6 bg-white dark:bg-color-dark-gray-darker rounded-md flex flex-col justify-between max-w-screen-sm">
         <div class="text-lg inline-flex items-center space-x-1 text-color-dark-gray-darkest dark:text-color-gray-light font-normal">
            <span> {{ defineTitle }} </span>
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 text-color-gray-dark" viewBox="0 0 20 20" fill="currentColor">
               <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
               </svg>
            </span>
         </div>
         <div class="text-color-dark-black-default with-transition relative mt-2 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between dark:text-color-gray-lightest">
            <div class="flex flex-col mt-1 space-y-2">
               <div class="flex flex-col">
                  <p class="text-sm text-color-gray-default dark:text-color-gray-default">FullName</p>
                  <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ currentUser.fullName}}</p>
               </div>
               <div class="flex flex-col">
                  <p class="text-sm text-color-gray-default dark:text-color-gray-default">Email</p>
                  <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ currentUser.email }}</p>
               </div>
               <div class="flex flex-col">
                  <p class="text-sm text-color-gray-default dark:text-color-gray-default">Contact</p>
                  <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ currentUser.telephone }}</p>
               </div>
            </div>
            <img class="h-36 w-36 rounded-full border-color-dark-gray-lightest dark:border-color-gray-darkest shadow-sm border-2 dark:border-opacity-30" :src="currentUser.photoUrl" alt="profile-avatar" />
            
            <div :class="[currentUserDeveloperRole.roleDeveloperId == 7 ? 'dark:bg-[#28a3a3] bg-[#54b3b3]' : 'dark:bg-[#9a6fc3] bg-[#a87cd1]']" class="absolute p-1 text-xs font-semibold -bottom-8 right-0 rounded text-color-gray-lightest dark:text-white shadow-lg">
                {{currentUserDeveloperRole.roleDeveloperName }}
            </div>
            
           <router-link to="/u/0/settings" class="z-10 absolute -top-8 -right-0">
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
               </svg>
           </router-link>

            <Svg2 class="absolute top-[-3.25rem] -right-4 z-0"/>
         </div>
      </header>

      <p class="py-4 text-sm text-color-dark-gray-light">Details per Month</p>

      <!-- Absen -->
      <div v-if="category === '1'" >
         <ul v-if="absenStatistics.length"  class="grid md:grid-cols-2 gap-1.5 px-0.5">
           <li v-for="absen in absenStatistics" :key="absen.month">
               <AbsentCard :absen="absen"/>
            </li>
         </ul>
         <BlankStatistic v-else/>
      </div>

      <!-- Placement -->
      <div v-if="category === '2'" >
         <ul v-if="placementStatistics.length" class="grid md:grid-cols-2 gap-1.5 px-0.5">
           <li v-for="placement in placementStatistics" :key="placement.month">
               <AbsentCard :absen="placement"/>
            </li>
         </ul>
         <BlankStatistic v-else/>
      </div>

      <!-- Collections Timesheet -->
      <div v-if="category === '3'">
         <ul v-if="collectionStatistics.length" class="grid md:grid-cols-2 gap-1.5 px-0.5">
           <li v-for="coll in collectionStatistics" :key="coll.month">
               <CollectionTsCard :collectionTs="coll"/>
            </li>
         </ul>
          <BlankStatistic v-else/>
      </div>

      <!-- Penilaian User -->
      <div v-if="category === '4'">
         <ul v-if="penilaianStatistics.length" class="grid md:grid-cols-2 gap-1.5 px-0.5">
           <li  v-for="nilai in penilaianStatistics" :key="nilai.month">
               <PenilaianUserCard :nilai="nilai"/>
            </li>
         </ul>
          <BlankStatistic v-else/>
      </div>

      <!-- Total Statistic -->
      <div v-if="category === '5'">
         <ul v-if="totalStatistics.length" class="grid gap-1.5 px-0.5">
           <li v-for="performance in totalStatistics" :key="performance.month">
               <TotalPerformanceCard :performance="performance"/>
            </li>
         </ul>
          <BlankStatistic v-else/>
      </div>
   </div>
   <router-link to="/u/0/dashboard" type="button" class="sticky-btn with-transition">
     <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
       <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
   </router-link>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router';
import AbsentCard from '@/components/cards/AbsentCard.vue';
import BlankStatistic from '@/components/cards/BlankStatistic.vue';
import CollectionTsCard from '@/components/cards/CollectionTsCard.vue';
import PenilaianUserCard from '@/components/cards/PenilaianUserCard.vue';
import ProjectCard from '@/components/cards/ProjectCard.vue'
import TotalPerformanceCard from '@/components/cards/TotalPerformanceCard.vue';
import Svg2 from '@/components/svg/Svg2.vue';
import { useStatisticStore, useUserStore, useUtilityStore } from '@/services';

export default defineComponent({
  components: { ProjectCard, Svg2, AbsentCard, CollectionTsCard, PenilaianUserCard, TotalPerformanceCard, BlankStatistic},
   setup () {
      const utilityStore = useUtilityStore();
      const userStore = useUserStore()
      const statisticStore = useStatisticStore();
      const route = useRoute();

      const state = reactive({
         useBlur: computed(() => utilityStore.useBlur),
         category: computed(()=>route.params.category as string),
         uid: computed(() => localStorage.getItem('_uid') as string),
         currentUser: computed(() => userStore.currentUser),
         currentUserDeveloperRole: computed(() => userStore.currentUserDeveloperRole),
         absenStatistics: computed(()=> statisticStore.absentStatistics),
         placementStatistics: computed(()=> statisticStore.placementStatistics),
         collectionStatistics: computed(()=> statisticStore.collectionStatistics),
         penilaianStatistics: computed(()=> statisticStore.penilaianStatistic),
         totalStatistics: computed(()=> statisticStore.totalStatistics),
      })

      onMounted(()=>{
          statisticStore.getDetailStatistic(state.uid, state.category);
          statisticStore.onSnapshotRealtimeUpdateStatistic();
      })

      const defineTitle = computed(() => {
         switch (state.category) {
            case "1":
               return " Absensi"
            case "2":
               return " Placement Productivity"
            case "3":
               return " Timesheet Colletion"
            case "4":
               return " Penilaian User"
            default:
               return " Total Performance"
         }})
      
      return {
         ...toRefs(state),
         defineTitle
      }
   }
})
</script>