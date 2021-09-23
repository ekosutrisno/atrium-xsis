<template>
  <div class="flex relative w-full pb-10">
   <div class="flex-1">
      <header class="card-wrapper-custom relative pt-[18px] max-w-2xl flex flex-col-reverse sm:flex-row sm:justify-between">
         <div class="text-color-dark-black-default dark:text-color-gray-light">
            <h1 class="text-2xl inline-flex font-semibold"> 
              {{ currentUser.fullName }}
              <span :class="[currentUser.isActive == true ? 'text-green-400' : 'text-gray-400']">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </span>
            </h1>
            <p class="text-color-gray-darkest dark:text-color-gray-default mt-1.5"> {{currentUser.email}} </p>
            <p class="text-color-gray-darkest dark:text-color-gray-default mt-1.5">Joined on {{formatDateWithMonth(currentUser.joinAt)}} ({{formatDateFromNow(currentUser.joinAt)}})</p>
            <p class="text-color-gray-darkest dark:text-color-gray-default mt-1.5">Created {{ projectTotal }} projects. <br class="sm:hidden"> Work on {{ currentUser.clients.length }} client.</p>
            <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col mt-4 text-sm">
              <span>Current Clients</span>
              <ul class="mt-1">
                <li v-for="client in currentUser.clients" :key="client.clientId">
                  <span  class="font-semibold text-indigo-600 dark:text-indigo-300 "> 
                    {{ client.clientName }} 
                  </span>
                </li>
              </ul>
              <span v-if="!currentUser.clients.length"  class="font-semibold text-indigo-600 dark:text-indigo-300 "> 
                __LOADING__
              </span>
            </div>
         </div>
         <div class="flex-shrink-0 relative h-36 w-36 rounded-full overflow-hidden">
           <label for="file-upload" @click="onUpdateAvatar" class="absolute inset-0 flex items-center justify-center bg-gray-900 group bg-opacity-0 hover:bg-opacity-30">
             <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8 md:cursor-pointer text-transparent group-hover:text-indigo-100 text-opacity-0 hover:text-opacity-100 transition-al" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
             </svg>
           </label>
            <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="onUpdateAvatar">
           <img class="h-36 w-36 rounded-full border-color-dark-gray-lightest dark:border-color-gray-darkest shadow-sm border-2 dark:border-opacity-30" :src="currentUser.photoUrl" alt="profile-avatar" />
         </div>
         <div class="absolute p-1 text-xs dark:bg-[#9a6fc3] bg-[#a87cd1] font-semibold -bottom-3 right-3 rounded text-color-gray-lightest dark:text-white shadow-lg">
           {{currentUser.roleDeveloper.roleDeveloperName }}
         </div>
      </header>
      
      <div class="mt-8 mb-5">
        <p class="text-2xl font-medium dark:text-color-gray-lighter text-color-dark-gray-darker">Profile</p>
        <p class="text-sm dark:text-color-gray-default text-color-gray-darker">Your personal information</p>
      </div>
      <div class="lg:grid-cols-4 gap-5 grid w-full">
        <!-- Left Column -->
        <div class="lg:col-span-1 space-y-6">
          
          <!-- Switch Tabs -->
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

          <!-- Appearance -->
          <div class="card-wrapper-custom md:sticky top-[9.75rem] max-h-auto pt-[18px]">
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
                <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col mt-3 text-sm">
                    <span>Use blur effect</span>
                    <div class="flex items-start mt-2">
                      <div class="flex items-center h-5">
                        <input id="use-blur" @change="useBlurToggle" v-model="useBlur" name="use-blur" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest rounded" />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="use-blur" class="font-medium text-gray-700 dark:text-color-dark-gray-lighter">Use Blur</label>
                      </div>
                    </div>
                </div>
            </div>
          </div>

          <!-- Connected Account -->
          <div class="card-wrapper-custom md:sticky top-[24.75rem] h-auto pt-[18px]">
            <div class="text-color-dark-black-default dark:text-color-gray-lightest">
                <h1 class="text-lg font-medium">Connected accounts</h1>
                <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col mt-1 text-sm">
                    <span>Your current logging provider.</span>
                      <div v-if="providedId === 'google'" class="inline-flex items-center space-x-4 mt-3">
                        <button @click="loginWithGoogle" type="button" class="">
                          <GoogleIcon class="w-7 mr-2"/>
                        </button>
                        <p class="text-color-dark-gray-darker dark:text-color-gray-light uppercase font-semibold"> {{ providedId ? providedId : 'Not connected' }} </p>
                      </div>
                      <div v-if="providedId === 'firebase'" class="inline-flex items-center space-x-4 mt-3">
                        <button @click="loginWithGoogle" type="button" class="">
                          <img alt="firebase" src="/firebase.png" width="28" height="28" />
                        </button>
                        <p class="text-color-dark-gray-darker dark:text-color-gray-light uppercase font-semibold"> {{ providedId ? providedId : 'Not connected' }} </p>
                    </div>
                </div>
            </div>
          </div>
          
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-3 space-y-6">
          <GeneralProfileInfo v-if="currentTabs === 'General'"/>
       
          <!-- Current Ero and Client Detail -->
          <div v-else-if="currentTabs === 'Ero_Client'" class="space-y-6">
            <div v-if="!currentUser.isEro" class="card-wrapper-custom with-transition max-h-full pt-[18px]">
                <div class="border-b relative p-2 border-gray-200 dark:border-color-gray-darkest">
                    <h3 class="text-lg leading-6 font-medium text-color-dark-gray-darkest dark:text-color-gray-lighter">
                        Current ERO
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-color-gray-default">
                        Your current ERO details info
                    </p>
                  </div>
                <div v-if="currentEro !== null" class="text-color-dark-black-default mt-2 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between dark:text-color-gray-lightest">
                    <div class="text-color-gray-darkest p-2 dark:text-color-gray-default flex flex-col mt-1 space-y-2">
                        <div class="flex flex-col">
                          <p class="text-sm">FullName</p>
                          <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ currentEro.fullName}}</p>
                        </div>
                        <div class="flex flex-col">
                          <p class="text-sm">Email</p>
                          <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ currentEro.email }}</p>
                        </div>
                        <div class="flex flex-col">
                          <p class="text-sm">Contact</p>
                          <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ currentEro.telephone }}</p>
                        </div>
                    </div>
                    <img class="h-36 w-36 rounded-full border-color-dark-gray-lightest dark:border-color-gray-darkest shadow-sm border-2 dark:border-opacity-30" :src="currentEro.eroImageAvatar" alt="profile-avatar" />
                </div>
                <div v-else>
                  <p class="my-3 ml-2 max-w-2xl text-sm text-gray-500 dark:text-color-gray-default">
                    Currently you do not have an ERO, please contact the officer for more info.
                  </p>
                </div>
            </div>
            <div v-if="currentUser.clients" class="card-wrapper-custom with-transition max-h-full pt-[18px]">
                <div class="border-b relative p-2 border-gray-200 dark:border-color-gray-darkest">
                    <h3 class="text-lg leading-6 font-medium text-color-dark-gray-darkest dark:text-color-gray-lighter">
                        Current Clients
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-color-gray-default">
                        Your current Clients details info
                    </p>
                  </div>
                <div class="text-color-gray-darkest dark:text-color-gray-default flex flex-col text-sm">
                  <ul v-if="currentUser.clients.length" class="space-y-3">
                    <li v-for="client in currentUser.clients" :key="client.clientId">
                        <div class="flex items-center w-full my-2">
                          <div class="flex-none p-2 text-color-gray-darkest dark:text-color-gray-light">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                          </div>
                          <div class="flex flex-col flex-1 w-full">
                              <span  class="font-semibold transition-colors text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-400 sm:cursor-pointer"> 
                                {{ client.clientName }} 
                              </span>
                              <span class="text-xs">
                                {{ client.clientAddress }}, {{ client.clientProvinsi }}, {{ client.clientCountry }}.
                              </span>
                          </div>
                        </div>
                    </li>
                  </ul>
                  <div v-else class="flex items-center w-full mt-2">
                    <div class="flex-none p-2 text-color-gray-darkest dark:text-color-gray-light">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-color-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div class="flex flex-col flex-1 w-full">
                        <span  class="font-semibold transition-colors text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-400 sm:cursor-pointer"> 
                          __Loading__ 
                        </span>
                        <span class="text-xs">
                          Proccess to fetching data
                        </span>
                    </div>
                  </div>
              </div>
            </div>
          </div>

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
import { formatDateFromNow, formatDateWithMonth } from '../utils/helperFunction';
import { useAuthStore, useProjectStore, useUserStore, useUtilityStore } from '../services';
import { useToast } from "vue-toastification";

