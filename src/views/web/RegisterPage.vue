<template>
  <div class="min-h-screen relative font-quicksand flex items-center justify-center bg-white bg-gradient-to-br dark:from-color-dark-gray-darker dark:via-color-dark-black-default dark:to-color-dark-gray-darkest py-12 px-4 sm:px-6 lg:px-8">
    <!-- State Loading -->
    <div v-if="isRegisterProcess" :class="[useBlur ? 'custom-backdrop bg-opacity-50' : 'bg-opacity-70']" class="fixed z-30 inset-0 bg-gray-600 transition-opacity flex items-center justify-center">
      <div class="flex flex-col items-center">
        <Spinner/>
        <p class="font-semibold text-white">Register process</p>
      </div>
    </div>

    <!-- main Form -->
    <div class="max-w-md with-transition w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-color-dark-gray-darker dark:text-color-gray-lighter">
          Sign Up
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-color-gray-light">
          Or
          {{ ' ' }} Already have an Account?
          <router-link to="/user/login" class="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
            Sign in
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onRegisterAction">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" v-model="auth.email" name="email" type="email" autocomplete="off" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:bg-color-dark-gray-darkest dark:border-color-gray-darkest placeholder-gray-500 text-gray-900 dark:text-color-gray-light rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="auth.password" name="password" type="password" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:bg-color-dark-gray-darkest dark:border-color-gray-darkest placeholder-gray-500 text-gray-900 dark:text-color-gray-light focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
          <div>
            <label for="confirm-password" class="sr-only">Confirm Password</label>
            <input id="confirm-password" v-model="auth.confirmPassword" name="confirm-password" type="password" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:bg-color-dark-gray-darkest dark:border-color-gray-darkest placeholder-gray-500 text-gray-900 dark:text-color-gray-light rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
          </div>
        </div>
        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Sign up
          </button>
        </div>
      </form>
    </div>

    <!-- Toggle Dark Mode -->
    <div class="absolute bottom-10 right-10">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"  v-if="theme == 'dark'" @click="togleDarkLightMode('light')" class="h-6 w-6 sm:cursor-pointer text-[#9a6fc3] hover:text-opacity-50 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" aria-hidden="true" @click="togleDarkLightMode('dark')" class="h-6 w-6 sm:cursor-pointer text-[#9a6fc3] hover:text-opacity-50 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/services/useFirebaseService';
import { useAuthStore, useStatisticStore, useTimesheetStore, useUserStore, useUtilityStore } from '@/services';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { FlagUseOn } from '@/types/EnumType';
import { isMatchPassword } from '@/utils/helperFunction';
import { LockClosedIcon } from '@heroicons/vue/solid';
import Spinner from '@/components/modal/Spinner.vue';

export default defineComponent({
   components: {
    LockClosedIcon,
    Spinner,
  },
   setup () {
      const router = useRouter();
      const authStore = useAuthStore();
      const userStore =  useUserStore();
      const statisticStore = useStatisticStore();
      const utilityStore = useUtilityStore();
      const timesheetStore = useTimesheetStore();

      const state = reactive({
         auth:{
            email: '',
            password: '',
            confirmPassword: ''
         },
         isRegisterProcess: false,
         theme: computed(()=> utilityStore.theme),
         useBlur: computed(()=> utilityStore.useBlur)
      })

      const validate = computed(()=>isMatchPassword(state.auth.password, state.auth.confirmPassword))

      const onRegisterAction = () =>{
         state.isRegisterProcess = true;

         if(validate){
            createUserWithEmailAndPassword(auth, state.auth.email, state.auth.password)
              .then((userCredential) => {
                  const user = userCredential.user;
                  /** Set User Details Data. */
                  authStore.onLoginAction(user);

                  /** Save User Details To tbl_users. */
                  userStore.onRegisterUser({userId:user.uid, email: user.email as string});

                  /** Register Statistic storage. */
                  statisticStore.registerStatistic(user.uid, FlagUseOn.REGISTRATION);

                  /** Register Timesheet storage. */
                  timesheetStore.registerTimesheet(user.uid);

                  /** Set isRegister to false and Redirect to Dashboard page. */
                  state.isRegisterProcess = false;
                  router.replace('/u/0/dashboard');
              })
              .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
    
                  authStore.$patch(state => state.error = {
                    errorCode: errorCode,
                    errorMessage: errorMessage
                  });

                  state.isRegisterProcess = false;
                  console.log(`${errorCode} => ${errorMessage}`);
              });
         }else{
           state.isRegisterProcess = false;
         }
      }

      onMounted(()=>{
        if (localStorage.getItem('_uid')) 
          router.push('/u/0/dashboard');
      })
      
      const togleDarkLightMode = (value: string): void => {
        utilityStore.setToggleTheme(value);
      };

      return {
         ...toRefs(state),
         onRegisterAction,
         togleDarkLightMode
      }
   }
})
</script>