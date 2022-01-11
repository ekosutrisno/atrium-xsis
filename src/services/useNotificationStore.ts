import { defineStore } from "pinia";
import { Notification } from "../types/InterfaceType";

interface NotificationStoreState {
    notifications: Notification[],
    selectedNotification: Notification | null
}

export const useNotificationStore = defineStore('useNotificationStore', {
    state: (): NotificationStoreState => ({
        notifications: [
            {
                type: 'job',
                data: 'Your job apply on review',
                text: 'Job Notification',
                timestamp: 1641864022298
            },
            {
                type: 'job',
                data: 'Your CV has been downloaded',
                text: 'Job Notification',
                timestamp: 1641864022298
            }
        ],
        selectedNotification: null
    })
})