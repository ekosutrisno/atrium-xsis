import { defineStore } from "pinia";

export const useAuthStore = defineStore({
   id: 'useAuthStore',
   state:()=>({
      isLoggedIn: true,
      currentUserSession: null
   }),
   actions:{
      async onLoginAction(payload: {email: string, password: string}){
         console.log(payload);
      }
   }
})