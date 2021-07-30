import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { ITimesheet, IUser } from '../types/InterfaceType';
import { db } from './useFirebaseService';
import { formatDateWithMonth } from '../utils/helperFunction';

const toast = useToast();

export const useTimesheetStore = defineStore({
   id: 'useTimesheetStore',
   state: () => ({
      timehseets: [] as ITimesheet[],
   }),

   actions: {
      async addTimesheet(timesheet: ITimesheet) {
         var userId = timesheet.user;
         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         const docSnap = doc(collection(docRef, "timesheet"));

         setDoc(docSnap, timesheet)
            .then(() => {

               this.getAllTimesheet(userId as IUser['userId']);
               toast.success(`Timesheet created for ${formatDateWithMonth(timesheet.tanggalAsDate)}`);
            });
      },

      async getAllTimesheet(userId: IUser['userId']) {
         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         const querySnapshot = await getDocs(collection(docRef, `timesheet`));

         const timehseetsStore: ITimesheet[] = [];

         querySnapshot.forEach((doc) => {
            timehseetsStore.push(doc.data() as ITimesheet)
         });

         this.timehseets = timehseetsStore;
      }
   }
})