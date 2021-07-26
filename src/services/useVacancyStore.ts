import { defineStore } from "pinia";
import { vacancies } from "../utils/mockDataAPI";


export const useVacancyStore = defineStore({
   id: 'useVacancyStore',
   state: () => ({
      vacancies: vacancies
   })
})