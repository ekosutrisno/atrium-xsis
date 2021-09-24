<template>
<router-link :to="`/u/0/statistic/${currentYear}/${stat.to}/detail`">
   <div class="card flex flex-col shadow h-28 p-4 dark:hover:bg-opacity-60 hover:bg-color-gray-lighter dark:text-color-gray-light text-color-dark-gray-dark rounded-md border-t-[6px] dark:border-color-dark-gray-default border-[#ede1f8] dark:bg-color-dark-gray-dark bg-color-gray-lightest">
      <h3 class="with-transition text-sm font-medium mb-1.5"> {{stat.title}} </h3>
      <h1>
         <span class="with-transition text-xl font-semibold dark:text-color-dark-gray-lightest">{{toFixedFormat(stat.progress)}}</span>
         <span class="dark:text-color-gray-dark font-medium text-sm text-color-gray-default"> of 100%</span>
      </h1>
   </div>
</router-link>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { IStatisticInfo } from '../../types/InterfaceType'
import { toFixedFormat } from '../../utils/helperFunction';



export default defineComponent({
   props:{
      stat:{
         type: Object as () => IStatisticInfo,
         required: true
      }
   },
   setup () {
      const state = reactive({
         currentYear: new Date().getFullYear().toString()
      })

      return {
         ...toRefs(state),
         toFixedFormat
      }
   }
})
</script>