<template>
<div class="flex relative w-full pb-20 md:pb-0">
   <div class="flex-1 rounded-lg">
      <header :class="[useBlur ? 'custom-backdrop bg-opacity-90' : '']" class="shadow-sm p-4 pt-[18px] sticky -top-1 z-10 bg-color-dark-gray-darker rounded-md flex justify-between">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-light font-semibold">
            <span>Vacancy detail</span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-dark" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clip-rule="evenodd" />
               </svg>
            </span>
         </div>
         <div v-if="userRole === '6'" class="text-color-gray-lighter hidden sm:block text-sm space-x-2">
            <router-link to="/u/0/vacancy"  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               Back to Vacancy
            </router-link>
         </div>
         <div v-else class="text-color-gray-lighter hidden sm:block text-sm space-x-2">
            <router-link to="/u/0/vacancy"  class="inline-flex items-center px-4 py-2 cursor-default sm:cursor-pointer border border-gray-300 dark:border-color-gray-darkest rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-color-gray-lighter bg-white dark:bg-color-gray-darkest dark:hover:bg-color-dark-gray-darker hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               Cancel
            </router-link>
            <button type="button" @click="onSubmitAction" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               Save vacancy
            </button>
         </div>
      </header>
      <div class="lg:grid-cols-4 gap-5 grid w-full mt-6 px-0.5">
         <div class="lg:col-span-1 space-y-6">
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
                           <p>Last modified </p>
                           <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ formatDateFromNow(vacancy.lastModifiedDate) }}</p>
                        </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="lg:col-span-3 space-y-6">
            <div class="card-wrapper-general-theme overflow-hidden">
               <div class="py-5 border-b relative p-6 border-gray-200 dark:border-color-gray-darkest">
                  <h3 class="text-lg leading-6 font-medium text-color-dark-gray-darkest dark:text-color-gray-lighter">
                     Vacancy detail
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-color-gray-default">
                     Detail and description internal vacancy
                  </p>

                  <svg @click="toggleEditAction(false)" v-if="isOnEdit && userRole !== '6'" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 absolute top-5 right-5 md:cursor-pointer text-color-dark-gray-lighter text-opacity-50 hover:text-opacity-100 dark:text-color-gray-darker transition-all dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg @click="toggleEditAction(true)" v-else-if="!isOnEdit && userRole !== '6'" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 absolute top-5 right-5 md:cursor-pointer text-color-dark-gray-lighter text-opacity-50 hover:text-opacity-100 dark:text-color-gray-darker transition-all dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
               </div>
            <div>
               <dl>
                  <div class="input-custom-wrapper-gray">
                     <dt class="input-custom-dt">
                        Vacancy name
                     </dt>
                     <dd class="input-custom-dd">
                        <label for="vacancy-name" class="input-custom-label">Vacancy name</label>
                           <input 
                              type="text" v-model="vacancy.vacancyName" name="vacancy-name" id="project-name" autocomplete="off"
                              :readonly="!isOnEdit"
                              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                              class="input-custom-default" 
                           />
                     </dd>
                  </div>
                  <div class="input-custom-wrapper-white">
                     <dt class="input-custom-dt">
                        Vacancy code
                     </dt>
                     <dd class="input-custom-dd">
                        <label for="vacancy-code" class="input-custom-label">Vacancy code</label>
                           <input 
                              type="text" v-model="vacancy.vacancyCode" name="vacancy-code" id="location" autocomplete="off"
                              :readonly="!isOnEdit"
                              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                              class="input-custom-default" 
                           />
                     </dd>
                  </div>
                  <div class="input-custom-wrapper-gray">
                     <dt class="input-custom-dt">
                        Vacancy type
                     </dt>
                     <dd class="input-custom-dd">
                        <label for="vacancy-type" class="input-custom-label">Vacancy type</label>
                           <input 
                              type="text" v-model="vacancy.vacancyType" name="vacancy-type" id="vacancy-type" autocomplete="off"
                              :readonly="!isOnEdit"
                              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                              class="input-custom-default" 
                           />
                     </dd>
                  </div>
                  <div class="input-custom-wrapper-white">
                     <dt class="input-custom-dt">
                        Vacancy min salary Rp(K)
                     </dt>
                     <dd class="input-custom-dd">
                        <label for="vacancy-min-salary" class="input-custom-label">Vacancy min salary</label>
                           <input 
                              type="text" v-model="vacancy.minSalaryOffer" name="vacancy-min-salary" id="vacancy-min-salary" autocomplete="off"
                              :readonly="!isOnEdit"
                              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                              class="input-custom-default" 
                           />
                     </dd>
                  </div>
                  <div class="input-custom-wrapper-gray">
                     <dt class="input-custom-dt">
                        Vacancy max salary Rp(K)
                     </dt>
                     <dd class="input-custom-dd">
                        <label for="vacancy-max-salary" class="input-custom-label">Vacancy max salary</label>
                           <input 
                              type="text" v-model="vacancy.maxSalaryOffer" name="vacancy-max-salary" id="vacancy-max-salary" autocomplete="off"
                              :readonly="!isOnEdit"
                              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                              class="input-custom-default" 
                           />
                     </dd>
                  </div>
                  <div class="input-custom-wrapper-white">
                     <dt class="input-custom-dt">
                        Job status
                     </dt>
                     <dd class="input-custom-dd">
                        <div class="mt-4 space-y-4">
                           <div class="flex items-start">
                              <div class="flex items-center h-5">
                                 <input id="fulltime" :disabled="!isOnEdit" v-model="vacancy.isFullTimeJob" name="fulltime" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest rounded" />
                              </div>
                              <div class="ml-3 text-sm">
                                 <label for="fulltime" class="font-medium text-gray-700 dark:text-color-dark-gray-lighter">Fulltime</label>
                                 <p class="text-gray-500 dark:text-color-gray-light">Only accepts for fulltime employee and can not be remote job.</p>
                              </div>
                           </div>
                           <div class="flex items-start">
                              <div class="flex items-center h-5">
                                 <input id="remote" :disabled="!isOnEdit" v-model="vacancy.isRemoteJob" name="remote" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest rounded" />
                              </div>
                              <div class="ml-3 text-sm">
                                 <label for="remote" class="font-medium text-gray-700 dark:text-color-dark-gray-lighter">Remote</label>
                                 <p class="text-gray-500 dark:text-color-gray-light">Job place is flexible and allow to work remotely.</p>
                              </div>
                           </div>
                           </div>
                     </dd>
                  </div>
                  <div class="input-custom-wrapper-gray">
                     <dt class="input-custom-dt">
                        Closing date
                     </dt>
                     <dd class="input-custom-dd">
                        <label for="closing-date" class="input-custom-label">Closing date</label>
                           <input
                              v-if="isOnEdit" 
                              type="date" v-model="vacancy.offerEndDate" name="closing-date" id="closing-date" autocomplete="off"
                              :readonly="!isOnEdit"
                              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                              class="input-custom-default" 
                           />
                           <span v-else>
                              {{ formatDateWithMonth(vacancy.offerEndDate)}}
                           </span>
                     </dd>
                  </div>
                  <div class="input-custom-wrapper-white">
                     <dt class="input-custom-dt">
                        Responsibilities
                     </dt>
                     <dd class="input-custom-dd">
                        <label for="responsibilities" class="input-custom-label">Responsibilities</label>
                           <textarea
                              v-if="isOnEdit" 
                              v-model="vacancy.vacancyResponsibilities" id="responsibilities" name="responsibilities" rows="5" maxlength="250" 
                              :readonly="!isOnEdit"
                              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                              class="input-custom-default"
                           />
                           <p v-else>{{ vacancy.vacancyResponsibilities }}</p>
                           <span class="text-xs dark:text-color-gray-default">Total caracter {{ mainLength }}/250. </span>
                     </dd>
                  </div>
                  <div class="input-custom-wrapper-gray">
                     <dt class="input-custom-dt">
                        Requirements
                     </dt>
                     <dd class="input-custom-dd">
                        <label for="requirements" class="input-custom-label">Requirements</label>
                           <textarea
                              v-if="isOnEdit" 
                              v-model="vacancy.vacancyRequirements" id="requirements" name="description" rows="5" maxlength="250" 
                              :readonly="!isOnEdit"
                              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                              class="input-custom-default"
                           />
                           <p v-else>{{ vacancy.vacancyRequirements }}</p>
                           <span class="text-xs dark:text-color-gray-default">Total caracter {{ descLength }}/1000. </span>
                     </dd>
                  </div>
               </dl>
               <div class="px-4 py-3 space-x-3 bg-gray-50 border-t border-gray-200 dark:border-color-gray-darkest dark:bg-color-dark-gray-darkest text-right sm:px-6">
                  <button v-if="!isOnEdit && userRole != '6'" type="button" @click="toggleEditAction(true)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-color-dark-gray-default dark:text-white bg-color-gray-light dark:bg-color-dark-gray-darker dark:hover:bg-color-dark-gray-dark hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                     Edit vacancy
                  </button>
                  <button v-if="isOnEdit" type="button" @click="toggleEditAction(false)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:text-white text-color-dark-gray-default hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                     Cancel
                  </button>
                  <button v-if="isOnEdit" type="button" @click="onSubmitAction" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                     Save
                  </button>
               </div>
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
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import ProjectCard from '../components/cards/ProjectCard.vue'
import GeneralProfileHeader from '../components/GeneralProfileHeader.vue';
import { useUtilityStore, useVacancyStore } from '../services';
import { IJobVacancy } from '../types/InterfaceType';
import { formatDateWithMonth, formatDateFromNow } from '../utils/helperFunction';

