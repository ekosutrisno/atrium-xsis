import { defineStore } from 'pinia';
import { projects } from '../utils/mockDataAPI';

export const useProjectStore = defineStore({
   id: 'useProjectStore',
   state: () => ({
      projects: projects
   }),
   getters:{
      /**
       * @param  {} state
       * @returns number
       */
      projectTotal(state): number{
         return state.projects.length
      }
   }
   
})