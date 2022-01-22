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
                        Attachments
                     </dt>
                     <dd class="mt-1 text-sm input-custom-dd sm:mt-0 sm:col-span-2">
                        <!-- Progress Upload -->
                        <ul v-if="fileUploadStatus.length" class="space-y-2 with-transition">
                           <li v-for="(stat, idx) in fileUploadStatus" :key="idx">
                              <div class="flex items-center justify-between bg-green-200 dark:bg-green-500 p-2 rounded-md">
                                 <span>{{stat.fileName}}</span>
                                 <span v-if="stat.progress < 100">{{stat.progress.toFixed()}} %</span>
                                 <span v-else>
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 text-green-500 dark:text-green-200" viewBox="0 0 20 20" fill="currentColor">
                                       <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>
                                 </span>
                              </div>
                           </li>
                        </ul>

                        <!-- Upload File -->
                        <div class="mb-4">
                           <div @dragover="dragover" @dragleave="dragleave" @drop="drop" class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 hover:border-indigo-400 dark:hover:border-indigo-400 dark:border-gray-700 border-dashed rounded-md">
                              <div class="space-y-1 text-center">
                                 <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                 </svg>
                                 <div class="flex text-sm justify-center text-gray-600">
                                    <label for="file-upload-attachment" class="relative cursor-pointer rounded-md font-medium text-indigo-500 hover:text-indigo-400 dark:text-indigo-300 dark:hover:text-indigo-200">
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
                                    <p class="pl-1 hidden md:block dark:text-gray-400">or drag and drop</p>
                                 </div>
                                 <p class="text-xs text-gray-500 dark:text-gray-400">
                                    PDF up to 10MB with file name format Your_Name_CV.pdf
                                 </p>
                              </div>
                           </div>
                        </div>
                        <!-- End Upload File -->

                        <ul role="list" :class="[attachments.length ? `border border-gray-200 dark:border-gray-700 ` : ``]" class="rounded-md divide-y divide-gray-200 dark:divide-gray-700">
                           <li v-for="file in attachments" :key="file.uploadedAt" class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                              <div class="w-0 flex-1 flex items-center">
                                 <PaperClipIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                 <span class="ml-2 flex-1 w-0 truncate">
                                    <span>{{ file.name }}</span> <span class="text-[10px] hidden lg:inline p-0.5 px-1.5 ml-2 bg-indigo-500 dark:bg-indigo-600 text-white rounded-full">{{ file.sizeText }}</span>
                                 </span>
                              </div>
                              <div class="ml-4 flex-shrink-0 inline-flex space-x-3">
                                 <a href="" @click.prevent="onDownloadFile(file.name)" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                       <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                 </a>
                                 <a href="" @click.prevent="onDeleteFile(file.name)" class="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                       <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
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
import { useFileStore, useUserStore, useUtilityStore, useVacancyStore } from '@/services';
import { formatDateWithMonth, formatDateFromNow } from '@/utils/helperFunction';
import { PaperClipIcon } from '@heroicons/vue/solid'
import ProjectCard from '@/components/cards/ProjectCard.vue'
import GeneralProfileHeader from '@/components/GeneralProfileHeader.vue';
import Spinner from '@/components/modal/Spinner.vue';

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
         fileUploadStatus: computed(()=> fileStore.fileUploadStatus)
      })

      onMounted(()=> {
         vacancyStore.getVacancy(route.params.vacancyId as string);
         fileStore.getFile(state.uid);
      })

      const onUploadFile = async (event: any, dragDrop?: boolean) => {

         const files: FileList = dragDrop
            ? event.dataTransfer.files 
            : event.target.files;

         fileStore.uploadFile(files, state.uid)
            .then(()=>{
               setTimeout(() => {
                  fileStore.$patch((store)=> store.fileUploadStatus = []);
               }, 5000);
            });
      }

      const onDownloadFile = async (fileName: string) => {
         await fileStore.downloadFile(state.uid, fileName);
      }

      const onDeleteFile = async (fileName: string) => {
         await fileStore.removeFile(state.uid, fileName);
      }

      const dragover = (event: any) => {
         event.preventDefault();
         if (!event.currentTarget.classList.contains('border-indigo-400')) {
            event.currentTarget.classList.remove('border-gray-200');
            event.currentTarget.classList.remove('dark:border-gray-700');
            event.currentTarget.classList.add('border-indigo-400');
         }
      }

      const dragleave = (event: any)=> {
         event.currentTarget.classList.remove('border-indigo-400');
         event.currentTarget.classList.add('border-gray-300');
         event.currentTarget.classList.add('dark:border-gray-700');
      }

      const drop = (event: any) => {
         event.preventDefault();

         onUploadFile(event, true);

         event.currentTarget.classList.remove('border-indigo-400');
         event.currentTarget.classList.add('border-gray-300');
         event.currentTarget.classList.add('dark:border-gray-700');
      }

      return {
         ...toRefs(state),
         formatDateWithMonth,
         formatDateFromNow,
         onUploadFile,
         onDownloadFile,
         onDeleteFile,
         dragover,
         dragleave,
         drop,
      }
   }
})
</script>