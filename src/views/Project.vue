<template>
<div class="flex relative w-full">
   <div class="flex-1 rounded-lg">
      <header :class="[useBlur ? 'custom-backdrop bg-opacity-90' : '']" class="shadow-sm p-4 pt-[18px] sticky -top-1 z-10 bg-color-dark-gray-darker flex justify-between">
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
      <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
         <li v-for="project in projects" :key="project.projectId">
            <ProjectCard :project="project"/>
         </li>
      </ul>
   </div>
   <button type="button" class="sticky-btn with-transition">
     <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
   </button>
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