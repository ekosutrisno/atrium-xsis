import { collection, doc, getDocs, onSnapshot, setDoc } from "@firebase/firestore";
import { defineStore } from "pinia";
import { IJobVacancy } from "../types/InterfaceType";
import { vacanciesMock } from "../utils/mockDataAPI";
import { db } from "./useFirebaseService";

interface VacancyStoreState {
   vacancies: IJobVacancy[]
}

export const useVacancyStore = defineStore({
   id: 'useVacancyStore',

   state: (): VacancyStoreState => ({
      vacancies: []
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

      async updateVacancy() {
         // Update Vacancy details TODO

      },

      async deactiveVacancy(vacancyId: IJobVacancy[ 'vacancyId' ]) {
         // Set and Update vacancy properti isOpen to false TODO

      }


   }
})