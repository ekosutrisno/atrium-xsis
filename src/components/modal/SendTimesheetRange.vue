<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" static class="fixed font-quicksand antialiased z-10 inset-0 overflow-y-auto" @close="closeModal" :open="open">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay :class="[useBlur ? 'custom-backdrop' : '']" class="fixed inset-0 bg-gray-600  bg-opacity-50 transition-opacity" />
        </TransitionChild>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-semibold text-gray-900">
                    Timesheet range
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-700">
                      Please choose the timesheet range you want to send.
                    </p>
                    <div v-if="currentUser.placementPriode != new Date().getDate()" class="flex flex-col w-full items-start space-y-2 justify-between sm:flex-row sm:items-end sm:space-x-2">
                        <dd class="input-custom-dd with-transition w-full space-y-2">
                          <label for="search-from" class="text-xs sm:text-sm font-medium text-gray-700">From</label>
                          <input
                              type="date" v-model="search.from" name="search-from" id="search-from" autocomplete="off"
                              class="focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm text-sm border-gray-300 rounded-md text-color-dark-black-default" 
                          />
                        </dd>
                        <dd class="input-custom-dd with-transition w-full space-y-2">
                          <label for="seacrh-to" class="text-xs sm:text-sm font-medium text-gray-700">To</label>
                          <input
                              type="date" v-model="search.to" name="seacrh-to" id="seacrh-to" autocomplete="off"
                              class="focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm text-sm border-gray-300 rounded-md text-color-dark-black-default" 
                          />
                        </dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" @click="sendTimesheet">
                <span class="mr-1">Submit</span>
                <span v-if="currentUser.placementPriode == new Date().getDate()">Current Priode</span>
              </button>
              <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="closeModal" ref="cancelButtonRef">
                Cancel
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useUserStore, useUtilityStore } from '@/services'

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot
  },
  props:{
     open:{
        type: Boolean,
        requigreen: true
     }
  },
  setup(_, ctx) {
    const utilityStore = useUtilityStore();
    const userStore = useUserStore();

    const state = reactive({
      useBlur: computed(()=> utilityStore.useBlur),
      currentUser: computed(()=> userStore.currentUser),
      isOnFilter: true,
      search: {
        from: '',
        to: ''
      }
    });

    const closeModal = ()=> {
        ctx.emit('close-modal');
        state.search.from = '';
        state.search.to = '';
    }

    const sendTimesheet = ()=> {
      if(state.search.from && state.search.to){
        ctx.emit('submit-timesheet', state.search);
        closeModal();
      }
    }

    return {
      ...toRefs(state),
      closeModal,
      sendTimesheet
    }
  },
})
</script>