export default defineComponent({
  components: { GeneralProfileInfo, GoogleIcon, CredentialProfileInfo},
  setup() {
    const utilityStore = useUtilityStore();
    const projectStore = useProjectStore();
    const userStore = useUserStore();
    const authStore = useAuthStore();
    const toast = useToast();

    const state = reactive({
      projectTotal: computed(()=> projectStore.projectTotal),
      theme: computed(()=> utilityStore.theme),
      useBlur: localStorage.getItem('blur') == 'true' ? true : false,
      currentUser: computed(()=> userStore.currentUser),
      currentEro: computed(()=> userStore.currentEro),
      providedId: computed(()=> authStore.currentUserSession.providedId),
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
        {
          id: 3,
          current: 'Ero_Client',
          text: 'Ero and Client'
        },
      ],
      currentTabs: 'General',
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

    const useBlurToggle = () => {
      utilityStore.toggleBlur();
    }

    const onUpdateAvatar = (event: any) => {
      if (event.target.files && event.target.files[0]) {
        const fileType = event.target.files[0].type.toString();
        if(fileType.indexOf('image') != 0){
            alert('Please Choose an Image')
            return;
        }
        var newPhotoObject = event.target.files[0];
        if(newPhotoObject.size > 2097152){
           toast.warning(`Max photo size is 2Mb!`);
        }else{
          // Set Preview
          state.currentUser.photoUrl = URL.createObjectURL(newPhotoObject);
  
          // Realtime updated
          userStore.updateFotoProfile(newPhotoObject, state.currentUser.userId);
        }

      }
    }

    return {
      ...toRefs(state),
      togleDarkLightMode,
      useBlurToggle,
      loginWithGoogle,
      switchTab,
      onUpdateAvatar,
      formatDateFromNow,
      formatDateWithMonth
    };
  },
});
</script>
