import dayjs from 'dayjs';
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { ITimesheet, ITimesheetCollectionMeta, IUser } from '../types/InterfaceType';
import { currentMonth, isWeekend } from '../utils/helperFunction';
import { db } from './useFirebaseService';
import { useUserStore } from './useUserStore';

const toast = useToast();
interface TimesheetStoreState {
   timehseets: ITimesheet[],
   isSendProgress: boolean,
   todayAbsentAlready: boolean,
   onGenerateProcess: boolean,
}

export const useTimesheetStore = defineStore({
   id: 'useTimesheetStore',
   state: (): TimesheetStoreState => ({
      timehseets: [] as ITimesheet[],
      isSendProgress: false,
      todayAbsentAlready: false,
      onGenerateProcess: false
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

      async addTimesheet(timesheet: ITimesheet, options?: { isGenerated: boolean }) {
         var userId = timesheet.user;

         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         const docSnap = doc(docRef, `TS-${currentMonth()}`, timesheet.absensiId);
         const docSnapSearch = doc(docRef, `timesheet`, timesheet.absensiId);

         /** Save to All Backup */
         await setDoc(docSnapSearch, timesheet);

         /** Save to specific month */
         setDoc(docSnap, timesheet)
            .then(() => {
               if (!options?.isGenerated) {
                  toast.info(`Timesheet ${timesheet.tanggalAsDate} has been added`);
               }
            });
      },

      async updateTimesheet(timesheet: ITimesheet) {
         var userId = timesheet.user;

         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         const docSnap = doc(docRef, `TS-${currentMonth()}`, timesheet.absensiId);
         const docSnapSearch = doc(docRef, `timesheet`, timesheet.absensiId);

         /** Update to specific month */
         await updateDoc(docSnap, timesheet)
            .then(() => toast.info('Timesheet Modified.'));

         /** Update to All Backup */
         await updateDoc(docSnapSearch, timesheet);
      },

      async getAllTimesheet(userId: IUser['userId']) {
         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         const collRef = collection(docRef, `TS-${currentMonth()}`);

         const q = query(collRef, where("isDone", "==", false));

         onSnapshot(q, (querySnapshot) => {

            /** Listen a snapshot */
            querySnapshot.docChanges().forEach((change) => {
               if (change.type === "added") {
                  this.toDayTimesheet(userId, dayjs().format('YYYY-MM-DD'));
               }
               if (change.type === "modified") {
                  this.toDayTimesheet(userId, dayjs().format('YYYY-MM-DD'));
               }
               if (change.type === "removed") {
                  this.toDayTimesheet(userId, dayjs().format('YYYY-MM-DD'));
               }
            });

            const timehseetsStore: ITimesheet[] = [];

            querySnapshot.forEach((doc: any) => {
               timehseetsStore.push(doc.data() as ITimesheet);
            });


            this.timehseets = timehseetsStore
               .filter((ts: ITimesheet) => dayjs(ts.cretedDate).isBefore(dayjs()))
               .sort((ts1: ITimesheet, ts2: ITimesheet) => ts2.cretedDate - ts1.cretedDate);
         });
      },

      async sendTimesheet(userId: IUser['userId']) {

         /** Loading State */
         this.isSendProgress = true;

         const userStore = useUserStore();
         const eroId = userStore.currentEro.eroId;
         const docRef = doc(db, `tbl_timesheet`, eroId);
         const docSnapToEro = doc(docRef, 'tbl_emp_timesheet', userId);

         this.timehseets.forEach(async (timesheet) => {
            /** Set isDone to True */
            timesheet.isDone = true;

            /** Prepare Update Employee Timesheet References*/
            const docRef = doc(db, `tbl_timesheet`, `${userId}`);
            const docSnap = doc(docRef, `TS-${currentMonth()}`, timesheet.absensiId);
            const docSnapSearch = doc(docRef, `timesheet`, timesheet.absensiId);

            /** Update to specific month */
            await updateDoc(docSnap, timesheet);

            /** Update to All Backup */
            await updateDoc(docSnapSearch, timesheet);

            /** Sent in to tbl_emp_timesheet in ERO Collections Data */
            const docSnapUser = doc(docSnapToEro, `TS-${currentMonth()}`, timesheet.absensiId);
            await setDoc(docSnapUser, timesheet);
         })

         /** Off loading State*/
         this.isSendProgress = true;

         /** Notification */
         toast.info(`Timesheet has been sent to ERO.`);
      },

      toDayTimesheet(userId: IUser['userId'], absensiId: ITimesheet['absensiId']) {
         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         const docSnap = doc(docRef, `TS-${currentMonth()}`, absensiId);

         getDoc(docSnap).then((data) => {
            if (data.exists())
               this.todayAbsentAlready = true;
            else
               this.todayAbsentAlready = false;
         })
      },

      async generateTimesheetTemplate(userId: IUser['userId']) {
         const docRef = doc(db, `tbl_timesheet`, `${userId}`);

         getDocs(collection(docRef, `TS-${currentMonth()}`))
            .then(snapshot => {

               /** Check if specific Month collection exist or not */
               if (snapshot.empty && localStorage.getItem('_uid')) {
                  /** Set Loading State */
                  this.onGenerateProcess = true;

                  let daysInMonth = dayjs().daysInMonth();

                  for (let index = 0; index < daysInMonth; index++) {
                     var dateId = `${currentMonth()}-${index + 1}`;
                     const timesheet = {
                        absensiId: dayjs(dateId).format('YYYY-MM-DD'),
                        jamOTTotal: "",
                        jamKerjaTotal: "",
                        tanggalAsDate: dayjs(dateId).format('YYYY-MM-DD'),
                        day: dayjs(dateId).date(),
                        month: dayjs(dateId).month() + 1,
                        year: dayjs(dateId).year(),
                        user: localStorage.getItem('_uid') as string,
                        kegiatan: dayjs(dateId).day() === 0 ? "Minggu" : dayjs(dateId).day() === 6 ? 'Sabtu' : '',
                        statusAbsensi: isWeekend(dateId) ? "Libur" : "-",
                        __v: 0,
                        jamKerjaMulai: "08:00",
                        jamKerjaSelesai: "17:00",
                        jamOTMulai: "",
                        jamOTSelesai: "",
                        placement: {
                           clientId: "27b24c1b-52af-41d1-8ca4-0a84087b376e",
                           clientName: "PT Azec Management Service",
                           clientAddress: "Jl. Gedong Panjang, Bandengan",
                           clientKota: "Jakarta Barat",
                           clientProvinsi: "DKI Jakarta",
                           clientCountry: "Indonesia",
                        },
                        template: true,
                        isDone: false,
                        cretedDate: new Date(dayjs(dateId).toDate()).getTime(),
                        lastModifiedDate: new Date(dayjs(dateId).toDate()).getTime()
                     } as ITimesheet

                     this.addTimesheet(timesheet, { isGenerated: true });
                  }
                  setTimeout(() => {
                     this.onGenerateProcess = false;
                     toast.info(`Timesheet Template has been generated`);
                  }, 2500);
               }
            });

      }
   }
})