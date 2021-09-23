import { doc, setDoc, collection, onSnapshot, getDocs } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { IStatistic, IStatisticAbsentMeta, IStatisticPenilaianUserMeta, IStatisticPlacementMeta, IStatisticTImesheetCollectionMeta, IStatisticTotalMeta, ITimesheetCollectionMeta, IUser } from '../types/InterfaceType';
import { currentMonthAndYear, currentMonthOnly } from '../utils/helperFunction';
import { statistic } from '../utils/mockDataAPI';
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
      statistic: statistic,
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
      async registerStatistic(userId: IUser['userId']) {

         // General Info Statistic
         const statistic: IStatistic = {
            userId: userId,
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

         // Absent Metadata
         const statisticAbsenMeta: IStatisticAbsentMeta = {
            month: currentMonthOnly(),
            jumlahHariCuti: 0,
            jumlahHariLibur: 0,
            jumlahHariMasuk: 0,
            performace: 0.00,
            monthName: currentMonthAndYear(new Date())
         }

         // Palement Metadata
         const statisticPlacementMeta: IStatisticPlacementMeta = {
            month: currentMonthOnly(),
            jumlahHariCuti: 0,
            jumlahHariLibur: 0,
            jumlahHariMasuk: 0,
            performace: 0.00,
            monthName: currentMonthAndYear(new Date())
         }

         // Collection TS Metadata
         const statisticCollectionMeta: IStatisticTImesheetCollectionMeta = {
            month: currentMonthOnly(),
            collectionDate: '',
            monthName: currentMonthAndYear(new Date()),
            performace: 0.00
         }

         // Penilaian User Metadata
         const statisticPenilaianMeta: IStatisticPenilaianUserMeta = {
            month: currentMonthOnly(),
            monthName: currentMonthAndYear(new Date()),
            ski: 0,
            kedisiplinan: 0,
            kompetensiPendukung: 0,
            performance: 0.00,
         }

         // Statistic Total Metadata
         const statisticTotalMeta: IStatisticTotalMeta = {
            month: currentMonthOnly(),
            monthName: currentMonthAndYear(new Date()),
            absensi: 0,
            placementProductivity: 0,
            timesheetCollection: 0,
            penilaianUser: 0,
            performance: 0,
            createdDate: Date.now(),
            lastModifiedDate: Date.now()
         }

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

         setDoc(docRefParent, statistic)
            .then(async () => {

               // Insert Absent
               await setDoc(doc(absensiRef, currentMonthOnly()), statisticAbsenMeta)
               // Insert Placement
               await setDoc(doc(placementRef, currentMonthOnly()), statisticPlacementMeta)
               // Insert Collectons
               await setDoc(doc(collectionRef, currentMonthOnly()), statisticCollectionMeta)
               // Insert Penilaian
               await setDoc(doc(penilaianRef, currentMonthOnly()), statisticPenilaianMeta)
               // Insert Total Performance
               await setDoc(doc(totalRef, currentMonthOnly()), statisticTotalMeta)

               this.getUserStatistic(userId);
            })
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
      }
   }
})