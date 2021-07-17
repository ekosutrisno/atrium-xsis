import { defineStore } from 'pinia';
import { currentUser } from '../utils/mockDataAPI';

export const useUserStore = defineStore({
   id: 'useUserStore',
   state: () => ({
      currentUser: currentUser
   }),
   getters: {
      getPhotoUrl(state) {
         return state.currentUser.photoUrl;
      }
   }
})