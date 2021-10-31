<template>
<div class="flex-1 rounded-lg">
      <div class="lg:grid-cols-4 gap-5 grid w-full px-0.5">
         <div class="lg:col-span-1 space-y-6">
             <div class="card-wrapper-custom md:sticky top-24 h-auto pt-[18px]">
               <div class="text-color-dark-black-default dark:text-color-gray-lightest">
                  <h1 class="text-lg font-medium">Client Metadata</h1>
                  <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col mt-1 text-sm">
                     <span>Metadata client for tracking activity</span>
                        <div class="inline-flex items-center space-x-1 mt-3">
                           <p>Created at</p>
                           <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ formatDateWithMonth(client.createdDate)}}</p>
                        </div>
                        <div class="inline-flex items-center space-x-1 mt-3">
                           <p>Last modified </p>
                           <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ formatDateFromNow(client.lastModifiedDate) }}</p>
                        </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="lg:col-span-3 space-y-6">
            <div class="card-wrapper-general-theme overflow-hidden">
               <div class="py-5 border-b relative p-6 border-gray-200 dark:border-color-gray-darkest">
                  <h3 class="text-lg leading-6 font-medium text-color-dark-gray-darkest dark:text-color-gray-lighter">
                     Client detail
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-color-gray-default">
                     Detail and client information
                  </p>

                  <svg @click="toggleEditAction(false)" v-if="isOnEdit" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 absolute top-5 right-5 md:cursor-pointer text-color-dark-gray-lighter text-opacity-50 hover:text-opacity-100 dark:text-color-gray-darker transition-all dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg @click="toggleEditAction(true)" v-else-if="!isOnEdit" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 absolute top-5 right-5 md:cursor-pointer text-color-dark-gray-lighter text-opacity-50 hover:text-opacity-100 dark:text-color-gray-darker transition-all dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
               </div>
            <div>
               <form @submit.prevent="onSubmitAction">
                  <dl>
                     <div class="input-custom-wrapper-gray">
                        <dt class="input-custom-dt">
                           Client name
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="client-name" class="input-custom-label">Client name</label>
                              <input 
                                 type="text" v-model="client.name" name="client-name" id="client-name" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 required
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-white">
                        <dt class="input-custom-dt">
                           Address
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="client-address" class="input-custom-label">Address</label>
                             <textarea 
                                 v-model="client.address" id="client-address" name="client-address" rows="3" maxlength="250" 
                                 :readonly="!isOnEdit"
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default"
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-gray">
                        <dt class="input-custom-dt">
                           Email
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="client-email" class="input-custom-label">Email</label>
                              <input 
                                 type="email" v-model="client.email" name="client-email" id="client-email" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 required
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-white">
                        <dt class="input-custom-dt">
                           Telephone
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="client-telephone" class="input-custom-label">Telephone</label>
                              <input 
                                 type="text" v-model="client.telephone" name="client-telephone" id="client-telephone" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 required
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-gray">
                        <dt class="input-custom-dt">
                           City
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="client-city" class="input-custom-label">City</label>
                              <input 
                                 type="text" v-model="client.kota" name="client-city" id="client-city" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 required
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-white">
                        <dt class="input-custom-dt">
                           District
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="nama-province" class="input-custom-label">District</label>
                              <input 
                                 type="text" v-model="client.provinsi" name="nama-province" id="nama-province" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 required
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-gray">
                        <dt class="input-custom-dt">
                           Country
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="client-country" class="input-custom-label">Country</label>
                              <input 
                                 type="text" v-model="client.country" name="client-country" id="client-country" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 required
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-white">
                        <dt class="input-custom-dt">
                           Postal Code
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="kode-pos" class="input-custom-label">Postal Code</label>
                              <input 
                                 type="text" v-model="client.postalCode" name="kode-pos" id="kode-pos" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     
                     <div class="input-custom-wrapper-gray">
                        <dt class="input-custom-dt">
                           Website
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="client-website" class="input-custom-label">Website</label>
                              <input 
                                 type="url" v-model="client.website" name="client-website" id="client-website" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-white">
                        <dt class="input-custom-dt">
                           About
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="client-description" class="input-custom-label">About</label>
                              <textarea 
                                 v-model="client.description" id="client-description" name="client-description" rows="5" maxlength="250" 
                                 :readonly="!isOnEdit"
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default"
                              />
                              <span class="text-xs dark:text-color-gray-default">Total caracter {{ descLength }}/250. </span>
                        </dd>
                     </div>
                  </dl>
                  <div class="px-4 py-3 space-x-3 bg-gray-50 border-t border-gray-200 dark:border-color-gray-darkest dark:bg-color-dark-gray-darkest text-right sm:px-6">
                     <button v-if="!isOnEdit" type="button" @click="toggleEditAction(true)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-color-dark-gray-default dark:text-white bg-color-gray-light dark:bg-color-dark-gray-darker dark:hover:bg-color-dark-gray-dark hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Edit project
                     </button>
                     <button v-if="isOnEdit" type="button" @click="toggleEditAction(false)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:text-white text-color-dark-gray-default hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Cancel
                     </button>
                     <button v-if="isOnEdit" type="submit" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save
                     </button>
                  </div>
               </form>
            </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useClientStore, useUtilityStore } from '../../services'
import { IClient } from '../../types/InterfaceType';
import { formatDateFromNow, formatDateWithMonth } from '../../utils/helperFunction';

export default defineComponent({
    props:{
        clientData:{
            type: Object as ()=> IClient,
            required: true
        },
        status:{
            type: String,
            required: true
        }
    },
    setup (props, ctx) {
        const utilityStore = useUtilityStore();
         const clientStore = useClientStore();

        const state = reactive({
            client: props.clientData ? props.clientData : {} as IClient,
            isOnEdit: props.status == 'new_client' ? true : false,
            useBlur: computed(()=> utilityStore.useBlur),
            isNewProject: computed(() => props.status === 'new_client')
        })

        const toggleEditAction = (val: boolean): void => {
            state.isOnEdit = val;
        }

        const onSubmitAction =async ()=>{
            if(state.isNewProject ){
               clientStore.insertNewClient(props.clientData)
                  .then(()=> ctx.emit('after-save'));
            }else{
               clientStore.updateClient(props.clientData)
                  .then(()=> ctx.emit('after-save'));
            }
        }

        const descLength = computed(()=> state.client.description?.length);
        

        return {
            ...toRefs(state),
            descLength,
            onSubmitAction,
            toggleEditAction,
            formatDateFromNow,
            formatDateWithMonth
        }
    }
})
</script>

<style scoped>

</style>