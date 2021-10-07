<template>
   <div class="cursor-pointer with-transition relative overflow-hidden bg-color-gray-lightest dark:bg-color-dark-gray-darker dark:text-color-gray-light md:cursor-pointer hover:shadow-xl hover:ring-1 hover:ring-indigo-400 hover:ring-opacity-75 transition-all border border-gray-200 dark:border-color-gray-darkest rounded-md p-4 flex flex-col space-y-2 sm:space-y-0 sm:flex-row items-start justify-between">
      <div class="flex flex-col">
         <p class="text-sm text-color-gray-darkest dark:text-color-gray-default">Bulan</p>
         <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ absen.monthName }}</p>
      </div>
      <div class="flex flex-col">
         <p class="text-sm text-color-gray-darkest dark:text-color-gray-default">Masuk</p>
         <p class="text-color-dark-gray-darker dark:text-color-gray-light"><span class="font-semibold">{{ absen.jumlahHariMasuk }}</span> <span class="text-xs">Hari</span></p>
      </div>
      <div class="flex flex-col">
         <p class="text-sm text-color-gray-darkest dark:text-color-gray-default">Cuti</p>
         <p class="text-color-dark-gray-darker dark:text-color-gray-light"><span class="font-semibold">{{ absen.jumlahHariCuti }}</span> <span class="text-xs">Hari</span></p>
      </div>
      <div class="flex flex-col">
         <p class="text-sm text-color-gray-darkest dark:text-color-gray-default">Performance</p>
         <p class="text-color-dark-gray-darker font-semibold dark:text-color-gray-light">{{ toFixedFormat(formatedPerformance)}}</p>
      </div>

      <div aria-hidden="true" class="absolute -right-20 -bottom-10 w-72 h-72 bg-indigo-500 bg-opacity-10 rounded-full"></div>
   </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IStatisticAbsentMeta, IStatisticPlacementMeta } from '../../types/InterfaceType'
import { formatDateWithMonth, calculatePerformaceAbsent, toFixedFormat } from '../../utils/helperFunction';

export default defineComponent({
   props:{
      absen: {
         type: Object as ()=> IStatisticAbsentMeta | IStatisticPlacementMeta,
         required: true
      }
   },
   setup(props) {
      const formatedPerformance = computed(()=> calculatePerformaceAbsent(props.absen.jumlahHariMasuk))
      return{ formatedPerformance, formatDateWithMonth, toFixedFormat }
   },
})
</script>
