<template>
<div class="flex relative w-full pb-20 md:pb-0">
   <img aria-hidden="true" class="hidden lg:block object-cover absolute -bottom-5 -left-44 opacity-25 dark:opacity-5" src="https://www.gstatic.com/mobilesdk/180824_mobilesdk/alertsDrawerEmptyState@2x.png" alt="img">
   
   <div class="flex-1 rounded-lg">
      <header :class="[useBlur ? 'custom-backdrop bg-opacity-90' : '']" class="shadow-sm p-4 pt-[18px] sticky -top-1 z-10 bg-color-dark-gray-darker rounded-md flex justify-between">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-light font-semibold">
            <span>Vacancy apply</span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-dark" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clip-rule="evenodd" />
               </svg>
            </span>
         </div>
         <div class="text-color-gray-lighter hidden sm:block text-sm space-x-2">
            <router-link to="/u/0/vacancy"  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
               Back to Vacancy
            </router-link>
            <router-link to="/u/0/vacancy"  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               Apply
            </router-link>
         </div>
      </header>
      <div class="lg:grid-cols-4 gap-5 grid w-full mt-6 px-0.5">
         <div class="lg:col-span-1 space-y-6 relative">
             <div class="card-wrapper-custom md:sticky top-24 max-h-48 pt-[18px]">
               <div class="text-color-dark-black-default dark:text-color-gray-lightest">
                  <h1 class="text-lg font-medium">Vacancy Metadata</h1>
                  <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col mt-1 text-sm">
                     <span>Metadata vacancy for tracking activity</span>
                        <div class="inline-flex items-center space-x-1 mt-3">
                           <p>Created at</p>
                           <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ formatDateWithMonth(vacancy.createdDate)}}</p>
                        </div>
                        <div class="inline-flex items-center space-x-1 mt-3">
                           <p>Last modified</p>
                           <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ formatDateFromNow(vacancy.lastModifiedDate) }}</p>
                        </div>
                        <div class="inline-flex items-center space-x-1 mt-3">
                           <p>Due date</p>
                           <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ formatDateWithMonth(vacancy.offerEndDate) }}</p>
                        </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="lg:col-span-3 space-y-6">
            <div class="card-wrapper-general-theme shadow overflow-hidden rounded-lg">
               <div class="px-4 py-5 sm:px-6 border-gray-200 dark:border-color-gray-darkest">
                  <h3 class="text-lg leading-6 font-medium text-color-dark-gray-darkest dark:text-color-gray-lighter">
                  Applicant Information
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-color-gray-default">
                  Personal details and application.
                  </p>
               </div>
               <div class="">
                  <dl>
                  <div class="input-custom-wrapper-gray px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                     <dt class="text-sm font-medium input-custom-dt">
                        Full name
                     </dt>
                     <dd class="mt-1 text-sm input-custom-dd sm:mt-0 sm:col-span-2">
                        {{ currentUser.fullName }}
                     </dd>
                  </div>
                  <div class="input-custom-wrapper-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                     <dt class="text-sm font-medium input-custom-dt">
                        Application for
                     </dt>
                     <dd class="mt-1 text-sm input-custom-dd sm:mt-0 sm:col-span-2">
                        {{ vacancy.vacancyName }}
                     </dd>
                  </div>
                  <div class="input-custom-wrapper-gray px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                     <dt class="text-sm font-medium input-custom-dt">
                        Email address
                     </dt>
                     <dd class="mt-1 text-sm input-custom-dd sm:mt-0 sm:col-span-2">
                        {{ currentUser.email }}
                     </dd>
                  </div>
                  <div class="input-custom-wrapper-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                     <dt class="text-sm font-medium input-custom-dt">
                        Salary expectation
                     </dt>
                     <dd class="mt-1 text-sm input-custom-dd sm:mt-0 sm:col-span-2">
                        Rp{{ vacancy.maxSalaryOffer }}K
                     </dd>
                  </div>
                  <div class="input-custom-wrapper-gray px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                     <dt class="text-sm font-medium input-custom-dt">
                        About
                     </dt>
                     <dd class="mt-1 text-sm input-custom-dd sm:mt-0 sm:col-span-2">
                        {{ currentUser.about }}
                     </dd>
                  </div>
                  <div class="input-custom-wrapper-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                     <dt class="text-sm font-medium input-custom-dt">
                        Attachments {{ statusUpload }}
                     </dt>
                     <dd class="mt-1 text-sm input-custom-dd sm:mt-0 sm:col-span-2">
                        <!-- Upload File -->
                        <div class="mb-4">
                           <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 hover:border-indigo-400 dark:border-gray-700 dark:hover:border-indigo-400  border-dashed rounded-md">
                              <div class="space-y-1 text-center">
                                 <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                 </svg>
                                 <div class="flex text-sm text-gray-600">
                                    <label for="file-upload-attachment" class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                       <span>Upload a file</span>
                                       <input 
                                          id="file-upload-attachment" 
                                          name="file-upload-attachment" 
                                          multiple 
                                          type="file" 
                                          class="sr-only"
                                          accept="application/pdf"
                                           @change="onUploadFile" 
                                       />
                                    </label>
                                    <p class="pl-1 dark:text-gray-400">or drag and drop</p>
                                 </div>
                                 <p class="text-xs text-gray-500 dark:text-gray-400">
                                    PDF up to 10MB
                                 </p>
                              </div>
                           </div>
                        </div>
                        <!-- End Upload File -->

                        <ul role="list" class="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700">
                           <li v-for="file in attachments" :key="file.uploadedAt" class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                              <div class="w-0 flex-1 flex items-center">
                                 <PaperClipIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                 <span class="ml-2 flex-1 w-0 truncate">
                                    {{ file.name }}
                                 </span>
                              </div>
                              <div class="ml-4 flex-shrink-0">
                                 <a href="" @click.prevent="onDownloadFile(file.name)" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                                 Download
                                 </a>
                              </div>
                           </li>
                        </ul>
                     </dd>
                  </div>
                  </dl>
               </div>
            </div>
         </div>
      </div>
   </div>
   <button type="button" class="sticky-btn with-transition">
     <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
   </button>
   <router-link to="/u/0/vacancy" type="button" class="sticky-btn-raw bg-gray-600 cursor-not-allowed hover:bg-gray-700 right-24 with-transition">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
   </router-link>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useFileStore, useUserStore, useUtilityStore, useVacancyStore } from '../services';
