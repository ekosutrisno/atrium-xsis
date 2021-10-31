<template>
   <div class="cursor-pointer h-auto with-transition relative overflow-hidden bg-color-gray-lightest dark:bg-color-dark-gray-darker dark:text-color-gray-light md:cursor-pointer hover:shadow-xl hover:ring-1 hover:ring-indigo-400 hover:ring-opacity-75 transition-all border border-gray-200 dark:border-color-gray-darkest rounded-md p-3 flex flex-col space-y-2 sm:space-y-0 sm:flex-row items-start justify-between">
    <!-- Main Content -->
      <div class="text-color-dark-black-default w-full with-transition relative flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between dark:text-color-gray-lightest">
         <div class="flex flex-col">
            <div class="flex flex-col">
               <p class="text-sm text-color-gray-default dark:text-color-gray-default">Client Name</p>
               <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ client.name}}</p>
            </div>
         </div>

         <button type="button" @click="onEdit" class="z-10 absolute top-0 right-8">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 hover:scale-125 text-gray-500 hover:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
               <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
         </button>
         <button type="button" @click="onShow" class="z-10 absolute top-0 right-16">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 hover:scale-125 text-gray-500 hover:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
               <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
               <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
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
import { defineComponent } from 'vue'
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
   setup (props, ctx) {

      const onEdit = ()=>{
         ctx.emit('on-edit', {
            status: 'update_client',
            data: props.client
         });
      }

      const onShow = ()=>{
         ctx.emit('on-show', props.client);
      }

      return {
         onEdit,
         onShow
      }
   }
})
</script>