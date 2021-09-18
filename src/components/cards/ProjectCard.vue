<template>
<div class="flex h-full bg-pattern-light dark:bg-pattern-dark flex-col justify-between space-y-2 w-full bg-color-gray-lightest dark:bg-color-dark-gray-darker dark:text-color-gray-light md:cursor-pointer hover:shadow-2xl hover:ring-1 hover:ring-indigo-400 hover:ring-opacity-75 transition-all border border-gray-200 dark:border-color-gray-darkest rounded-md p-4">
   <div class="flex h-full flex-col space-y-3 w-full">
      <div class="flex items-center justify-between border-b pb-2 border-gray-100 dark:border-color-gray-darkest">
      <h3>Project</h3>
         <div class="inline-flex space-x-3">
            <div class="p-0.5 px-2 inline-flex items-center justify-center rounded-full text-[11px] border border-opacity-50 border-gray-300 dark:border-color-gray-darkest"> {{ project.projectPhase }} </div>
            <svg @click="toggleModal" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 md:cursor-pointer text-gray-300 dark:text-color-gray-darkest transition-all hover:text-red-400 dark:hover:text-red-400" viewBox="0 0 20 20" fill="currentColor">
               <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <svg @click="gotToEditAction(project.projectId)" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 md:cursor-pointer text-color-gray-default dark:text-color-gray-darker transition-all hover:text-indigo-600 dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
               <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
         </div>
      </div>
      <div>
         <span class="text-xs block text-color-gray-dark dark:text-color-gray-default">Project</span>
         <span class="text-sm">{{ project.projectName }}</span>
      </div>
      <div>
         <span class="text-xs block text-color-gray-dark dark:text-color-gray-default">Client</span>
         <span class="text-sm"> {{ project.clientName }} </span>
      </div>
      <div class="grid grid-cols-2">
         <div>
            <span class="text-xs block text-color-gray-dark dark:text-color-gray-default">Start project</span>
            <span class="text-sm"> {{ formatDateWithMonth(project.startProject) }} </span>
         </div>
         <div>
            <span class="text-xs block text-color-gray-dark dark:text-color-gray-default">End project</span>
            <span v-if="project.endProject" class="text-sm">{{ formatDateWithMonth(project.endProject)}}</span>
            <span v-else class="p-0.5 px-2 rounded-full text-xs border border-opacity-50 hover:text-color-gray-light border-green-300 hover:bg-green-500">On Progress</span>

         </div>
         </div>
      <div>
         <span class="text-xs block text-color-gray-dark dark:text-color-gray-default">Role</span>
         <span class="p-0.5 px-2 rounded-full text-color-gray-lightest text-xs bg-indigo-600">{{ project.role }}</span>
      </div>
      <div>
         <span class="text-xs block text-color-gray-dark dark:text-color-gray-default">Descriptions</span>
         <p class="text-sm"> {{ project.projectDescription }} </p>
      </div>
      <div>
         <span class="text-xs block text-color-gray-dark dark:text-color-gray-default">Main Task</span>
         <p class="text-sm"> {{ project.mainTask }} </p>
      </div>
   </div>

   <div class="w-full">
      <span class="text-xs block mb-1 text-color-gray-dark dark:text-color-gray-default">Technology</span>
      <div class="w-full flex flex-wrap">
         <div 
         v-for="tech in project.projectTechologi" 
         :key="tech" 
         class="p-0.5 px-2 mr-1 mb-1 rounded-full text-[11px] border border-opacity-50 hover:text-color-gray-light border-purple-300 hover:bg-purple-500"
       >
         {{ tech }}
       </div>
      </div>
   </div>
</div>
 <DeleteProjectModal :open="open" @delete="onDeleteProject" @close-modal="toggleModal"/>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import { IProject } from '../../types/InterfaceType';
import DeleteProjectModal from '../modal/DeleteProjectModal.vue';
import { formatDateWithMonth } from '../../utils/helperFunction';
import { useProjectStore } from '../../services';

export default defineComponent({
  components: { DeleteProjectModal },
   props:{
      project:{
         type: Object as ()=> IProject,
         required: true
      }
   },
   setup (props) {
      const projectStore = useProjectStore();
      const router = useRouter();

      const state = reactive({
         open: false
      })

      const onDeleteProject = () =>{
         projectStore
            .deleteProject(props.project)
               .then(() => toggleModal());
      }

      const toggleModal = () =>{
         state.open = !state.open
      }

      const gotToEditAction = (projectId: IProject['projectId']): void =>{
         router.push({
            name: 'ProjectDetail', 
            params:{ projectId: projectId }
         });
      }

      return {
         ...toRefs(state),
         onDeleteProject,
         toggleModal,
         gotToEditAction,
         formatDateWithMonth
      }
   }
})
</script>