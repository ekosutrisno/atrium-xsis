<template>
   <div class="flex relative w-full pb-20 md:pb-0">
      <div class="flex-1 rounded-lg">
         <header :class="[useBlur ? 'custom-backdrop bg-opacity-90' : '']" class="shadow-sm p-4 pt-[18px] sticky -top-1 z-10 bg-color-dark-gray-darker flex justify-between">
            <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-light font-semibold">
               <span>Vacancy</span> 
               <span>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-dark" viewBox="0 0 20 20" fill="currentColor">
                   <path fill-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clip-rule="evenodd" />
                  </svg>
               </span>
            </div>
            <div class="text-color-gray-lighter hidden text-sm">
               <button type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add project
               </button>
            </div>
         </header>
         <p class="py-3 px-2 text-color-gray-default">Vacancy List</p>
         <ul class="grid gap-4 sm:gap-2">
            <li v-for="vacancy in vacancies" :key="vacancy.vacancyId">
               <InternalVacancyCard :vacancy="vacancy"/>
            </li>
         </ul>
      </div>
      <button type="button" class="sticky-btn with-transition">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
         </svg>
      </button>
   </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import InternalVacancyCard from '../components/cards/InternalVacancyCard.vue'
import { useUtilityStore, useVacancyStore } from '../services'

export default defineComponent({
  components: { InternalVacancyCard },
   setup () {
      const vacancyStore = useVacancyStore();
      const utilityStore = useUtilityStore();
      
      const state = reactive({
         vacancies: computed(()=>vacancyStore.vacancies),
         useBlur: computed(()=> utilityStore.useBlur),
      })

      return {
         ...toRefs(state)
      }
   }
})
</script>