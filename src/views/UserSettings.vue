<template>
  <div class="flex relative w-full">
   <div class="flex-1">
      <header class="card-wrapper-custom relative pt-[18px] max-w-2xl flex justify-between">
         <div class="text-color-dark-black-default dark:text-color-gray-light">
            <h1 class="text-2xl font-semibold"> {{ currentUser.fullName }}</h1>
            <p class="text-color-gray-darkest dark:text-color-gray-default mt-1.5"> {{currentUser.email}} </p>
            <p class="text-color-gray-darkest dark:text-color-gray-default mt-1.5">Joined Xsis on {{currentUser.joinAt.toLocaleString()}}</p>
            <p class="text-color-gray-darkest dark:text-color-gray-default mt-1.5">Created {{ projectTotal }} projects. <br class="sm:hidden"> Work on {{ currentUser.clients.length }} client.</p>
            <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col mt-2.5 text-sm">
              <span>Current Clients</span>
              <ul class="mt-1">
                <li v-for="client in currentUser.clients" :key="client.clientId">
                  <span  class="font-semibold text-indigo-600 dark:text-indigo-300 "> 
                    {{ client.clientName }} 
                  </span>
                </li>
              </ul>
              <span v-if="!currentUser.clients"  class="font-semibold text-indigo-600 dark:text-indigo-300 "> 
                IDLE
              </span>
            </div>
         </div>
         <div class=" flex-shrink-0">
           <img class="h-12 w-12 sm:h-36 sm:w-36 rounded-full border-color-dark-gray-lightest dark:border-color-gray-darkest shadow-sm border-2 dark:border-opacity-30" :src="currentUser.photoUrl" alt="profile-avatar" />
         </div>
         <div class="absolute p-1 text-xs dark:bg-[#9a6fc3] bg-[#a87cd1] -bottom-3 right-3 rounded text-color-gray-lightest dark:text-white shadow-lg">
           {{currentUser.roleDeveloper}}
         </div>
      </header>
      
      <div class="mt-8 mb-5">
        <p class="text-2xl font-medium dark:text-color-gray-lighter text-color-dark-gray-darker">Profile</p>
        <p class="text-sm dark:text-color-gray-default text-color-gray-darker">Your personal information</p>
      </div>
      <div class="lg:grid-cols-4 gap-5 grid w-full">
        <!-- Left Column -->
        <div class="lg:col-span-1 space-y-6">
          
          <div class="card-wrapper-custom-default overflow-hidden md:sticky top-6 max-h-48">
            <div class="text-color-dark-black-default dark:text-color-gray-lightest">
              <div class="text-color-gray-darkest w-full dark:text-color-gray-default flex flex-col text-sm">
                <button 
                  @click="switchTab(menu.current)" 
                  v-for="menu in menuTabs" :key="menu.id" 
                  :class="[currentTabs === menu.current ? 'border-indigo-600 font-semibold bg-indigo-50 dark:bg-color-gray-darkest': 'dark:hover:bg-color-gray-darkest']" 
                  type="button" 
                  class="px-4 py-2 w-full text-gray-700 dark:text-color-gray-lighter inline-flex items-center cursor-default sm:cursor-pointer border-l-4 transition-opacity border-transparent"
                >
                  {{ menu.text }}
                </button>
              </div>
            </div>
          </div>

          <div class="card-wrapper-custom md:sticky top-[7.5rem] max-h-44 pt-[18px]">
            <div class="text-color-dark-black-default dark:text-color-gray-lightest">
                <h1 class="text-lg font-medium">Appearance</h1>
                <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col mt-1 text-sm">
                    <span>Enable dark mode</span>
                      <div class="inline-flex items-center space-x-4 mt-3">
                        <button type="button" v-if="theme == 'dark'" @click="togleDarkLightMode('light')"
                          class="with-transition text-[#9a6fc3] py-2 px-4 text-xs rounded border border-[#9a6fc3]  dark:hover:bg-color-dark-gray-darkest"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span class="text-color-gray-darkest dark:text-[#9a6fc3]">Light</span>
                        </button>
                        <button v-else type="button" @click="togleDarkLightMode('dark')"
                          class="with-transition text-[#9a6fc3] py-2 px-4 text-xs rounded border border-[#9a6fc3] hover:bg-[#f0e7f8]"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                          <span>Dark</span>
                        </button>
                        <p v-if="theme === 'dark'" class="text-color-gray-light">Dark theme enabled.</p>
                        <p v-else class="text-color-dark-gray-darker">Light theme enabled.</p>
                    </div>
                </div>
            </div>
          </div>

          <div class="card-wrapper-custom md:sticky top-[18.5rem] h-auto pt-[18px]">
            <div class="text-color-dark-black-default dark:text-color-gray-lightest">
                <h1 class="text-lg font-medium">Connected accounts</h1>
                <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col mt-1 text-sm">
                    <span>Connect your Atrium account to Google providers to make logging in easier.</span>
                      <div class="inline-flex items-center space-x-4 mt-3">
                        <button @click="loginWithGoogle" type="button" class="">
                          <GoogleIcon class="w-7 mr-2"/>
                        </button>
                        <p class="text-color-dark-gray-darker dark:text-color-gray-light">Not connected</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-3 space-y-6">
          <GeneralProfileInfo v-if="currentTabs === 'General'"/>
          <CredentialProfileInfo v-else/>
        </div>
      </div>
   </div>
</div>

</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import CredentialProfileInfo from "../components/CredentialProfileInfo.vue";
import GeneralProfileInfo from "../components/GeneralProfileInfo.vue";
import GoogleIcon from "../components/svg/GoogleIcon.vue";
import { useProjectStore, useUserStore, useUtilityStore } from '../services';

export default defineComponent({
  components: { GeneralProfileInfo, GoogleIcon, CredentialProfileInfo},
  setup() {
    const utilityStore = useUtilityStore();
    const projectStore = useProjectStore();
    const userStore = useUserStore();

    const state = reactive({
      projectTotal: computed(()=> projectStore.projectTotal),
      theme: computed(()=> utilityStore.theme),
      currentUser: computed(()=> userStore.currentUser),
      menuTabs:[
        {
          id: 1,
          current: 'General',
          text: 'General'
        },
        {
          id: 2,
          current: 'Credential',
          text: 'Credential'
        },
      ],
      currentTabs: 'General'
    })

    const togleDarkLightMode = (value: string): void => {
      utilityStore.setToggleTheme(value);
    };

    const loginWithGoogle = () => {
      console.log("loginWithGoogle on Dev");
    }

    const switchTab = (current: string): void => {
      state.currentTabs = current;
    }

    return {
      ...toRefs(state),
      togleDarkLightMode,
      loginWithGoogle,
      switchTab
    };
  },
});
</script>
