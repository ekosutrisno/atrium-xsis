<template>
<div :class="[isEdit ? 'scale-105 rounded-md border shadow-xl ring-1 ring-indigo-400 ring-opacity-75' : 'border rounded-md']" class="grid with-transition-fast space-y-3 gap-2 sm:cursor-pointer md:grid-cols-12 bg-color-gray-lightest dark:bg-color-dark-gray-darker dark:text-color-gray-light md:cursor-pointer hover:shadow-xl hover:ring-1 hover:ring-indigo-400 hover:ring-opacity-75 transition-all hover:rounded-md border-gray-200 dark:border-color-gray-darkest p-4">
   <div class="text-sm md:col-span-3 flex flex-col justify-between items-start">
      <div>
         <label class="font-medium text-gray-700 dark:text-color-dark-gray-lighter"> {{ timesheet.placement == undefined ? '' : timesheet.placement.clientName }}</label>
         <p class="text-gray-500 dark:text-color-gray-light"> {{ formatDateWithMonth(timesheet.tanggalAsDate) }} </p>
      </div>
      <span class="block text-[11px] text-color-gray-darkest dark:text-color-gray-default italic">Last updated {{ formatDateFromNow(timesheet.lastModifiedDate) }}</span>
   </div>
   <div class="md:col-span-9 relative">
      <div class="grid sm:grid-cols-3">
         <!-- Jam Kerja -->
         <div class="text-sm flex flex-col">
            <label :class="[isEdit ? 'mb-1.5 sm:mb-0': '']" class="font-medium text-xs text-gray-700 dark:text-color-dark-gray-lighter">Jam kerja</label>
            <div v-if="isEdit" class="inline-flex items-center justify-start space-x-2">
               <div class="w-24">
                  <input
                     v-model="timesheet.jamKerjaMulai"
                     type="time" :name="`ts-${timesheet.jamKerjaMulai}`" :id="`ts-${timesheet.jamKerjaMulai}`" autocomplete="off"
                     :readonly="!isEdit"
                     :class="[ isEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                     class="input-custom-default mt-1 sm:mt-0"
                  />
               </div>
               <div class="w-24">
                  <input
                     v-model="timesheet.jamKerjaSelesai"
                     type="time" :name="`ts-${timesheet.jamKerjaSelesai}`" :id="`ts-${timesheet.jamKerjaSelesai}`" autocomplete="off"
                     :readonly="!isEdit"
                     :class="[ isEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                     class="input-custom-default mt-1 sm:mt-0"
                  />
               </div>
            </div>
           <p v-else class="text-gray-500 dark:text-color-gray-light">
              {{ timesheet.jamKerjaMulai ? timesheet.jamKerjaMulai : '-'}} to {{ timesheet.jamKerjaSelesai ? timesheet.jamKerjaSelesai : '-' }} 
            </p>
         </div>

         <!-- Jam Lembur -->
         <div class="text-sm flex flex-col mt-2 sm:mt-0">
            <label :class="[isEdit ? 'mb-1.5 sm:mb-0': '']" class="font-medium text-xs text-gray-700 dark:text-color-dark-gray-lighter">Over Time</label>
            <div v-if="isEdit" class="inline-flex items-center justify-start space-x-2">
               <div class="w-24">
                  <input
                     v-model="timesheet.jamOTMulai"
                     type="time" :name="`ts-${timesheet.jamOTMulai}`" :id="`ts-${timesheet.jamOTMulai}`" autocomplete="off"
                     :readonly="!isEdit"
                     :class="[ isEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                     class="input-custom-default mt-1 sm:mt-0"
                  />
               </div>
               <div class="w-24">
                  <input
                     v-model="timesheet.jamOTSelesai"
                     type="time" :name="`ts-${timesheet.jamOTSelesai}`" :id="`ts-${timesheet.jamOTSelesai}`" autocomplete="off"
                     :readonly="!isEdit"
                     :class="[ isEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                     class="input-custom-default mt-1 sm:mt-0"
                  />
               </div>
            </div>
           <p v-else class="text-gray-500 dark:text-color-gray-light">
              {{ timesheet.jamOTMulai ? timesheet.jamOTMulai : '-'}} to {{ timesheet.jamOTSelesai ? timesheet.jamOTSelesai : '-' }}
            </p>
         </div>

         <!-- Status Absensi -->
         <div class="text-sm mt-2 sm:mt-0">
            <p class="font-medium text-xs text-gray-700 dark:text-color-dark-gray-lighter">Status</p>
            <p class="text-gray-500 dark:text-color-gray-light"> 
               {{ timesheet.statusAbsensi }}
            </p>
         </div>
      </div>
      <div v-if="isEdit" :class="[isEdit ? 'mt-1.5': 'mt-2 lg:mt-0']">
         <p class="font-medium text-xs text-gray-700 dark:text-color-dark-gray-lighter">Status</p>
         <div class="inline-block lg:inline-flex items-center space-y-2 lg:space-y-0 lg:space-x-4">
            <div class="flex items-center">
               <input id="masuk" name="push-notifications" v-model="timesheet.statusAbsensi" :value="'Masuk'" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
               <label for="masuk" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  Masuk
               </label>
            </div>
            <div class="flex items-center">
               <input id="sakit" name="push-notifications" v-model="timesheet.statusAbsensi" :value="'Sakit'" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
               <label for="sakit" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  Sakit
               </label>
            </div>
            <div class="flex items-center">
               <input id="cuti" name="push-notifications" v-model="timesheet.statusAbsensi" :value="'Cuti'" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
               <label for="cuti" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  Cuti
               </label>
            </div>
            <div class="flex items-center">
               <input id="libur" name="push-notifications" v-model="timesheet.statusAbsensi" :value="'Libur'" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
               <label for="libur" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  Libur
               </label>
            </div>
            <div class="flex items-center">
               <input id="alfa" name="push-notifications" v-model="timesheet.statusAbsensi" :value="'Alfa'" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
               <label for="alfa" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  Alfa
               </label>
            </div>
         </div>
      </div>

      <!-- Kegiatan -->
      <div class="text-sm mt-2">
         <label class="font-medium text-xs text-gray-700 dark:text-color-dark-gray-lighter">Kegiatan</label>
         <dd v-if="isEdit" :class="[isEdit ? 'mt-1.5': '']" class="input-custom-dd">
            <textarea 
              v-model="timesheet.kegiatan" name="kegiatan" rows="5" maxlength="250" 
              :readonly="!isEdit"
              :class="[ isEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
              class="input-custom-default text-sm"
            />
            <span class="text-xs dark:text-color-gray-default">Total caracter {{ kegiatanLength }}/250. </span>
         </dd>
         <p v-else>{{ timesheet.kegiatan }}</p>
      </div>
      
      <!-- Actions -->
      <div class="inline-flex space-x-3 absolute top-0 right-0 items-start justify-end">
         <div class="p-0.5 px-2 h-5 inline-flex items-center justify-center rounded-full text-[11px] border border-opacity-50 border-gray-300 dark:border-color-gray-darkest hover:text-purple-400 dark:hover:text-purple-400"> {{ timesheet.isDone ? 'done' : 'active' }} </div>
        <svg v-if="!isEdit" @click="onEdit" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 md:cursor-pointer text-color-gray-default dark:text-color-gray-darker transition-all md:hover:scale-125 hover:text-purple-400 dark:hover:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
         </svg>
      </div>
      <!-- Action Button -->
      <div v-if="isEdit" class="px-4 py-3 with-transition space-x-3 bg-gray-50 dark:bg-color-dark-gray-darker text-right sm:px-6">
         <button type="button" @click="onEdit" class="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:text-white text-color-gray-darkest hover:text-purple-400 dark:hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Cancel
         </button>
         <button type="button" @click="onSave" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
         </button>
      </div>
   </div>
