import { defineStore } from 'pinia';
import { IUser } from '../types/InterfaceType';
import { currentUser } from '../utils/mockDataAPI';

export const useUserStore = defineStore({
   id: 'useUserStore',
   state: () => ({
      currentUser: currentUser
   }),
   getters: {
      /**
       * @param  {} state
       * @returns IUser.photoUrl
       */
      getPhotoUrl(state): IUser['photoUrl'] {
         return state.currentUser.photoUrl;
      },
      
      /**
       * @param  {} state
       * @returns IUser.clients
       */
      getUserClient(state): IUser['clients'] {
         return state.currentUser.clients;
      }
   }
})