<template>
  <div class="flex relative w-full">
   <div class="flex-1">
      <header class="p-4 relative pt-[18px] max-w-2xl flex justify-between bg-color-gray-lightest dark:bg-color-dark-gray-darker shadow-sm sm:shadow-md dark:shadow-xl rounded-lg">
         <div class="text-color-dark-black-default dark:text-color-gray-light">
            <h1 class="text-2xl font-semibold">Eko Sutrisno</h1>
            <p class="text-color-gray-darkest dark:text-color-gray-default mt-1.5">eko.sutrisno@xsis.co.id</p>
            <p class="text-color-gray-darkest dark:text-color-gray-default mt-1.5">Joined Xsis on Jan 11, 2020 <span class="hidden sm:inline"> (1.5 years ago)</span></p>
            <p class="text-color-gray-darkest dark:text-color-gray-default mt-1.5">Created {{ projectTotal }} projects. <br class="sm:hidden"> Placement on 1 client.</p>
            <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col mt-2.5 text-sm">
              <span>Placement in </span>
              <span class="font-semibold text-indigo-500 dark:text-indigo-300 ">PT Azec Indonesia Management Services</span>
            </div>
         </div>
         <div class=" flex-shrink-0">
           <img class="h-12 w-12 sm:h-36 sm:w-36 rounded-full border-color-dark-gray-lightest dark:border-color-gray-darkest shadow-sm border-2 dark:border-opacity-30" src="https://res.cloudinary.com/ekosutrisno/image/upload/v1625803063/avatars/MyAvatar_taylrm.png" alt="profile-avatar" />
         </div>
         <div class="absolute p-1 text-xs bg-[#d3adf7] -bottom-3 right-3 rounded text-white shadow-lg">
           Java Developer
         </div>
      </header>
      
        <div class="mt-8 mb-5">
          <h3 class="text-2xl font-medium dark:text-color-gray-lighter text-color-dark-gray-darker">Profile</h3>
          <p class="text-sm dark:text-color-gray-default text-color-gray-darker">Your personal information</p>
        </div>
      <div class="md:grid-cols-3 gap-5 grid w-full">
        <header class="p-4 h-auto md:col-span-1 relative pt-[18px] flex justify-between bg-color-gray-lightest dark:bg-color-dark-gray-darker shadow-sm sm:shadow-md dark:shadow-xl rounded-lg">
          <div class="text-color-dark-black-default dark:text-color-gray-light">
              <h1 class="text-lg font-semibold">Appearance</h1>
              <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col mt-2.5 text-sm">
                  <span>Enable dark mode</span>
                    <div class="inline-flex items-center space-x-4 mt-3">
                      <button type="button" v-if="theme == 'dark'" @click="togleDarkLightMode('light')"
                        class="text-[#d3adf7] py-2 px-4 text-xs rounded border-color-gray-light dark:border-color-gray-darkest dark:hover:bg-color-dark-gray-darkest border"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>Light</span>
                      </button>
                      <button v-else type="button" @click="togleDarkLightMode('dark')"
                        class="text-[#d3adf7] py-2 px-4 text-xs rounded border-gray-300 border-opacity-75 dark:border-color-gray-darkest dark:hover:bg-color-dark-gray-darkest border"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <span>Dark</span>
                      </button>
                      <p class="text-color-gray-light" v-if="theme == 'dark'">Dark theme enabled.</p>
                      <p class="text-color-dark-gray-darker" v-else>Light theme enabled.</p>
                  </div>
              </div>
          </div>
        </header>
        <header class="p-4 h-auto md:col-span-2 relative pt-[18px] flex justify-between bg-color-gray-lightest dark:bg-color-dark-gray-darker shadow-sm sm:shadow-md dark:shadow-xl rounded-lg">
          <div class="text-color-dark-black-default dark:text-color-gray-light">
              <h1 class="text-lg font-semibold">Personal information</h1>
               <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col mt-2.5 text-sm">
                <span>Placement in </span>
                <span class="font-semibold text-indigo-500 dark:text-indigo-300 ">PT Azec Indonesia Management Services</span>
              </div>
          </div>
          <div class="absolute top-2 right-2 flex-shrink-0">
            <img class="h-16 w-16 rounded-full border-color-dark-gray-lightest dark:border-color-gray-darkest shadow-sm border-2 dark:border-opacity-30" src="https://res.cloudinary.com/ekosutrisno/image/upload/v1625803063/avatars/MyAvatar_taylrm.png" alt="profile-avatar" />
          </div>
        </header>
      </div>
   </div>
   <button type="button" class="p-3.5 sm:hidden fixed right-5 shadow-xl bottom-[4.5rem] cursor-default text-color-gray-light rounded-full hover:bg-indigo-500 bg-indigo-400">
     <svg xmlns="http://www.w3.org/2000/svg" area-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
   </button>
</div>

</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useProjectStore } from "../services/useProjectStore";
import { useUtilityStore } from "../services/useUtilityStore";

export default defineComponent({
  setup() {
    const utilityStore = useUtilityStore();
    const projectStore = useProjectStore();

    const state = reactive({
      projectTotal: computed(()=> projectStore.projectTotal),
      theme: computed(()=> utilityStore.theme)
    })

    const togleDarkLightMode = (value: string): void => {
      utilityStore.setTheme(value);
    };

    return {
      ...toRefs(state),
      togleDarkLightMode
    };
  },
});
</script>