import { formatDateWithMonth, formatDateFromNow } from '../utils/helperFunction';
import { PaperClipIcon } from '@heroicons/vue/solid'
import ProjectCard from '../components/cards/ProjectCard.vue'
import GeneralProfileHeader from '../components/GeneralProfileHeader.vue';
import Spinner from '../components/modal/Spinner.vue';

export default defineComponent({
  components: { ProjectCard, GeneralProfileHeader, PaperClipIcon, Spinner},
   setup () {
      const route = useRoute();
      const router = useRouter();

      const vacancyStore =  useVacancyStore();
      const utilityStore = useUtilityStore();
      const userStore = useUserStore();
      const fileStore = useFileStore();

      const state = reactive({
         vacancy: computed(()=> vacancyStore.selectedVacancy),
         uid: computed(()=> localStorage.getItem('_uid') as string),
         currentUser: computed(()=> userStore.currentUser),
         useBlur: computed(()=> utilityStore.useBlur),
         isLoginProcess: computed(()=> vacancyStore.isLoading),
         attachments: computed(()=> fileStore.files),
         statusUpload: computed(()=> fileStore.statusUpload)
      })

      onMounted(()=> {
         vacancyStore.getVacancy(route.params.vacancyId as string);
         fileStore.getFile(state.uid);
      })

      const onUploadFile = async (event: any) => {
         const files: FileList = event.target.files;
         await fileStore.uploadFile(files, state.uid);
      
      }

      const onDownloadFile = async (fileName: string) => {
         await fileStore.downloadFile(state.uid, fileName);
      
      }

      return {
         ...toRefs(state),
         formatDateWithMonth,
         formatDateFromNow,
         onUploadFile,
         onDownloadFile
      }
   }
})
</script>