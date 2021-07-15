<template>
<div class="flex antialiased h-full flex-col space-y-2 w-full bg-color-gray-lightest dark:bg-color-dark-gray-darker dark:text-color-gray-light md:cursor-pointer hover:shadow-2xl md:hover:ring-1 md:hover:ring-indigo-400 md:hover:ring-opacity-75 transition-all border border-gray-200 dark:border-color-gray-darkest rounded-md p-4">
   <div class="flex items-center justify-between border-b pb-2 border-gray-100 dark:border-color-gray-darkest">
      <p>Project</p>
      <div class="inline-flex space-x-2">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-color-gray-default dark:text-color-gray-darkest transition-all hover:text-red-400 dark:hover:text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
         </svg>
         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-color-gray-dark dark:text-color-gray-darker transition-all hover:text-indigo-400 dark:hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
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
         <span class="text-sm"> {{ project.startProject.toLocaleDateString() }} </span>
      </div>
      <div>
         <span class="text-xs block text-color-gray-dark dark:text-color-gray-default">End project</span>
         <span class="text-sm">{{ project.endProject.toLocaleDateString() }}</span>
      </div>
      </div>
   <div>
      <span class="text-xs block text-color-gray-dark dark:text-color-gray-default">Role</span>
      <span class="p-0.5 px-2 rounded-full text-color-gray-light text-xs bg-indigo-400">{{ project.role }}</span>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IProject } from '../../types/InterfaceType';

export default defineComponent({
   props:{
      project:{
         type: Object as ()=> IProject,
         required: true
      }
   },
   setup () {
      

      return {}
   }
})
</script>