export default defineComponent({
  components: { ProjectCard, GeneralProfileHeader},
   setup () {
      const route = useRoute();
      const router = useRouter();

      const vacancyStore =  useVacancyStore();
      const utilityStore = useUtilityStore();

      const state = reactive({
         vacancy: route.params.vacancyId == 'new_vacancy' 
            ? {
               vacancyId: `${Date.now()}-${localStorage.getItem('_uid') as string}`,
               vacancyCode: "",
               vacancyName: "",
               vacancyType: "",
               vacancyRequirements: "Vacancy Description here",
               vacancyResponsibilities: "Vacancy Responsibility here",
               isOpen: true,
               minSalaryOffer: 0,
               maxSalaryOffer: 0,
               createdDate: Date.now(),
               lastModifiedDate: Date.now(),
               offerEndDate: '',
               isFullTimeJob: true,
               isRemoteJob: false
            } as IJobVacancy
            : computed(()=> vacancyStore.vacancies.filter(vac=> vac.vacancyId === route.params.vacancyId)[0]),
         isOnEdit: route.params.vacancyId == 'new_vacancy' ? true : false,
         onAddTags: false,
         newTech: '',
         useBlur: computed(()=> utilityStore.useBlur),
         userRole: computed(()=> localStorage.getItem('_role') as string),
         isNewProject: computed(() => route.params.vacancyId === 'new_vacancy')
      })

      const toggleEditAction = (val: boolean): void => {
         state.isOnEdit = val;
      }

      const onAddTech = () =>{
      }

      const onSubmitAction = ()=> {
         if(state.isNewProject && checkValidate.value) {
            vacancyStore.addProject(state.vacancy);
            toggleEditAction(false);
            router.back();
          } else { 
             vacancyStore.updateVacancy(state.vacancy);
             toggleEditAction(false);
             router.back();
          }
      }

      const checkValidate = computed(()=>{
         var vName = state.vacancy.vacancyName.trim().length > 0;
         var vCode = state.vacancy.vacancyCode.trim().length > 0;
         var vType = state.vacancy.vacancyType.trim().length > 0;
         var vClosingDate = state.vacancy.offerEndDate != null ? state.vacancy.offerEndDate.trim().length > 0 : false;

         return vName && vCode && vType && vClosingDate;
      })

      const mainLength = computed(()=> state.vacancy.vacancyResponsibilities?.length);
      const descLength = computed(()=> state.vacancy.vacancyRequirements?.length);

      return {
         ...toRefs(state),
         mainLength,
         descLength,
         formatDateWithMonth,
         formatDateFromNow,
         toggleEditAction,
         onSubmitAction,
         onAddTech
      }
   }
})
</script>