import { defineStore } from 'pinia';
import { ref, onValue } from "firebase/database";
import { auth, dbRealtime } from './useFirebaseService';
import { useUserStore } from '.';

interface UtilityStoreState {
   theme: string,
   useBlur: boolean,
   isOnEditUserData: boolean,
   isOnEditAddressData: boolean,
   isOnEditAddressDataAsli: boolean,
   isOffline: boolean
}

export const useUtilityStore = defineStore('useUtilityStore', {
   state: (): UtilityStoreState => ({
      theme: '',
      useBlur: localStorage.getItem('blur') === 'true' ? true : false,
      isOnEditUserData: false,
      isOnEditAddressData: false,
      isOnEditAddressDataAsli: false,
      isOffline: false
   }),
   actions: {
      /**
       * @param  {string} theme
       * @returns void
       * @description change and update theme reference dark/light
       */
      setToggleTheme(theme: string): void {
         localStorage.setItem('theme', theme);
         this.theme = theme;

         // This will update theme user preference
         const userStore = useUserStore();
         userStore.currentUser.userPreference.useThemeMode = theme;
         userStore.updateUserPreference(auth.currentUser?.uid as string, userStore.currentUser.userPreference);

         if (theme == 'dark') {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark')
         }
         else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light')
         }
      },

      /**
       * @returns void
       * @description for handling and check first time user theme reference
       */
      wathcThemeSelected(): void {
         if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            this.theme = 'dark';
         } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            this.theme = 'light';
         }
      },

      /**
       * @param  {boolean} value
       * @returns void
       * @description toggle state if on Edit
       */
      toggleIsOnEdit(value: boolean): void {
         this.isOnEditUserData = value;
      },

      /**
       * @description togle for useBlur or not
       */
      toggleBlur() {
         var info = '';
         if (localStorage.getItem('blur') === 'true') {
            this.useBlur = false;
            localStorage.setItem('blur', 'false');
            info = 'inactive'
         } else {
            this.useBlur = true;
            localStorage.setItem('blur', 'true');
            info = 'active'
         }
      },

      /**
       * @param  {{value:boolean} payload
       * @param  {boolean}} isDomisili
       * @returns void
       * @description state for editAddress action
       */
      toggleIsOnEditAddress(payload: { value: boolean, isDomisili: boolean }): void {
         payload.isDomisili
            ? this.isOnEditAddressData = payload.value
            : this.isOnEditAddressDataAsli = payload.value

      },

      checkConnectifity() {
         const connectedRef = ref(dbRealtime, ".info/connected");
         onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
               this.isOffline = false;
               localStorage.setItem('_connected', 'true');
            } else {
               this.isOffline = true;
               localStorage.setItem('_connected', 'false');
            }
         });
      }
   },
})