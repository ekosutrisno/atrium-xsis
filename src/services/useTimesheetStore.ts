import { defineStore } from 'pinia';
import { timehseets } from '../utils/mockDataAPI';

export const useTimesheetStore = defineStore({
   id: 'useTimesheetStore',
   state: () => ({
      timehseets: timehseets
   }),
})