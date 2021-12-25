<template>
<div class="flex relative w-full pb-20 md:pb-0">
   <div class="flex-1 rounded-lg">
      <header :class="[useBlur ? 'custom-backdrop bg-opacity-90' : '']" class="shadow-sm p-4 pt-[18px] sticky -top-1 z-10 bg-color-dark-gray-darker rounded-md flex justify-between">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-light font-semibold">
            <span> {{ $route.params.projectId === 'new_project' ? 'New project'  : 'Project detail'}} </span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-dark" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
               </svg>
            </span>
         </div>
         <div class="text-color-gray-lighter hidden sm:block text-sm space-x-2">
            <router-link to="/u/0/project"  class="inline-flex items-center px-4 py-2 cursor-default sm:cursor-pointer border border-gray-300 dark:border-color-gray-darkest rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-color-gray-lighter bg-white dark:bg-color-gray-darkest dark:hover:bg-color-dark-gray-darker hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               Cancel
            </router-link>
            <button type="button" @click="onSubmitAction" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               Save project
            </button>
         </div>
      </header>
      <div class="lg:grid-cols-4 gap-5 grid w-full pt-6 px-0.5">
         <div class="lg:col-span-1 space-y-6">
             <div class="card-wrapper-custom md:sticky top-24 h-auto pt-[18px]">
               <div class="text-color-dark-black-default dark:text-color-gray-lightest">
                  <h1 class="text-lg font-medium">Project Metadata</h1>
                  <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col mt-1 text-sm">
                     <span>Metadata project for tracking activity</span>
                        <div class="inline-flex items-center space-x-1 mt-3">
                           <p>Created at</p>
                           <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ formatDateWithMonth(project.createdDate)}}</p>
                        </div>
                        <div class="inline-flex items-center space-x-1 mt-3">
                           <p>Last modified </p>
                           <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ formatDateFromNow(project.lastModifiedDate) }}</p>
                        </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="lg:col-span-3 space-y-6">
            <div class="card-wrapper-general-theme overflow-hidden">
               <div class="py-5 border-b relative p-6 border-gray-200 dark:border-color-gray-darkest">
                  <h3 class="text-lg leading-6 font-medium text-color-dark-gray-darkest dark:text-color-gray-lighter">
                     Project detail
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-color-gray-default">
                     Detail and description projetc
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
                           Project name
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="project-name" class="input-custom-label">Project name</label>
                              <input 
                                 type="text" v-model="project.projectName" name="project-name" id="project-name" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 required
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-white">
                        <dt class="input-custom-dt">
                           Location
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="location" class="input-custom-label">Location</label>
                              <input 
                                 type="text" v-model="project.location" name="location" id="location" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 required
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-gray">
                        <dt class="input-custom-dt">
                           Client name
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="client-name" class="input-custom-label">Client name</label>
                              <input 
                                 type="text" v-model="project.clientName" name="client-name" id="client-name" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 required
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-white">
                        <dt class="input-custom-dt">
                           Nama user
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="nama-user" class="input-custom-label">Nama user</label>
                              <input 
                                 type="text" v-model="project.namaUser" name="nama-user" id="nama-user" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 required
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-gray">
                        <dt class="input-custom-dt">
                           Department
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="department" class="input-custom-label">Department</label>
                              <input 
                                 type="text" v-model="project.department" name="department" id="department" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 required
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-white">
                        <dt class="input-custom-dt">
                           Project phase
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="project-phase" class="input-custom-label">Project phase</label>
                              <input 
                                 type="text" v-model="project.projectPhase" name="project-phase" id="project-phase" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 required
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-gray">
                        <dt class="input-custom-dt">
                           Start project
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="start-project" class="input-custom-label">Start project</label>
                              <input
                                 v-if="isOnEdit" 
                                 type="date" v-model="project.startProject" name="start-project" id="start-project" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 required
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                              <span v-else>
                                 {{ formatDateWithMonth(project.startProject)}}
                              </span>
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-white">
                        <dt class="input-custom-dt">
                           End project
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="end-project" class="input-custom-label">End project</label>
                              <input
                                 v-if="isOnEdit" 
                                 type="date" v-model="project.endProject" name="end-project" id="end-project" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                              <span v-else>
                                 {{ formatDateWithMonth(project.endProject)}}
                              </span>
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-gray">
                        <dt class="input-custom-dt">
                           Role
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="role" class="input-custom-label">Role</label>
                              <input 
                                 type="text" v-model="project.role" name="role" id="role" autocomplete="off"
                                 :readonly="!isOnEdit"
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default" 
                              />
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-white">
                        <dt class="input-custom-dt">
                           Main task
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="main-task" class="input-custom-label">Main task</label>
                              <textarea 
                                 v-model="project.mainTask" id="main-task" name="main-task" rows="5" maxlength="250" 
                                 :readonly="!isOnEdit"
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default"
                              />
                              <span class="text-xs dark:text-color-gray-default">Total caracter {{ mainLength }}/250. </span>
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-gray">
                        <dt class="input-custom-dt">
                           Descriptions
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="description" class="input-custom-label">Descriptions</label>
                              <textarea 
                                 v-model="project.projectDescription" id="description" name="description" rows="5" maxlength="250" 
                                 :readonly="!isOnEdit"
                                 :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                 class="input-custom-default"
                              />
                              <span class="text-xs dark:text-color-gray-default">Total caracter {{ descLength }}/250. </span>
                        </dd>
                     </div>
                     <div class="input-custom-wrapper-white">
                        <dt class="input-custom-dt">
                           Technologies
                        </dt>
                        <dd class="input-custom-dd">
                           <label for="tag" class="input-custom-label">Technologies</label>
                           <div :class="[isOnEdit && onAddTags ? 'w-56 space-x-2': 'w-0']" class="flex with-transition items-center">
                              <input 
                                    type="text" v-model="newTech" name="tags" id="tags" autocomplete="off"
                                    :readonly="!isOnEdit"
                                    placeholder="Ex: Java, C#, etc"
                                    :class="[ isOnEdit && onAddTags ? 'input-custom-on-edit' : 'input-custom-non-edit']"
                                    class="input-custom-default" 
                                 />
                                 <button v-if="isOnEdit && !onAddTags" @click="onAddTags = !onAddTags" class="p-2 rounded text-white bg-indigo-600 hover:bg-indigo-700" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                       <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                                    </svg>
                                 </button>
                                 <button v-if="isOnEdit && onAddTags" @click="onAddTech" class="p-2 rounded text-white bg-indigo-600 hover:bg-indigo-700" type="button">
                                       add
                                 </button>
                           </div>
                           <div class="w-full flex flex-wrap mt-2">
                              <div 
                                 v-for="tech in project.projectTechologi" 
                                 :key="tech" 
                                 class="p-0.5 px-2 mr-1 mb-1 rounded-full text-[11px] border border-opacity-50 hover:text-color-gray-light border-purple-300 hover:bg-purple-500"
                              >
                                 {{ tech }}
                              </div>
                           </div>
                           <span class="text-xs dark:text-color-gray-default">This project use {{ project.projectTechologi?.length }} technologies.</span>
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
   <button type="button" @click="onSubmitAction" class="sticky-btn with-transition">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
   </button>
   <router-link to="/u/0/project" type="button" class="sticky-btn-raw bg-gray-600 cursor-not-allowed hover:bg-gray-700 right-24 with-transition">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
   </router-link>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import ProjectCard from '../components/cards/ProjectCard.vue'
