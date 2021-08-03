import dayjs from 'dayjs';
import { collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { ITimesheet, ITimesheetCollectionMeta, IUser } from '../types/InterfaceType';
import { db } from './useFirebaseService';
import { useUserStore } from './useUserStore';

const toast = useToast();

export const useTimesheetStore = defineStore({
   id: 'useTimesheetStore',
   state: () => ({
      timehseets: [] as ITimesheet[],
      isSendProgress: false,
      todayAbsentAlready: false
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

         setDoc(docSnap, timesheet)
            .then(() => toast.info(`Timesheet ${timesheet.absensiId} has been added`));
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
               if (change.type === "added") {
                  this.toDayTimesheet(userId, dayjs().format('YYYY-MM-DD'));
               }
               if (change.type === "modified") {
                  this.toDayTimesheet(userId, dayjs().format('YYYY-MM-DD'));
                  toast.info('Timesheet Modified.');
               }
               if (change.type === "removed") {
                  this.toDayTimesheet(userId, dayjs().format('YYYY-MM-DD'));
                  toast.info('Timesheet has been sent to ERO.');
               }
            });

            const timehseetsStore: ITimesheet[] = [];

            querySnapshot.forEach((doc: any) => {
               timehseetsStore.push(doc.data() as ITimesheet);
            });

            this.timehseets = timehseetsStore
               .sort((ts1: ITimesheet, ts2: ITimesheet) => ts2.cretedDate - ts1.cretedDate);
         });
      },

      sendTimesheet(userId: IUser['userId']) {

         /** Loading State */
         this.isSendProgress = true;

         const userStore = useUserStore();
         const eroId = userStore.currentEro.eroId;
         const docRef = doc(db, `tbl_timesheet`, eroId);
         const docSnap = doc(docRef, 'tbl_emp_timesheet', userId);

         this.timehseets.forEach(async (timesheet) => {
            /** Set isDone to True */
            timesheet.isDone = true;

            /** Update Employee Timesheet */
            this.updateTimesheet(timesheet);

            /** Sent in to tbl_emp_timesheet in ERO Collections Data */
            const docSnapUser = doc(docSnap, 'timesheet', timesheet.absensiId);
            await setDoc(docSnapUser, timesheet);
         })

         /** Off loading State*/
         this.isSendProgress = true;

         /** Notification */
         toast.info(`Timesheet has been sent to ERO.`);
      },

      toDayTimesheet(userId: IUser['userId'], absensiId: ITimesheet['absensiId']) {
         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         const docSnap = doc(docRef, 'timesheet', absensiId);

         getDoc(docSnap).then((data) => {
            if (data.exists())
               this.todayAbsentAlready = true;
            else
               this.todayAbsentAlready = false;
         })
      }

   }
})