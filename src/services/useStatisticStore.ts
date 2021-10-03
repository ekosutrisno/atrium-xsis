import { doc, setDoc, collection, onSnapshot, getDocs, query, where, runTransaction, getDoc } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { FlagUseOn } from '../types/EnumType';
import { IStatistic, IStatisticAbsentMeta, IStatisticPenilaianUserMeta, IStatisticPlacementMeta, IStatisticTImesheetCollectionMeta, IStatisticTotalMeta, ITimesheetCollectionMeta, IUser } from '../types/InterfaceType';
import { calculatePerformaceAbsent, currentMonthAndYear, currentMonthOnly } from '../utils/helperFunction';
import { statistics } from '../utils/mockDataAPI';
import { db } from './useFirebaseService';

interface StatisticStoreState {
   statistic: IStatistic,
   absentStatistics: IStatisticAbsentMeta[],
   placementStatistics: IStatisticPlacementMeta[],
   collectionStatistics: IStatisticTImesheetCollectionMeta[],
   penilaianStatistic: IStatisticPenilaianUserMeta[],
   totalStatistics: IStatisticTotalMeta[]
}

export const useStatisticStore = defineStore({
   id: 'useStatisticStore',
   state: (): StatisticStoreState => ({
      statistic: statistics,
      absentStatistics: [],
      collectionStatistics: [],
      penilaianStatistic: [],
      placementStatistics: [],
      totalStatistics: []
   }),
   actions: {
      /**
       * @param  {IUser['userId']} userId
       * Register collection when user first register
       */
      async registerStatistic(userId: IUser['userId'], flagUseOn: FlagUseOn) {

         const currentYear = new Date().getFullYear().toString();

         // General Info Statistic
         const statistic: IStatistic = {
            userId: userId,
            year: currentYear,
            createdDate: Date.now(),
            lastModifiedDate: Date.now(),
            total: {
               id: 0,
               progress: 0,
               title: "Total Performance",
               to: "5",
            },
            info: [
               {
                  id: 1,
                  progress: 0,
                  title: "Absensi",
                  to: "1",
               },
               {
                  id: 2,
                  progress: 0,
                  title: "Placement Productivity",
                  to: "2",
               },
               {
                  id: 3,
                  progress: 0,
                  title: "Timesheet Collection",
                  to: "3",
               },
               {
                  id: 4,
                  progress: 0,
                  title: "Penilaian User",
                  to: "4",
               },
            ],
         };

         // Parent Collection
         const docRefParent = doc(db, 'tbl_statistic', userId);

         // Generate New Timehseet (Check per year);
         if (flagUseOn === FlagUseOn.GENERATION) {
            const collRef = collection(db, 'tbl_statistic');
            const q = query(collRef, where('userId', '==', userId), where('year', '==', currentYear));

            getDocs(q)
               .then((data) => {
                  if (data.empty) {
                     setDoc(docRefParent, statistic)
                        .then(async () => {
                           // Insert All Statistic Category 
                           insertStatisticCategory(docRefParent)
                              .then(() => this.getUserStatistic(userId));
                        })
                  }
               })
         } else if (flagUseOn === FlagUseOn.REGISTRATION) {
            setDoc(docRefParent, statistic)
               .then(async () => {
                  // Insert All Statistic Category 
                  insertStatisticCategory(docRefParent)
                     .then(() => this.getUserStatistic(userId));
               })
         }
      },

      /**
       * @param  {IUser['userId']} userId
       * Get User Statistic By user ID Key
       */
      async getUserStatistic(userId: IUser['userId']) {

         const docRef = doc(db, "tbl_statistic", userId);
         onSnapshot(docRef, (docSnap) => {

            if (docSnap.exists()) {
               const data: any = docSnap.data();
               this.statistic = data;
            }

         })
      },

      /**
       * @param  {IUser['userId']} userId
       * @param  {string} category
       * Get Detail statistic by category
       */
      async getDetailStatistic(userId: IUser['userId'], category: string) {
         const currentYear = new Date().getFullYear().toString();

         // Parent Collection
         const docRefParent = doc(db, 'tbl_statistic', userId);

         // Absen
         const absensiRef = collection(docRefParent, `A-${currentYear}`);
         // Placement
         const placementRef = collection(docRefParent, `B-${currentYear}`);
         // Collection
         const collectionRef = collection(docRefParent, `C-${currentYear}`);
         // Peniaian
         const penilaianRef = collection(docRefParent, `D-${currentYear}`);
         // Total
         const totalRef = collection(docRefParent, `E-${currentYear}`);

         switch (category) {
            case '1':
               getDocs(absensiRef).then((snap) => {
                  const temp: IStatisticAbsentMeta[] = [];

                  snap.forEach((res) => {
                     temp.push(res.data() as any);
                  })

                  this.absentStatistics = temp;
               })
               break;
            case '2':
               getDocs(placementRef).then((snap) => {
                  const temp: IStatisticPlacementMeta[] = [];

                  snap.forEach((res) => {
                     temp.push(res.data() as any);
                  })

                  this.placementStatistics = temp;
               })
               break;
            case '3':
               getDocs(collectionRef).then((snap) => {
                  const temp: IStatisticTImesheetCollectionMeta[] = [];

                  snap.forEach((res) => {
                     temp.push(res.data() as any);
                  })

                  this.collectionStatistics = temp;
               })
               break;
            case '4':
               getDocs(penilaianRef).then((snap) => {
                  const temp: IStatisticPenilaianUserMeta[] = [];

                  snap.forEach((res) => {
                     temp.push(res.data() as any);
                  })

                  this.penilaianStatistic = temp;
               })
               break;
            case '5':
               getDocs(totalRef).then((snap) => {
                  const temp: IStatisticTotalMeta[] = [];

                  snap.forEach((res) => {
                     temp.push(res.data() as any);
                  })

                  this.totalStatistics = temp;
               })
               break;

            default:
               break;
         }
      },

      /**
       * @returns Promise
       * This method handling realtime update for all statistic details
       */
      async onSnapshotRealtimeUpdateStatistic() {

         const currentYear = new Date().getFullYear().toString();
         const userId = localStorage.getItem('_uid') as string;

         // Get User Statistic newest
         this.getUserStatistic(userId);

         // Parent Collection
         const docRefParent = doc(db, 'tbl_statistic', userId);

         // Absen
         const absensiRef = collection(docRefParent, `A-${currentYear}`);
         onSnapshot(absensiRef, () => {
            this.getDetailStatistic(userId, '1');
         })

         // Placement
         const placementRef = collection(docRefParent, `B-${currentYear}`);
         onSnapshot(placementRef, () => {
            this.getDetailStatistic(userId, '2');
         })

         // Collection
         const collectionRef = collection(docRefParent, `C-${currentYear}`);
         onSnapshot(collectionRef, () => {
            this.getDetailStatistic(userId, '3');
         })

         // Peniaian
         const penilaianRef = collection(docRefParent, `D-${currentYear}`);
         onSnapshot(penilaianRef, () => {
            this.getDetailStatistic(userId, '4');
         })

         // Total
         const totalRef = collection(docRefParent, `E-${currentYear}`);
         onSnapshot(totalRef, () => {
            this.getDetailStatistic(userId, '5');
         })
      },

      async updateAbsentStatistic(options?: { edited: boolean, isWeekend: boolean, statusAbsensi: string, month: number }) {
         const currentYear = new Date().getFullYear().toString();
         const currentMonth = options?.month.toString();
         const userId = localStorage.getItem('_uid') as string;

         // Parent Collection
         const docRefParent = doc(db, 'tbl_statistic', userId);

         // Check if timehseet is  not on weekend and is already updated
         let checkValidator = !options?.edited && !options?.isWeekend && options?.statusAbsensi === 'Masuk';

         if (checkValidator) {

            await runTransaction(db, async (transaction) => {
               // Get The Current Statistic Form State
               const currentStatistic = this.statistic;

               // 1. Update the Absensi Statistic
               const absensiRef = collection(docRefParent, `A-${currentYear}`);

               const currentAbsen = this.absentStatistics
                  .filter(absen => absen.month === currentMonth)[0];

               currentAbsen.jumlahHariMasuk += 1;
               currentAbsen.performance = calculatePerformaceAbsent(currentAbsen.jumlahHariMasuk);

               transaction
                  .update(doc(absensiRef, currentMonth), currentAbsen as any)

               // Update absent total data in realtime (Absent)
               currentStatistic.info[0].progress = this.getTotalAbsensi;

               // 2. Update the Placement Statistic
               const placementRef = collection(docRefParent, `B-${currentYear}`);

               const currentPlacement = this.placementStatistics
                  .filter(absen => absen.month === currentMonth)[0];

               currentPlacement.jumlahHariMasuk += 1;
               currentPlacement.performance = calculatePerformaceAbsent(currentPlacement.jumlahHariMasuk);

               transaction
                  .update(doc(placementRef, currentMonth), currentPlacement as any)

               // Update absent total data in realtime (Placement)
               currentStatistic.info[1].progress = this.getTotalPlacement;

               currentStatistic.total.progress = getTotalCalculation(
                  this.getTotalAbsensi,
                  this.getTotalPlacement,
                  this.getTotalCollection,
                  this.getTotalPenilaian
               );

               // 3. Update The Total Data
               transaction
                  .update(docRefParent, currentStatistic);

               this.updateTotalStatistic();
            })
         }
      },

      async updateTotalStatistic() {
         const currentYear = new Date().getFullYear().toString();
         const currentMonth = currentMonthOnly();
         const userId = localStorage.getItem('_uid') as string;

         // Parent Collection
         const docRefParent = doc(db, 'tbl_statistic', userId);

         const totalRef = collection(docRefParent, `E-${currentYear}`);

         const statisticTotalMeta = this.totalStatistics
            .filter(absen => absen.month === currentMonth)[0];

         // Set New Data
         statisticTotalMeta.absensi = getTotalPerMonth(this.absentStatistics, currentMonth);
         statisticTotalMeta.placementProductivity = getTotalPerMonth(this.placementStatistics, currentMonth);
         statisticTotalMeta.timesheetCollection = getTotalPerMonth(this.collectionStatistics, currentMonth);
         statisticTotalMeta.penilaianUser = getTotalPerMonth(this.penilaianStatistic, currentMonth);
         statisticTotalMeta.performance = getTotalCalculation(
            statisticTotalMeta.absensi,
            statisticTotalMeta.placementProductivity,
            statisticTotalMeta.timesheetCollection,
            statisticTotalMeta.penilaianUser
         );
         statisticTotalMeta.lastModifiedDate = Date.now();

         await setDoc(doc(totalRef, currentMonthOnly()), statisticTotalMeta)
      },

      async generateStatisticCategoryPerMonth() {
         const userId = localStorage.getItem('_uid') as IUser['userId'];

         // Parent Collection
         const docRefParent = doc(db, 'tbl_statistic', userId);

         // Current Year
         const currentYear = new Date().getFullYear().toString();
         const absensiRef = collection(docRefParent, `A-${currentYear}`);

         getDoc(doc(absensiRef, currentMonthOnly()))
            .then(async (data) => {
               if (!data.exists())
                  await insertStatisticCategory(docRefParent);
            })
      }
   },

   getters: {
      getTotalAbsensi(state: StatisticStoreState) {
         return state
            .absentStatistics
            .reduce((previousValue, currentValue) => (previousValue + currentValue.performance), 0)
      },

      getTotalPlacement(state: StatisticStoreState) {
         return state
            .placementStatistics
            .reduce((previousValue, currentValue) => (previousValue + currentValue.performance), 0)
      },

      getTotalCollection(state: StatisticStoreState) {
         return state
            .collectionStatistics
            .reduce((previousValue, currentValue) => (previousValue + currentValue.performance), 0)
      },

      getTotalPenilaian(state: StatisticStoreState) {
         return state
            .penilaianStatistic
            .reduce((previousValue, currentValue) => (previousValue + currentValue.performance), 0)
      },

      getTotalStat(state) {
         return state.statistic.total.progress;
      }
   }
})

