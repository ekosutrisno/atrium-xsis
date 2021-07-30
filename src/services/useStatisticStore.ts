import { doc, getDoc, setDoc } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { IStatistic, IUser } from '../types/InterfaceType';
import { statistic } from '../utils/mockDataAPI';
import { db } from './useFirebaseService';

export const useStatisticStore = defineStore({
   id: 'useStatisticStore',
   state: () => ({
      statistic: statistic
   }),
   actions: {
      async registerStatistic(userId: IUser['userId']) {
         const statistic: IStatistic = {
            userId: userId,
            total: {
               id: 0,
               progress: 0,
               title: "Total Performance",
               to: "#",
            },
            info: [
               {
                  id: 1,
                  progress: 0,
                  title: "Absensi",
                  to: "#",
               },
               {
                  id: 2,
                  progress: 0,
                  title: "Placement Productivity",
                  to: "#",
               },
               {
                  id: 3,
                  progress: 0,
                  title: "Timesheet Collection",
                  to: "#",
               },
               {
                  id: 4,
                  progress: 0,
                  title: "Penilaian User",
                  to: "#",
               },
            ],
         };

         setDoc(doc(db, 'tbl_statistic', userId), statistic)
            .then(() => {
               this.getUserStatistic(userId);
            });
      },

      async getUserStatistic(userId: IUser['userId']) {
         const docRef = doc(db, "tbl_statistic", userId);
         const docSnap = await getDoc(docRef);
         if (docSnap.exists()) {
            const data: any = docSnap.data();
            this.statistic = data;
         }
      }
   }
})