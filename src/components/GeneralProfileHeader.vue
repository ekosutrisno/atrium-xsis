<template>
<div class="py-5 border-b border-gray-200 dark:border-color-gray-darkest">
   <h3 class="text-lg leading-6 font-medium text-color-dark-gray-darkest dark:text-color-gray-lighter">
   {{ info.title }}
   </h3>
   <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-color-gray-default">
   {{ info.desc }}
   </p>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AnyObject } from '../types/InterfaceType'

interface InfoHeaderProp extends AnyObject{
   title: string
   desc: string
}

export default defineComponent({
   props:{
      info: {
         type: Object as ()=> InfoHeaderProp,
         required: true
      }
   },
   setup () {
      

      return {}
   }
})
</script>