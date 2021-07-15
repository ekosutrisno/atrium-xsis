import { defineStore } from 'pinia'

export const useUtilityStore = defineStore({
   id: 'useUtilityStore',
   state: () => ({
      theme: '',
   }),
   actions: {
      setTheme(theme: string) {
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
      wathThemeSelected() {
         var classList = localStorage.getItem('theme');
         document.documentElement.classList.add(classList ? classList : 'light')
      }
   },
})