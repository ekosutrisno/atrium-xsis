import { collection, doc, getDoc, getDocs, onSnapshot, setDoc } from "@firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { IJobVacancy } from "../types/InterfaceType";
import { vacanciesMock } from "../utils/mockDataAPI";
import { db } from "./useFirebaseService";


const toast = useToast();

interface VacancyStoreState {
   vacancies: IJobVacancy[]
   selectedVacancy: IJobVacancy
   isLoading: boolean
}

export const useVacancyStore = defineStore({
   id: 'useVacancyStore',

   state: (): VacancyStoreState => ({
      vacancies: [],
      selectedVacancy: {} as IJobVacancy,
      isLoading: false
   }),

   actions: {
      /**
       * Insert Initial default Vacancy
       */
      insertInitVancancy() {
         // Database Ref
         const dbRef = collection(db, 'tbl_vacancies');

         getDocs(dbRef)
            .then((vac) => {
               if (vac.empty) {
                  vacanciesMock.forEach(async (vc) => {
                     await setDoc(doc(db, 'tbl_vacancies', vc.vacancyId), vc);
                  })
               }
            })
      },

      /**
       * @param  {IJobVacancy} vacancy
       * Add Project to Collections
       */
      async addVacancy(vacancy: IJobVacancy) {
         setDoc(doc(db, "tbl_vacancies", vacancy.vacancyId), vacancy)
            .then(() => {
               toast.success('New Project has been added')
            });
      },

      /**
       * get All vacancies
       */
      async getAllVacancy() {
         const dbRef = collection(db, 'tbl_vacancies');

         onSnapshot(dbRef, (snapshot) => {

            const tempStore: IJobVacancy[] = [];

            snapshot.docs.forEach((vac) => {
               tempStore.push(vac.data() as IJobVacancy);
            })

            this.vacancies = tempStore;
         })
      },

      async updateVacancy(vacancy: IJobVacancy) {
         /** Last Updated Date */
         vacancy.lastModifiedDate = Date.now();

         updateDoc(doc(db, 'tbl_vacancies', vacancy.vacancyId), vacancy as any)
            .then(() => toast.info('Vacancy has been update succesfully'));
      },

      async getVacancy(vacancyId: IJobVacancy['vacancyId']) {
         const dbRef = doc(db, `tbl_vacancies`, vacancyId);

         // Loading
         this.isLoading = true;

         getDoc(dbRef)
            .then(snapshot => {
               if (snapshot.exists()) {
                  this.selectedVacancy = snapshot.data() as IJobVacancy;
                  this.isLoading = false;
               }
            }).finally(() => this.isLoading = false)
      },

      async deactiveVacancy(vacancyId: IJobVacancy['vacancyId']) {
         // TODO Set and Update vacancy properti isOpen to false

      }


   }
})