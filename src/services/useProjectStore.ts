import { defineStore } from 'pinia';
import { projects } from '../utils/mockDataAPI';

export const useProjectStore = defineStore({
   id: 'useProjectStore',
   state: () => ({
      projects: projects
   }),
   getters:{
      projectTotal(state){
         return state.projects.length
      }
   }
   
})