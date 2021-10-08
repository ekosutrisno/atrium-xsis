<template>
   <div class="cursor-pointer h-auto with-transition relative overflow-hidden bg-color-gray-lightest dark:bg-color-dark-gray-darker dark:text-color-gray-light md:cursor-pointer hover:shadow-xl hover:ring-1 hover:ring-indigo-400 hover:ring-opacity-75 transition-all border border-gray-200 dark:border-color-gray-darkest rounded-md p-4 flex flex-col space-y-2 sm:space-y-0 sm:flex-row items-start justify-between">
      <!-- Decorative -->
      <!-- <div aria-hidden="true" class="absolute -right-20 -bottom-10 w-72 h-72 bg-indigo-500 bg-opacity-10 rounded-full"></div> -->
     <!-- Main Content -->
      <div class="text-color-dark-black-default w-full with-transition relative mt-2 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between dark:text-color-gray-lightest">
         <div class="flex flex-col mt-1 space-y-2">
            <div class="flex flex-col">
               <p class="text-sm text-color-gray-default dark:text-color-gray-default">Client Name</p>
               <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ client.clientName}}</p>
            </div>
            <div class="flex flex-col">
               <p class="text-sm text-color-gray-default dark:text-color-gray-default">Country</p>
               <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ client.clientCountry }}</p>
            </div>
           <div v-if="expan" class="with-transition">
               <div class="flex flex-col">
                  <p class="text-sm text-color-gray-default dark:text-color-gray-default">Address</p>
                  <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ client.clientAddress}}</p>
               </div>
               <div class="flex flex-col">
                  <p class="text-sm text-color-gray-default dark:text-color-gray-default">City</p>
                  <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ client.clientKota}}</p>
               </div>
               <div class="flex flex-col">
                  <p class="text-sm text-color-gray-default dark:text-color-gray-default">Province</p>
                  <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ client.clientProvinsi}}</p>
               </div>
            </div>
         </div>

         <button type="button" @click="toggleExpand" class="z-10 absolute top-0 right-8">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 hover:scale-125 text-gray-500 hover:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
               <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
         </button>
         <router-link to="#" class="z-10 absolute top-0 -right-0">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 hover:scale-125 text-gray-500 hover:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
               <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
         </router-link>

         <Svg2 aria-hidden="true" class="absolute bottom-20 rotate-90 -right-32 z-10"/>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { IClient } from '../../../types/InterfaceType'
import Svg2 from '../../svg/Svg2.vue'

export default defineComponent({
  components: { Svg2 },
   props:{
      client:{
         type: Object as () => IClient,
         required: true
      }
   },
   setup () {
      const state = reactive({
         expan: false
      })

      const toggleExpand = ()=>{
         state.expan = !state.expan;
      }
      return {
         ...toRefs(state),
         toggleExpand
      }
   }
})
</script>