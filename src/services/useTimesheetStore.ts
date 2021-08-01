import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { ITimesheet, ITimesheetCollectionMeta, IUser } from '../types/InterfaceType';
import { db } from './useFirebaseService';
import { formatDateWithMonth } from '../utils/helperFunction';

const toast = useToast();

export const useTimesheetStore = defineStore({
   id: 'useTimesheetStore',
   state: () => ({
      timehseets: [] as ITimesheet[],
   }),

   actions: {

      async registerTimesheet(userId: IUser['userId']) {
         const timesheetMetaCollection: ITimesheetCollectionMeta = {
            userId: userId,
            cretedDate: Date.now(),
            lastModifiedDate: Date.now()
         }
         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         
         await setDoc(docRef, timesheetMetaCollection);
      },

      async addTimesheet(timesheet: ITimesheet) {
         var userId = timesheet.user;

         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         const docSnap = doc(docRef, 'timesheet', timesheet.absensiId);

         await setDoc(docSnap, timesheet);
      },

      async updateTimesheet(timesheet: ITimesheet) {
         var userId = timesheet.user;

         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         const docSnap = doc(docRef, 'timesheet', timesheet.absensiId);

         await updateDoc(docSnap, timesheet);
      },

      async getAllTimesheet(userId: IUser['userId']) {
         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         const collRef = collection(docRef, `timesheet`);

         const q = query(collRef, where("isDone", "==", false));

         onSnapshot(q, (querySnapshot) => {

            /** Listen a snapshot */
            querySnapshot.docChanges().forEach((change) => {
               if (change.type === "added") { }
               if (change.type === "modified") {
                  toast.info('Timesheet Modified.')
               }
               if (change.type === "removed") {
                  toast.info('Timesheet has been sent to ERO.')
               }
            });

            const timehseetsStore: ITimesheet[] = [];

            querySnapshot.forEach((doc: any) => {
               timehseetsStore.push(doc.data() as ITimesheet);
            });

            this.timehseets = timehseetsStore;
         });
      }
   }
})