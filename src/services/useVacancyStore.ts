import { collection, doc, getDocs, onSnapshot, setDoc } from "@firebase/firestore";
import { addDoc, query, updateDoc, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { IJobVacancy } from "../types/InterfaceType";
import { vacanciesMock } from "../utils/mockDataAPI";
import { db } from "./useFirebaseService";


const toast = useToast();

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
       * @param  {IJobVacancy} vacancy
       * Add Project to Collections
       */
      async addProject(vacancy: IJobVacancy) {
         addDoc(collection(db, "tbl_vacancies"), vacancy)
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
         const collRef = collection(db, `tbl_vacancies`);
         const q = query(collRef, where("vacancyId", "==", vacancy.vacancyId));
         getDocs(q).then((data) => {
            if (data.docs.length) {
               const vacancyId = data.docs[0].id;

               /** Last Updated Date */
               vacancy.lastModifiedDate = Date.now();

               updateDoc(doc(db, 'tbl_vacancies', vacancyId), vacancy as any)
                  .then(() => toast.info('Vacancy has been update succesfully'));
            }
         })

      },

      async deactiveVacancy(vacancyId: IJobVacancy['vacancyId']) {
         // Set and Update vacancy properti isOpen to false TODO

      }


   }
})