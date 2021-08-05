import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { IProject } from '../types/InterfaceType';
import { db } from './useFirebaseService';
const toast = useToast();

export const useProjectStore = defineStore({
   id: 'useProjectStore',
   state: () => ({
      projects: [] as IProject[],
   }),
   actions: {
      async addProject(project: IProject) {
         addDoc(collection(db, "tbl_project"), project)
            .then(() => {
               toast.success('New Project has been added')
            });
      },

      async updateProject(project: IProject) {
         const collRef = collection(db, `tbl_project`);
         const q = query(collRef, where("projectId", "==", project.projectId));
         getDocs(q).then((data) => {
            if (data.docs.length) {
               const projectId = data.docs[0].id;
               updateDoc(doc(db, 'tbl_project', projectId), project)
                  .then(() => toast.info('Project has been update succesfully'));
            }
         })
      },

      async deleteProject(project: IProject) {
         const collRef = collection(db, `tbl_project`);
         const q = query(collRef, where("projectId", "==", project.projectId));
         getDocs(q).then((data) => {
            if (data.docs.length) {
               const projectId = data.docs[0].id;
               deleteDoc(doc(db, "tbl_project", projectId))
                  .then(() => toast.info('Project has been update succesfully'));
            }
         })
      },

      async getListProject() {
         const userId = localStorage.getItem('_uid') as string;
         const collRef = collection(db, `tbl_project`);
         const q = query(collRef, where("userId", "==", userId));

         onSnapshot(q, querySnapshot => {
            const projectTemp: IProject[] = [];
            querySnapshot.forEach((doc) => {
               projectTemp.push(doc.data() as IProject)
            });
            this.projects = projectTemp;
         })
      }

   },
   getters: {
      /**
       * @param  {} state
       * @returns number
       */
      projectTotal(state): number {
         return state.projects.length
      }
   }

})