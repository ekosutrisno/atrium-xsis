<template>
<form @submit.prevent="onSubmitAction">
   <div :class="[!address.isDomisili ? 'bg-gray-50 dark:bg-color-dark-gray-darkest': 'bg-white dark:bg-color-dark-gray-darker']" class="shadow pt-3 overflow-hidden sm:rounded-md with-transition">
      <div class="px-2 py-1 ml-4 text-sm rounded bg-indigo-600 w-max dark:text-color-gray-lightest text-white" >
         {{ address.isDomisili ? 'Alamat Domisili' : 'Alamat KTP' }}
         <span class="block text-[11px] text-gray-200">Last updated {{ formatDateFromNow(address.lastModifiedDate) }}</span>
      </div>
      <div class="px-4 py-5 sm:p-6">
         <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6">
               <label :for="`street-address-${address.isDomisili}`" class="block text-sm font-medium text-color-dark-gray-lighter dark:text-color-gray-default">Street address</label>
               <input 
                  v-model="address.jalan"
                  type="text" :name="`street-address-${address.isDomisili}`" :id="`street-address-${address.isDomisili}`" autocomplete="off"
                  :readonly="!isOnEdit"
                  :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                  class="input-custom-default mt-1 sm:mt-0"
               />
            </div>

            <div class="col-span-6 sm:col-span-6 lg:col-span-2">
               <label :for="`city-${address.isDomisili}`" class="block text-sm font-medium text-gray-400 dark:text-color-gray-default">City</label>
               <input 
               v-model="address.kota"
                  type="text" :name="`city-${address.isDomisili}`" :id="`city-${address.isDomisili}`" 
                  :readonly="!isOnEdit"
                  :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                  class="input-custom-default mt-1 sm:mt-0"
               />
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
               <label :for="`country-${address.isDomisili}`" class="block text-sm font-medium text-gray-400 dark:text-color-gray-default">State</label>
               <input 
               v-model="address.country"
                  type="text" :name="`country-${address.isDomisili}`" :id="`country-${address.isDomisili}`" 
                  :readonly="!isOnEdit"
                  :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                  class="input-custom-default mt-1 sm:mt-0"
               />
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
               <label :for="`postal-code-${address.isDomisili}`" class="block text-sm font-medium text-gray-400 dark:text-color-gray-default">ZIP / Postal</label>
               <input
                  v-model="address.kodePos"
                  type="text" :name="`postal-code-${address.isDomisili}`" :id="`postal-code-${address.isDomisili}`" autocomplete="off"
                  :readonly="!isOnEdit"
                  :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                  class="input-custom-default mt-1 sm:mt-0"
               />
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
               <label :for="`desa-${address.isDomisili}`" class="block text-sm font-medium text-gray-400 dark:text-color-gray-default">Village</label>
               <input
                  v-model="address.desa"
                  type="text" :name="`desa-${address.isDomisili}`" :id="`desa-${address.isDomisili}`" autocomplete="off"
                  :readonly="!isOnEdit"
                  :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                  class="input-custom-default mt-1 sm:mt-0"
               />
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
               <label :for="`kecamatan-${address.isDomisili}`" class="block text-sm font-medium text-gray-400 dark:text-color-gray-default">District/Kecamatan</label>
               <input
                  v-model="address.kecamatan"
                  type="text" :name="`kecamatan-${address.isDomisili}`" :id="`kecamatan-${address.isDomisili}`" autocomplete="off"
                  :readonly="!isOnEdit"
                  :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                  class="input-custom-default mt-1 sm:mt-0"
               />
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
               <label :for="`provinsi-${address.isDomisili}`" class="block text-sm font-medium text-gray-400 dark:text-color-gray-default">Province</label>
               <input
                  v-model="address.provinsi"
                  type="text" :name="`provinsi-${address.isDomisili}`" :id="`provinsi-${address.isDomisili}`" autocomplete="off"
                  :readonly="!isOnEdit"
                  :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                  class="input-custom-default mt-1 sm:mt-0"
               />
            </div>
         </div>
      </div>
      <div class="px-4 py-3 space-x-3 bg-gray-50 border-t border-gray-200 dark:border-color-gray-darkest dark:bg-color-dark-gray-darkest text-right sm:px-6">
         <button v-if="!isOnEdit" type="button" @click="toggleEditAction(true)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-color-dark-gray-default dark:text-white bg-color-gray-light dark:bg-color-dark-gray-darker dark:hover:bg-color-dark-gray-dark hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Edit
         </button>
         <button v-if="isOnEdit" type="button" @click="toggleEditAction(false)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:text-white text-color-dark-gray-default hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Cancel
         </button>
         <button v-if="isOnEdit" type="button" @click="onSubmitAction" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
         </button>
      </div>
   </div>
</form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useUserStore, useUtilityStore } from '@/services'
import { IAddress } from '@/types/InterfaceType';
import { formatDateFromNow } from '@/utils/helperFunction';

export default defineComponent({
   props:{
     address:{
         type: Object as ()=> IAddress,
         required: true
     }
   },
   setup (props) {
      const utilityStore = useUtilityStore();
      const userStore = useUserStore();

      const state = reactive({
         isOnEdit: props.address.isDomisili 
            ? computed(()=> utilityStore.isOnEditAddressData) 
            : computed(()=> utilityStore.isOnEditAddressDataAsli)
      })

      const onSubmitAction = () => {
         props.address.lastModifiedDate = Date.now();
         userStore.updateCurrentUserAddress( userStore.currentUser.address, props.address);
         toggleEditAction(false);
            
      }

      /** Togle Action base on state isDomisili */
      const toggleEditAction = (val: boolean): void => {
        props.address.isDomisili 
            ? utilityStore.toggleIsOnEditAddress({value: val, isDomisili: true})
            : utilityStore.toggleIsOnEditAddress({value: val, isDomisili: false});

        userStore.fetchCurrentUser(localStorage.getItem('_uid') as string);
      }

      return {
         ...toRefs(state),
         onSubmitAction,
         toggleEditAction,
         formatDateFromNow
      }
   }
})
</script>

<style scoped>

</style>