import dayjs from 'dayjs';
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { useStatisticStore } from '.';
import { ITimesheet, ITimesheetCollectionMeta, IUser } from '../types/InterfaceType';
import { currentMonth, isWeekend } from '../utils/helperFunction';
import { db } from './useFirebaseService';
import { useUserStore } from './useUserStore';

const toast = useToast();
interface TimesheetStoreState {
   timehseets: ITimesheet[],
   timehseetsNonFiltered: ITimesheet[],
   isSendProgress: boolean,
   todayAbsentAlready: boolean,
   onGenerateProcess: boolean,
   currentMonthExist: boolean
}

export const useTimesheetStore = defineStore('useTimesheetStore', {
   state: (): TimesheetStoreState => ({
      timehseets: [] as ITimesheet[],
      timehseetsNonFiltered: [] as ITimesheet[],
      isSendProgress: false,
      todayAbsentAlready: false,
      onGenerateProcess: false,
      currentMonthExist: true
   }),

   actions: {
      /**
       * @param  {IUser['userId']} userId
       * Register Timesheet collection when new user register
       */
      async registerTimesheet(userId: IUser['userId']) {
         const timesheetMetaCollection: ITimesheetCollectionMeta = {
            userId: userId,
            createdDate: Date.now(),
            lastModifiedDate: Date.now()
         }
         const docRef = doc(db, `tbl_timesheet`, `${userId}`);

         await setDoc(docRef, timesheetMetaCollection);
      },

      /**
       * @param  {ITimesheet} timesheet
       * @param  {{isGenerated:boolean}} options?
       * Add timesheet to database
       */
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

      /**
       * @param  {ITimesheet} timesheet
       * Update Individual Timesheet
       */
      async updateTimesheet(timesheet: ITimesheet) {

         // Init and Call Statistic Store
         const statisticStore = useStatisticStore();

         var userId = timesheet.user;

         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         const docSnap = doc(docRef, `TS-${timesheet.year}-${timesheet.month}`, timesheet.absensiId);
         const docSnapSearch = doc(docRef, `timesheet`, timesheet.absensiId);

         /** Is set options to update statistic data */
         const options = {
            isWeekend: timesheet.isWeekend,
            edited: timesheet.edited,
            statusAbsensi: timesheet.statusAbsensi,
            month: timesheet.month
         };

         /** Set edited to true */
         timesheet.edited = true;
         timesheet.lastModifiedDate = Date.now();

         /** Update to specific month */
         await updateDoc(docSnap, timesheet as any)
            .then(async () => {
               toast.info('Timesheet Modified.');
               await statisticStore.updateAbsentStatistic(options);
            });

         /** Update to All Backup */
         await updateDoc(docSnapSearch, timesheet as any);
      },

      /**
       * @param  {IUser['userId']} userId
       * Get All Timesheet to this month with realtime update or change effect
       */
      async getAllTimesheet(userId: IUser['userId']) {
         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         const collRef = collection(docRef, `TS-${currentMonth()}`);

         const q = query(collRef, where("__v", "==", 0));

         onSnapshot(q, (querySnapshot) => {

            this.toDayTimesheet(userId, dayjs().format('YYYY-MM-DD'));

            const timehseetsStore: ITimesheet[] = [];

            querySnapshot.forEach((doc: any) => {
               timehseetsStore.push(doc.data() as ITimesheet);
            });

            /** Set All Timesheet non Filtered */
            this.timehseetsNonFiltered = timehseetsStore;

            /** Set Timesheet with Filtered before today */
            this.timehseets = this.timehseetsNonFiltered
               .filter((ts: ITimesheet) => dayjs(ts.createdDate).isBefore(dayjs()))
               .sort((ts1: ITimesheet, ts2: ITimesheet) => ts2.createdDate - ts1.createdDate);
         });
      },

      /**
       * @param  {IUser['userId']} userId
       * Check if timesheet already fill properly and then send
       */
      async checkTimesheetAlreadyAndUpdate(userId: IUser['userId'], search: { from: string, to: string }, isCurrentPriode: boolean) {
         if (isCurrentPriode) {
            toast.warning(`From ${search.from} to ${search.to}`);
            // this.sendTimesheet(userId);
         }
         else
            toast.warning(`From ${search.from} to ${search.to}`);

      },

      /**
       * @param  {IUser['userId']} userId
       * Send Timesheet to Ero/HR/Manager
       */
      async sendTimesheet(userId: IUser['userId']) {
         const userStore = useUserStore();

         if (userStore.currentEro !== null) {
            /** Loading State */
            this.isSendProgress = true;

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
            this.isSendProgress = false;

            /** Notification */
            toast.info(`Timesheet has been sent to ERO.`);
         }
      },

      /**
       * @param  {IUser['userId']} userId
       * @param  {ITimesheet['absensiId']} absensiId
       * Check if today already absent
       */
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

      /**
       * @param  {IUser['userId']} userId
       * Generate Timesheet template autimaticly every first date in month
       */
      async generateTimesheetTemplate(userId: IUser['userId']) {

         const userStore = useUserStore();
         const statisticStore = useStatisticStore();
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
                        isWeekend: isWeekend(dateId) ? true : false,
                        edited: false,
                        __v: 0,
                        jamKerjaMulai: "08:00",
                        jamKerjaSelesai: "17:00",
                        jamOTMulai: "",
                        jamOTSelesai: "",
                        placement: userStore.currentClient,
                        template: true,
                        isDone: false,
                        createdDate: new Date(dayjs(dateId).toDate()).getTime(),
                        lastModifiedDate: new Date(dayjs(dateId).toDate()).getTime()
                     } as ITimesheet

                     this.addTimesheet(timesheet, { isGenerated: true });
                  }

                  setTimeout(() => {
                     // Set loading progress to false
                     this.onGenerateProcess = false;

                     // Generate Statistic Data per month
                     statisticStore
                        .generateStatisticCategoryPerMonth()
                        .then(() => toast.info(`Timesheet ${dayjs().format('MMMM YYYY')} has been generated`))

                  }, 2500);
               }
            });
      },

      /**
       * @param  {IUser['userId']} userId
       * @param  {{from:any, to:any, perMonth:boolean}} range
       * @returns Promise of ITimesheet[]
       */
      async filterAndSearchTimesheet(userId: IUser['userId'], params: { from?: any, to?: any, months?: any, perMonth: boolean }): Promise<void> {
         /** Make sure and format date */
         var from = dayjs(params.from).toDate().getTime();
         var to = dayjs(params.to).toDate().getTime();
         var months = `${dayjs(params.months).year()}-${(dayjs(params.months).month() + 1)}`


         const docRef = doc(db, `tbl_timesheet`, `${userId}`);
         const docSnapMonth = collection(docRef, `TS-${months}`);
         const docSnapSearch = collection(docRef, `timesheet`);
         const q = query(docSnapSearch, where("createdDate", ">=", from), where('createdDate', '<=', to));

         getDocs(params.perMonth ? docSnapMonth : q).then(snapshot => {
            if (!snapshot.empty) {
               const filteredTimesheet: ITimesheet[] = [];

               snapshot.docs.forEach((ts) => {
                  filteredTimesheet.push(ts.data() as ITimesheet)
               })

               this.timehseets = filteredTimesheet;
            }
         });
      },

      checkCurrentMonthTimesheet() {
         const docRef = doc(db, `tbl_timesheet`, `${localStorage.getItem('_uid') as string}`);
         const collRef = collection(docRef, `TS-${currentMonth()}`);

         onSnapshot(collRef, (snap) => {
            if (snap.empty) {
               this.currentMonthExist = false;
            } else {
               this.currentMonthExist = true;
            }
         })
      }
   },

   getters: {
      /**
       * @param  {} state
       * @returns boolean
       */
      timesheetNotReady(state: TimesheetStoreState): boolean {
         return state
            .timehseetsNonFiltered
            .filter(ts => !ts.edited && !ts.isWeekend).length > 0;
      }
   }
})