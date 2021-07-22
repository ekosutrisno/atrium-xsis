import { defineStore } from 'pinia'

export const useUtilityStore = defineStore({
   id: 'useUtilityStore',
   state: () => ({
      theme: '',
      isLoggedIn: false,
      isOnEditUserData: false,
      isOnEditAddressData: false,
      isOnEditAddressDataAsli: false
   }),
   actions: {
      setToggleTheme(theme: string): void {
         localStorage.setItem('theme', theme);
         this.theme = theme;

         if (theme == 'dark') {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark')
         }
         else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light')
         }
      },
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

      toggleIsOnEdit(value: boolean): void {
         this.isOnEditUserData = value;
      },

      toggleIsOnEditAddress(payload: { value: boolean, isDomisili: boolean }): void {
         payload.isDomisili
            ? this.isOnEditAddressData = payload.value
            : this.isOnEditAddressDataAsli = payload.value

      }
   },
})