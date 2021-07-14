<template>
<router-link :to="stat.to">
   <div class="card flex flex-col md:shadow-sm h-20 p-3 hover:bg-opacity-60 text-color-gray-light rounded-md border-t-[6px] border-color-dark-gray-default bg-color-dark-gray-dark">
      <h3 class="text-base text-color-gray-light"> {{stat.title}} </h3>
      <h1 class="font-semibold">
         <span class="text-xl text-color-dark-gray-lightest">{{stat.progress}}%</span>
         <span class="text-color-gray-dark"> of 100%</span>
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