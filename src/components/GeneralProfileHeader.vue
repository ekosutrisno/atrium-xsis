<template>
<div class="py-5 border-b relative border-gray-200 dark:border-color-gray-darkest">
   <h3 class="text-lg leading-6 font-medium text-color-dark-gray-darkest dark:text-color-gray-lighter">
   {{ info.title }}
   </h3>
   <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-color-gray-default">
   {{ info.desc }}
   </p>

   <svg @click="toggleEdit(false)" v-if="enableEdit && isOnEdit" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 absolute top-5 right-5 md:cursor-pointer text-color-dark-gray-lighter text-opacity-50 hover:text-opacity-100 dark:text-color-gray-darker transition-all dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
   </svg>
   <svg @click="toggleEdit(true)" v-else-if="enableEdit && !isOnEdit" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 absolute top-5 right-5 md:cursor-pointer text-color-dark-gray-lighter text-opacity-50 hover:text-opacity-100 dark:text-color-gray-darker transition-all dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
   </svg>
   
</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useUtilityStore } from '@/services'
import { AnyObject } from '@/types/InterfaceType'

interface InfoHeaderProp extends AnyObject{
   title: string
   desc: string
}

export default defineComponent({
   props:{
      info: {
         type: Object as ()=> InfoHeaderProp,
         required: true
      },
      enableEdit:{
         type: Boolean,
         default: false
      }
   },
   setup () {
      const utiltyStore = useUtilityStore();

      const toggleEdit = (val: boolean) => {
         utiltyStore.$patch((state)=>state.isOnEditUserData = val);
      }

      return {
         isOnEdit: computed(() => utiltyStore.isOnEditUserData),
         toggleEdit
      }
   }
})
</script>