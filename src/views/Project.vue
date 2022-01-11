<template>
<div class="flex relative w-full pb-20">
   <div class="hidden lg:block absolute -z-0 top-64 -left-44">
      <img aria-hidden="true" class="dark:opacity-5 opacity-25" src="https://www.gstatic.com/mobilesdk/180824_mobilesdk/alertsDrawerEmptyState@2x.png" alt="img">
   </div>

   <div class="flex-1">
      <header :class="[useBlur ? 'custom-backdrop bg-opacity-90' : '']" class="shadow-sm p-4 pt-[18px] sticky -top-1 z-10 bg-color-dark-gray-darker rounded-md flex justify-between">
         <div class="text-2xl inline-flex items-center space-x-1 text-color-gray-light font-semibold">
            <span>Project</span> 
            <span>
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-color-gray-dark" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
               </svg>
            </span>
         </div>
         <div class="text-color-gray-lighter hidden sm:block text-sm">
            <router-link :to="{name: 'ProjectDetail', params:{ projectId: 'new_project'}}" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               Add project
            </router-link>
         </div>
      </header>
      <ul v-if="projects.length" class="grid relative sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-0.5">
         <li v-for="project in projects" :key="project.projectId">
            <ProjectCard :project="project"/>
         </li>
      </ul>
      <div v-else>
         <div class="flex flex-col with-transition space-y-8 items-center justify-center pt-24">
               <div class="flex flex-col items-center space-y-1">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  <h3 class="font-semibold dark:text-color-gray-lighter">No Projects</h3>
                  <p class="text-sm text-gray-700 dark:text-gray-400">Get started by creating a new project.</p>
               </div>
            <router-link :to="{name: 'ProjectDetail', params:{ projectId: 'new_project'} }" class="inline-flex justify-center space-x-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
               </svg>
               <span>New Project</span>
            </router-link>
         </div>
      </div>
   </div>
   <router-link :to="{name: 'ProjectDetail', params:{ projectId: 'new_project'} }" type="button" class="sticky-btn with-transition">
     <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
   </router-link>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import ProjectCard from '../components/cards/ProjectCard.vue'
import { useProjectStore, useUtilityStore } from '../services';
export default defineComponent({
  components: { ProjectCard},
   setup () {
      const projectStore =  useProjectStore();
      const utilityStore = useUtilityStore();

      const state = reactive({
         projects: computed(()=> projectStore.projects),
         useBlur: computed(()=> utilityStore.useBlur),
      })

      onMounted(()=>{
          projectStore.getListProject();
      })

      return {
         ...toRefs(state)
      }
   }
})
</script>