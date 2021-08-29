import { defineStore } from "pinia";
import { IJobVacancy } from "../types/InterfaceType";
import { vacancies } from "../utils/mockDataAPI";

interface VacancyStoreState {
   vacancies: IJobVacancy[]
}

export const useVacancyStore = defineStore({
   id: 'useVacancyStore',
   state: (): VacancyStoreState => ({
      vacancies: vacancies
   })
})