</div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useTimesheetStore } from '../../services';
import { ITimesheet } from '../../types/InterfaceType';
import { formatDateFromNow, formatDateWithMonth } from '../../utils/helperFunction';

export default defineComponent({
   setup(_, ctx) {
      const timesheetStore = useTimesheetStore();
      const state = reactive({
         isEdit: true,
         timesheet: {
            absensiId: dayjs().format('YYYY-MM-DD'),
            jamOTTotal: "",
            jamKerjaTotal: "",
            tanggalAsDate: dayjs().format('YYYY-MM-DD'),
            day: dayjs(Date.now()).date(),
            month: dayjs(Date.now()).month(),
            year:dayjs(Date.now()).year(),
            user: localStorage.getItem('_uid') as string,
            kegiatan:"",
            statusAbsensi: "Masuk",
            __v: 0,
            jamKerjaMulai: "08:00",
            jamKerjaSelesai: "17:00",
            jamOTMulai: "",
            jamOTSelesai: "",
            placement: {
               clientId: "27b24c1b-52af-41d1-8ca4-0a84087b376e",
               clientName: "PT Azec Management Service",
               clientAddress: "Jl. Gedong Panjang, Bandengan",
               clientKota: "Jakarta Barat",
               clientProvinsi: "DKI Jakarta",
               clientCountry: "Indonesia",
            },
            template: true,
            isDone: false,
            createdDate: Date.now(),
            lastModifiedDate: Date.now()
         } as ITimesheet
      })

      const onEdit = (): boolean =>{
         ctx.emit('after-save');
         return state.isEdit = !state.isEdit
      }

      const onSave = (): void =>{
         timesheetStore
            .addTimesheet(state.timesheet)
            .then(()=>  onEdit());
      }

      const kegiatanLength = computed(() => state.timesheet.kegiatan?.length);

      return {
         ...toRefs(state),
         kegiatanLength,
         onEdit,
         onSave,
         formatDateFromNow,
         formatDateWithMonth,
      }
   }
})
</script>

<style scoped>

</style>