/**
 * Helper Method to calculate average of total statistic
 * @param  {number} absen
 * @param  {number} placement
 * @param  {number} collection
 * @param  {number} penilaian
 */
const getTotalCalculation = (absen: number, placement: number, collection: number, penilaian: number) => {
   return (absen + placement + collection + penilaian) / 4;
}

/** Helper Method to calculate and filter statistic activity per month
 * @param  {any[]} data
 * @param  {string} month
 * @returns number
 */
const getTotalPerMonth = (data: any[], month: string): number => {
   return data.filter(absen => absen.month === month)
      .reduce((previousValue, currentValue) => (previousValue + currentValue.performance), 0)
}
/**
 * This Method to Insert dan Generate Statistic Category by Month
 * @param  {any} docRefParent
 */
const insertStatisticCategory = async (docRefParent: any) => {

   // Current Year
   const currentYear = new Date().getFullYear().toString();

   // Absent Metadata
   const statisticAbsenMeta: IStatisticAbsentMeta = {
      month: currentMonthOnly(),
      year: currentYear,
      jumlahHariCuti: 0,
      jumlahHariLibur: 0,
      jumlahHariMasuk: 0,
      performance: 0.00,
      monthName: currentMonthAndYear(new Date())
   }

   // Palement Metadata
   const statisticPlacementMeta: IStatisticPlacementMeta = {
      month: currentMonthOnly(),
      year: currentYear,
      jumlahHariCuti: 0,
      jumlahHariLibur: 0,
      jumlahHariMasuk: 0,
      performance: 0.00,
      monthName: currentMonthAndYear(new Date())
   }

   // Collection TS Metadata
   const statisticCollectionMeta: IStatisticTImesheetCollectionMeta = {
      month: currentMonthOnly(),
      year: currentYear,
      collectionDate: '',
      monthName: currentMonthAndYear(new Date()),
      performance: 0.00
   }

   // Penilaian User Metadata
   const statisticPenilaianMeta: IStatisticPenilaianUserMeta = {
      month: currentMonthOnly(),
      year: currentYear,
      monthName: currentMonthAndYear(new Date()),
      ski: 0,
      kedisiplinan: 0,
      kompetensiPendukung: 0,
      performance: 0.00,
   }

   // Statistic Total Metadata
   const statisticTotalMeta: IStatisticTotalMeta = {
      month: currentMonthOnly(),
      year: currentYear,
      monthName: currentMonthAndYear(new Date()),
      absensi: 0,
      placementProductivity: 0,
      timesheetCollection: 0,
      penilaianUser: 0,
      performance: 0,
      createdDate: Date.now(),
      lastModifiedDate: Date.now()
   }

   // Insert Absent
   const absensiRef = collection(docRefParent, `A-${currentYear}`);
   await setDoc(doc(absensiRef, currentMonthOnly()), statisticAbsenMeta)

   // Insert Placement
   const placementRef = collection(docRefParent, `B-${currentYear}`);
   await setDoc(doc(placementRef, currentMonthOnly()), statisticPlacementMeta)

   // Insert Collectons
   const collectionRef = collection(docRefParent, `C-${currentYear}`);
   await setDoc(doc(collectionRef, currentMonthOnly()), statisticCollectionMeta)

   // Insert Penilaian
   const penilaianRef = collection(docRefParent, `D-${currentYear}`);
   await setDoc(doc(penilaianRef, currentMonthOnly()), statisticPenilaianMeta)

   // Insert Total Performance
   const totalRef = collection(docRefParent, `E-${currentYear}`);
   await setDoc(doc(totalRef, currentMonthOnly()), statisticTotalMeta)

}