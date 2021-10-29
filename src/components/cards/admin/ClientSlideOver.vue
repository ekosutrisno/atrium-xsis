<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed inset-0 overflow-hidden z-50 font-quicksand   " @close="onClose">
      <div class="absolute inset-0 overflow-hidden">
        <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="relative w-screen max-w-md">
              <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                  <button type="button" class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="onClose">
                    <span class="sr-only">Close panel</span>
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-full flex flex-col py-6 bg-white dark:bg-color-dark-gray-darkest shadow-xl overflow-y-scroll custom-scroll">
                <div class="px-4 sm:px-6">
                  <DialogTitle class="text-lg font-medium text-label">
                    Details
                  </DialogTitle>
                </div>
                <div class="mt-6 flex-1">
                  <!-- Content -->
                    <div class="px-4 sm:px-6">
                        <div class="h-60 overflow-hidden rounded-md shadow-md">
                            <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcGFueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" :alt="client.clientId">
                        </div>
                        <div>
                            <p class="text-2xl mt-2 font-semibold text-color-custome"> {{ client.clientName }} </p>
                            <span class="text-label">{{client.clientCountry}}, since {{ formatDateWithMonth(client.createdDate) }}</span>
                            <div class="flex flex-col mt-3">
                                <p class="text-sm text-label">About</p>
                                <p class="text-color-custome">{{ client.clientDescription}} In line with its rapid growth, Erajaya aware of the importance of the principles of Good Corporate Governance (GCG), namely Transparency, Accountability, Responsibility, Independence, and Fairness in its day-to-day operations.</p>
                            </div>
                            <div class="flex flex-col mt-3">
                                <p class="text-sm text-label">Address</p>
                                <p class="text-color-custome">{{ client.clientAddress}} {{client.clientKota}} {{client.clientProvinsi}} </p>
                            </div>
                            <div class="flex flex-col mt-3">
                                <p class="text-sm text-label">Website</p>
                                <p class="text-color-custome">
                                    <a v-if="client.clientWebsite" :href="client.clientWebsite" class="text-color-custome" target="_blank" rel="noopener noreferrer">{{client.clientWebsite}}</a>
                                    <span v-else>-</span>
                                </p>
                            </div>
                        </div>
                         <div class="px-4 py-3 space-x-3 bg-gray-50 border-t border-gray-200 dark:border-color-gray-darkest dark:bg-color-dark-gray-darkest text-right sm:px-6">
                            <button v-if="!isOnEdit" type="button" @click="toggleEditAction(true)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-color-dark-gray-default dark:text-white bg-color-gray-light dark:bg-color-dark-gray-darker dark:hover:bg-color-dark-gray-dark hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                Edit
                            </button>
                            <button v-if="isOnEdit" type="button" @click="toggleEditAction(false)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:text-white text-color-dark-gray-default hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                Cancel
                            </button>
                            <button v-if="isOnEdit" type="button" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Save
                            </button>
                        </div>
                    </div>
                  <!-- /End Content -->
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import { IClient } from '../../../types/InterfaceType'
import { formatDateWithMonth } from '../../../utils/helperFunction';

export default defineComponent ({
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
  },
  props:{
      open: {
          type: Boolean as ()=> boolean,
          required: true
      },

      client:{
          type: Object as ()=> IClient,
          required: true
      }
  },
  setup(_, ctx) {
      const state = reactive({
          isOnEdit: false
      })

      const onClose = ()=> {ctx.emit('on-close')}

      const toggleEditAction =(status: boolean)=>{
          state.isOnEdit = status;
      }
      
      return{
          ...toRefs(state),
        onClose,
        formatDateWithMonth,
        toggleEditAction
      }
  },
})
</script>