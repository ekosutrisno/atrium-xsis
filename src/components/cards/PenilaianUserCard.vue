<template>
   <div class="cursor-pointer with-transition relative overflow-hidden bg-white dark:bg-color-dark-gray-darker dark:text-color-gray-light md:cursor-pointer hover:shadow-xl hover:ring-1 hover:ring-indigo-400 hover:ring-opacity-75 transition-all border border-gray-200 dark:border-color-gray-darkest rounded-md p-4 flex flex-col space-y-2 sm:space-y-0 sm:flex-row items-start justify-between">
      <div class="flex flex-col">
         <p class="text-sm text-color-gray-darkest dark:text-color-gray-default">Bulan</p>
         <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ nilai.monthName }}</p>
      </div>
      <div class="flex flex-col">
         <p class="text-sm text-color-gray-darkest dark:text-color-gray-default">SKI</p>
         <p class="text-color-dark-gray-darker dark:text-color-gray-light"><span class="font-semibold">{{ nilai.ski }}</span></p>
      </div>
      <div class="flex flex-col">
         <p class="text-sm text-color-gray-darkest dark:text-color-gray-default">Kompetensi Pendukung</p>
         <p class="text-color-dark-gray-darker dark:text-color-gray-light"><span class="font-semibold">{{ nilai.kompetensiPendukung }}</span></p>
      </div>
      <div class="flex flex-col">
         <p class="text-sm text-color-gray-darkest dark:text-color-gray-default">Kedisiplinan</p>
         <p class="text-color-dark-gray-darker dark:text-color-gray-light"><span class="font-semibold">{{ nilai.kedisiplinan }}</span></p>
      </div>
      <div class="flex flex-col">
         <p class="text-sm text-indigo-500 dark:text-indigo-400 font-extrabold">Performance</p>
         <p class="text-color-dark-gray-darker font-semibold dark:text-color-gray-light">{{ toFixedFormat(calculatedPercentage) }}</p>
      </div>

      <div v-if="currentMonthOnly() === nilai.month" aria-hidden="true" class="absolute right-2 top-0 sm:left-3 sm:-top-2">
         <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 text-indigo-200" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
         </svg>
      </div>
   </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IStatisticPenilaianUserMeta } from '@/types/InterfaceType'
import { formatDateWithMonth, calculatePerformacePenilaianUser, toFixedFormat, currentMonthOnly  } from '@/utils/helperFunction';

export default defineComponent({
   props:{
      nilai: {
         type: Object as ()=> IStatisticPenilaianUserMeta,
         required: true
      }
   },
   setup(props) {
      const calculatedPercentage = computed(
               () => {
                  let nilai = {
                     ski: props.nilai.ski,
                     kompetensiPendukung: props.nilai.kompetensiPendukung,
                     kedisiplinan: props.nilai.kedisiplinan
                  }

                 return calculatePerformacePenilaianUser(nilai)
            })

      return{calculatedPercentage, formatDateWithMonth, toFixedFormat, currentMonthOnly }
   },
})
</script>
