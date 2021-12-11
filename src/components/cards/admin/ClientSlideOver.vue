<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed inset-0 overflow-hidden z-50 font-quicksand   " @close="onClose">
      <div class="absolute inset-0 overflow-hidden">
        <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
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
                        <div v-if="client.image" class="h-60 overflow-hidden rounded-md shadow-md">
                            <img class="h-full w-full object-cover" :src="client.image" :alt="client.clientId">
                        </div>
                        <div v-else class="h-60">
                          <div class="h-full w-full flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div class="space-y-1 text-center">
                              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              <div class="flex text-sm text-gray-600">
                                <label for="file-upload" class="relative cursor-pointer bg-white dark:bg-transparent rounded-md font-medium text-indigo-500 hover:text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                  <span>Upload a file</span>
                                  <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                </label>
                                <p class="pl-1 text-label">or drag and drop</p>
                              </div>
                              <p class="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                            <p class="text-2xl mt-2 font-semibold text-color-custome"> {{ client.name }} </p>
                            <span class="text-label">{{client.country}}, since {{ formatDateWithMonth(client.createdDate) }}</span>
                            <div class="flex flex-col mt-3">
                                <p class="text-sm text-label">About</p>
                                <p class="text-color-custome">{{ client.description ? client.description : 'No about info.'}}</p>
                            </div>
                            <div class="flex flex-col mt-3">
                                <p class="text-sm text-label">Address</p>
                                <p class="text-color-custome">{{ client.address}} {{client.kota}} {{client.provinsi}} </p>
                            </div>
                            <div class="flex flex-col mt-3">
                                <p class="text-sm text-label">Website</p>
                                <p class="text-color-custome">
                                    <a v-if="client.website" :href="client.website" class="text-color-custome" target="_blank" rel="noopener noreferrer">{{client.website}}</a>
                                    <span v-else>-</span>
                                </p>
                            </div>
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
import { defineComponent} from 'vue'
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
      const onClose = ()=> {ctx.emit('on-close')}
      return{
        onClose,
        formatDateWithMonth
      }
  },
})
</script>