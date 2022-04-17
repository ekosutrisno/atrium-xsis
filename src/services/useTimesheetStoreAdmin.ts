import { ITimesheet, IUser } from "@/types/InterfaceType";
import { collection, doc, getDocs } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "./useFirebaseService";

export interface TimesheetStoreAdminState {
    timesheetNeedApprovalList: Array<any>,
    timesheetItems: Array<ITimesheet>
}

export const useTimesheetStoreAdmin = defineStore('useTimesheetStoreAdmin', {

    state: (): TimesheetStoreAdminState => ({
        timesheetNeedApprovalList: [],
        timesheetItems: []
    }),

    actions: {
        listAll() {
            const userId = localStorage.getItem('_uid') as string
            const dbRefsEro = doc(db, 'tbl_timesheet', userId)
            const dbRefsCollections = collection(dbRefsEro, 'tbl_emp_timesheet');

            getDocs(dbRefsCollections)
                .then(snapshot => {
                    const tempList: any = [];

                    snapshot.forEach(timesheet => {
                        tempList.push(timesheet.data());
                    })

                    this.timesheetNeedApprovalList = tempList;
                })
        },

        getTimesheetByUserId(employeeId: IUser['userId']) {
            const userId = localStorage.getItem('_uid') as string
            const dbRefsEro = doc(db, 'tbl_timesheet', userId)
            const dbRefsCollections = collection(dbRefsEro, 'tbl_emp_timesheet');

            const specificUserRef = doc(dbRefsCollections, employeeId)

            getDocs(collection(specificUserRef, 'PS-2022-04-16'))
                .then((snapshot) => {
                    const timesheets: Array<ITimesheet> = [];

                    snapshot.forEach((ts) => {
                        timesheets.push(ts.data() as ITimesheet);
                    })

                    this.timesheetItems = timesheets;
                })

        }
    }
})