<template>
<div :class="[isExpand ? 'scale-105 rounded-md border shadow-xl ring-1 ring-indigo-400 ring-opacity-75' : 'border']" class="grid gap-2 sm:cursor-pointer md:grid-cols-12 bg-color-gray-lightest dark:bg-color-dark-gray-darker dark:text-color-gray-light md:cursor-pointer hover:shadow-2xl hover:ring-1 hover:scale-105 hover:ring-indigo-400 hover:ring-opacity-75 transition-all hover:rounded-md border-gray-200 dark:border-color-gray-darkest p-4">
   <div class="text-sm md:col-span-3">
      <label class="font-medium text-gray-700 dark:text-color-dark-gray-lighter"> {{ timesheet.placement == undefined ? '' : timesheet.placement.clientName }}</label>
      <p class="text-gray-500 dark:text-color-gray-light"> {{ formatDate(timesheet.tanggalAsDate) }} </p>
   </div>
   <div class="md:col-span-9 relative">
      <div class="grid sm:grid-cols-3">
         <!-- Jam Kerja -->
         <div class="text-sm">
            <label for="jam-kerja" class="font-medium text-xs text-gray-700 dark:text-color-dark-gray-lighter"> Jam Kerja</label>
            <p class="text-gray-500 dark:text-color-gray-light"> 
               {{timesheet.jamKerjaMulai}} - {{timesheet.jamKerjaSelesai}}
            </p>
         </div>

         <!-- Jam Lembur -->
         <div class="text-sm">
            <label for="over-time" class="font-medium text-xs text-gray-700 dark:text-color-dark-gray-lighter">Over Time</label>
            <p class="text-gray-500 dark:text-color-gray-light"> 
               {{  timesheet.jamOTMulai }} - {{ timesheet.jamOTSelesai }}
            </p>
         </div>

         <!-- Status Absensi -->
         <div class="text-sm">
            <p class="font-medium text-xs text-gray-700 dark:text-color-dark-gray-lighter">Status</p>
            <p class="text-gray-500 dark:text-color-gray-light"> 
               {{ timesheet.statusAbsensi }}
            </p>
         </div>
      </div>
      <div v-if="isExpand && isEdit">
         <p class="font-medium text-xs text-gray-700 dark:text-color-dark-gray-lighter">Status</p>
         <div class="inline-flex items-center space-x-2">
            <div class="flex items-center">
               <input id="masuk" name="push-notifications" v-model="timesheet.statusAbsensi" :value="timesheet.statusAbsensi" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
               <label for="masuk" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  Masuk
               </label>
            </div>
            <div class="flex items-center">
               <input id="sakit" name="push-notifications" v-model="timesheet.statusAbsensi" :value="timesheet.statusAbsensi" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
               <label for="sakit" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  Sakit
               </label>
            </div>
            <div class="flex items-center">
               <input id="cuti" name="push-notifications" v-model="timesheet.statusAbsensi" :value="timesheet.statusAbsensi" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
               <label for="cuti" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  Cuti
               </label>
            </div>
            <div class="flex items-center">
               <input id="libur" name="push-notifications" v-model="timesheet.statusAbsensi" :value="timesheet.statusAbsensi" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
               <label for="libur" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  Libur
               </label>
            </div>
            <div class="flex items-center">
               <input id="alfa" name="push-notifications" v-model="timesheet.statusAbsensi" :value="timesheet.statusAbsensi" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
               <label for="alfa" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  Alfa
               </label>
            </div>
            <div class="flex items-center">
               <input id="test" name="push-notifications" v-model="testValue" :value="'Masuk Test'" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
               <label for="test" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  Test
               </label>
            </div>
         </div>
      </div>

      <!-- Kegiatan -->
      <div class="text-sm mt-2">
         <label for="kegiatan" class="font-medium text-xs text-gray-700 dark:text-color-dark-gray-lighter">Kegiatan</label>
         <dd class="input-custom-dd">
           <label for="kegiatan" class="input-custom-label">Kegiatan</label>
            <textarea 
              v-model="timesheet.kegiatan" id="kegiatan" name="kegiatan" rows="auto" 
              :readonly="!isExpand && !isEdit"
              :class="[ isExpand && isEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
              class="input-custom-default"
            />
         </dd>
      </div>

      <!-- Actions -->
      <div class="inline-flex space-x-3 absolute top-0 right-0 items-start justify-end">
         <div class="p-0.5 px-2 h-5 inline-flex items-center justify-center rounded-full text-[11px] border border-opacity-50 border-gray-300 dark:border-color-gray-darkest"> {{ timesheet.isDone ? 'done' : 'active' }} </div>
         <svg  @click="onExpand" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 md:cursor-pointer text-gray-300 dark:text-color-gray-darkest transition-all hover:scale-150 hover:text-purple-400 dark:hover:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
         </svg>
         <svg @click="onEdit" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 md:cursor-pointer text-color-gray-default dark:text-color-gray-darker transition-all hover:text-indigo-600 dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
         </svg>
      </div>
      <!-- Action Button -->
      <div v-if="isExpand && isEdit" class="px-4 py-3 space-x-3 bg-gray-50 dark:bg-color-dark-gray-darkest text-right sm:px-6">
         <button type="button" @click="onExpand" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:text-white text-color-gray-darkest hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Cancel
         </button>
         <button type="button" @click="onEdit" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
         </button>
      </div>
   </div>
</div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, reactive, toRefs } from 'vue'
import { ITimesheet } from '../../types/InterfaceType'

export default defineComponent({
   props:{
      timesheet: {
         type: Object as ()=> ITimesheet,
         required: true
      },
   },
   setup() {
      const state = reactive({
         isExpand: false,
         isEdit: false,
         testValue: '',
      })

      const formatDate = (value: number) =>{
        return dayjs(value)
            .format('LL')
      }

      const onExpand = () =>{
        return state.isExpand = !state.isExpand
      }

      const onEdit = () =>{
        return state.isEdit = !state.isEdit
      }

      return {
         ...toRefs(state),
         formatDate,
         onExpand,
         onEdit
      }
   }
})
</script>

<style scoped>

</style>