import GeneralProfileHeader from '../components/GeneralProfileHeader.vue';
import { useProjectStore, useUtilityStore } from '../services';
import { IProject } from '../types/InterfaceType';
import { formatDateWithMonth, formatDateFromNow } from '../utils/helperFunction';

export default defineComponent({
  components: { ProjectCard, GeneralProfileHeader},
   setup () {
      const route = useRoute();
      const router = useRouter();

      const projectStore =  useProjectStore();
      const utilityStore = useUtilityStore();
      onMounted(()=> projectStore.getProject(route.params.projectId as string))

      const state = reactive({
         project: route.params.projectId == 'new_project' 
            ?  {
                  projectId: `${Date.now()}`,
                  userId: localStorage.getItem('_uid') as string,
                  clientName: "",
                  location: "",
                  department: "",
                  namaUser: "",
                  projectName: "",
                  startProject: null,
                  endProject: null,
                  role: "Developer",
                  projectPhase: "",
                  projectDescription:"Your Project Description here",
                  projectTechologi: [],
                  mainTask: "Your Main Task Description here",
                  createdDate: Date.now(),
                  lastModifiedDate: Date.now()
               } as IProject
            :  computed(()=>projectStore.selectedProject),
         isOnEdit: route.params.projectId == 'new_project' ? true : false,
         onAddTags: false,
         newTech: '',
         useBlur: computed(()=> utilityStore.useBlur),
         isNewProject: computed(() => route.params.projectId == 'new_project')
      })

      const toggleEditAction = (val: boolean): void => {
         state.isOnEdit = val;
      }

      const onAddTech = () =>{
         if(state.newTech.trim().length >= 3)
            state.project.projectTechologi.push(state.newTech);
         state.newTech = '';
         state.onAddTags = !state.onAddTags;
      }

      const onSubmitAction = ()=>{
         if(state.isNewProject && checkValidate.value){
            projectStore.addProject(state.project);
            toggleEditAction(false);
            router.back();
         }else{
            projectStore.updateProject(state.project);
            toggleEditAction(false);
            router.back();
         }
      }
      
      const checkValidate = computed(()=>{
         var pName = state.project.projectName.trim().length > 0;
         var pClientName = state.project.clientName.trim().length > 0;
         var pUser = state.project.namaUser.trim().length > 0;
         var pDepartment = state.project.department.trim().length > 0;
         var pStart = state.project.startProject != null ? state.project.startProject.trim().length > 0 : false;
         var pPhase = state.project.projectPhase != undefined ?  state.project.projectPhase.trim().length > 0 : false;
         var pLocation =  state.project.location != undefined ?  state.project.location?.trim().length > 0 : false;
         return pName && pClientName  && pUser  && pDepartment  && pStart  && pPhase  && pLocation;
      })
      const mainLength = computed(()=> state.project.mainTask?.length);
      const descLength = computed(()=> state.project.projectDescription?.length);

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