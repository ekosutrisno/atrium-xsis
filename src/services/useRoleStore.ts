import { collection, doc, getDocs, setDoc } from "@firebase/firestore";
import { defineStore } from "pinia";
import { IMainRole, IRoleDeveloper } from "../types/InterfaceType";
import { db } from "./useFirebaseService";

interface RoleStoreState {
   mainRole: IMainRole[]
   developerRole: IRoleDeveloper[]
}

export const useRoleStore = defineStore('useRoleStore', {
   state: (): RoleStoreState => ({
      mainRole: [] as IMainRole[],
      developerRole: [] as IRoleDeveloper[]
   }),

   actions: {
      /**
       * Get All Main role in admin actions
       */
      async getAllMainRole() {
         const mainRoleRef = collection(db, 'tbl_main_role');
         getDocs(mainRoleRef)
            .then((snapshot) => {
               const tempMainRole: IMainRole[] = [];

               snapshot.forEach(mainRole => {
                  tempMainRole.push(mainRole.data() as IMainRole);
               })

               this.mainRole = tempMainRole;
            })
      },

      /**
       * Get All Developer role in admin actions
       */
      async getAllDeveloperRole() {
         const devRoleRef = collection(db, 'tbl_developer_role');
         getDocs(devRoleRef)
            .then((snapshot) => {
               const tempDevRole: IRoleDeveloper[] = [];

               snapshot.forEach(deRole => {
                  tempDevRole.push(deRole.data() as IRoleDeveloper);
               })

               this.developerRole = tempDevRole;
            })
      },

      /**
       * @returns Promise
       * Insert Initial Main Role to Database
       */
      async insertInitMainRole(): Promise<void> {
         // Database Ref
         const dbRefColl = collection(db, 'tbl_main_role');

         // Payload Data
         const roles: IMainRole[] = [
            {
               roleId: 1,
               isActive: true,
               roleName: 'Admin',
               roleDescription: 'Role as Admin'
            },
            {
               roleId: 2,
               isActive: true,
               roleName: 'Director',
               roleDescription: 'Role as Director'
            },
            {
               roleId: 3,
               isActive: true,
               roleName: 'Manager',
               roleDescription: 'Role as Manager'
            },
            {
               roleId: 4,
               isActive: true,
               roleName: 'Human Resource',
               roleDescription: 'Role as Human Resource'
            },
            {
               roleId: 5,
               isActive: true,
               roleName: 'Employee Relation Officer',
               roleDescription: 'Role as Employee Relation Officer'
            },
            {
               roleId: 6,
               isActive: true,
               roleName: 'Employee',
               roleDescription: 'Role as Employee'
            },
         ]

         // Get All and Check if Data already exist
         getDocs(dbRefColl)
            .then((snapshot) => {

               // If Not exist insert
               if (snapshot.empty)
                  roles.forEach(async role =>
                     await setDoc(doc(db, 'tbl_main_role', role.roleId.toString()), role)
                  )
            })
      },

      /**
       * @returns Promise
       * Insert Initial Developer Role to Database
       */
      async insertInitDeveloperRole(): Promise<void> {
         // Database Ref
         const dbRef = collection(db, 'tbl_developer_role');

         // Payload Data
         const roles: IRoleDeveloper[] = [
            {
               roleDeveloperId: 1,
               roleDeveloperName: 'Java Developer',
               roleDeveloperDesc: 'Role as Java Developer',
               roleDeveloperSalary: 'Rp5000K',
            },
            {
               roleDeveloperId: 2,
               roleDeveloperName: '.NET Developer',
               roleDeveloperDesc: 'Role as .NET Developer',
               roleDeveloperSalary: 'Rp5000K',
            },
            {
               roleDeveloperId: 3,
               roleDeveloperName: 'PHP Developer',
               roleDeveloperDesc: 'Role as PHP Developer',
               roleDeveloperSalary: 'Rp5000K',
            },
            {
               roleDeveloperId: 4,
               roleDeveloperName: 'ETL Developer',
               roleDeveloperDesc: 'Role as ETL Developer',
               roleDeveloperSalary: 'Rp5000K',
            },
            {
               roleDeveloperId: 5,
               roleDeveloperName: 'Javascript',
               roleDeveloperDesc: 'Role as Javascript Developer',
               roleDeveloperSalary: 'Rp5000K',
            },
            {
               roleDeveloperId: 6,
               roleDeveloperName: 'Android Developer',
               roleDeveloperDesc: 'Role as .NET Developer',
               roleDeveloperSalary: 'Rp5000K',
            },
            {
               roleDeveloperId: 7,
               roleDeveloperName: 'Employee Relation Officer',
               roleDeveloperDesc: 'Role as Employee Relation Officer Developer',
               roleDeveloperSalary: 'Rp8000K',
            },
            {
               roleDeveloperId: 8,
               roleDeveloperName: 'On Bootcamp',
               roleDeveloperDesc: 'Role as Bootcamp former',
               roleDeveloperSalary: 'Rp100K / Day',
            },
            {
               roleDeveloperId: 9,
               roleDeveloperName: 'On Idle',
               roleDeveloperDesc: 'Role as Idle former',
               roleDeveloperSalary: 'Rp170K / Day',
            },
            {
               roleDeveloperId: 10,
               roleDeveloperName: 'Worker',
               roleDeveloperDesc: 'Role as Worker',
               roleDeveloperSalary: 'Rp0',
            },
         ]

         // Get All and Check if Data already exist
         getDocs(dbRef)
            .then((snapshot) => {

               // If Not exist insert
               if (snapshot.empty)
                  roles.forEach(async role => {
                     await setDoc(doc(db, 'tbl_developer_role', role.roleDeveloperId.toString()), role);
                  })
            })
      },

      async addMainRole(mainRole: IMainRole) {

      },

      async updateMainRole(mainRole: IMainRole) {

      },

      async addDeveloperRole(devRole: IRoleDeveloper) {

      },

      async updateDeveloperRole(devRole: IRoleDeveloper) {

      },

      /**
       * Init Calling insertInitMainRole() and  insertInitDeveloperRole()
       */
      async init() {
         await this.insertInitMainRole();
         await this.insertInitDeveloperRole();
      }
   }
})