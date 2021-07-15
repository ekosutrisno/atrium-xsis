<template>
<router-link :to="stat.to">
   <div class="card flex flex-col shadow h-20 p-3 dark:hover:bg-opacity-60 hover:bg-color-gray-lighter dark:text-color-gray-light text-color-dark-gray-dark rounded-md border-t-[6px] dark:border-color-dark-gray-default border-[#d3adf7] dark:bg-color-dark-gray-dark bg-color-gray-lightest">
      <h3 class="text-sm font-medium mb-1.5"> {{stat.title}} </h3>
      <h1>
         <span class="text-xl font-semibold dark:text-color-dark-gray-lightest">{{stat.progress}}%</span>
         <span class="dark:text-color-gray-dark font-medium text-sm text-color-gray-default"> of 100%</span>
      </h1>
   </div>
</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IStatistic } from '../../types/InterfaceType'



export default defineComponent({
   props:{
      stat:{
         type: Object as () => IStatistic,
         required: true
      }
   },
   setup () {
      

      return {}
   }
})
</script>