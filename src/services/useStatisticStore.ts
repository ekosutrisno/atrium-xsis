import { defineStore } from 'pinia';
import { statistic } from '../utils/mockDataAPI';

export const useStatisticStore = defineStore({
   id: 'useStatisticStore',
   state: () => ({
      statistic: statistic
   }),
})