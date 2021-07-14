<template>
<router-link :to="stat.to">
   <div class="card flex flex-col shadow md:shadow-xl h-20 p-3 hover:bg-opacity-60 text-color-gray-light rounded-md border-t-4 border-green-300 bg-color-dark-gray-dark">
      <h3 class="text-base text-color-gray-light"> {{stat.title}} </h3>
      <h1 class="font-semibold">
         <span class="text-xl ">{{stat.progress}}%</span>
         <span class="text-color-gray-dark"> of 100%</span>
      </h1>
   </div>
</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export interface IStatistic{
   id: number,
   progress: number,
   title: string,
   to: string
}

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