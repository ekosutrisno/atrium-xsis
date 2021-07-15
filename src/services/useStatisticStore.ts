import { defineStore } from 'pinia';

export const useStatisticStore = defineStore({
   id: 'useStatisticStore',
   state: () => ({
      statisticList: [
         {
            id: 1,
            progress: 49.329,
            title: 'Absensi',
            to: '#'
         },
         {
            id: 2,
            progress: 47.030,
            title: 'Placement Productivity',
            to: '#'
         },
         {
            id: 3,
            progress: 33.331,
            title: 'Timesheet Collection',
            to: '#'
         },
         {
            id: 4,
            progress: 27.778,
            title: 'Penilaian User',
            to: '#'
         },
      ],
      statisticTotal: {
         id: 0,
         progress: 43.165,
         title: 'Total Performance',
         to: '#'
      }
   }),
})