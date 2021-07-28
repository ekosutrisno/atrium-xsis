<template>
  <div class="min-h-screen font-quicksand flex items-center justify-center bg-white bg-gradient-to-br dark:from-color-dark-gray-darker dark:via-color-dark-black-default dark:to-color-dark-gray-darkest py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-color-dark-gray-darker dark:text-color-gray-lighter">
          Login
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-color-gray-light">
          Or
          {{ ' ' }} Not register yet?
          <router-link to="/user/register" class="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
            Create an Account
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onLoginAction">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" v-model="auth.email" name="email" type="email" autocomplete="email" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:bg-color-dark-gray-darkest dark:border-color-gray-darkest placeholder-gray-500 text-gray-900 dark:text-color-gray-light rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="auth.password" name="password" type="password" autocomplete="current-password" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:bg-color-dark-gray-darkest dark:border-color-gray-darkest placeholder-gray-500 text-gray-900 dark:text-color-gray-light rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 border-gray-300 rounded" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-indigo-400">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { LockClosedIcon } from '@heroicons/vue/solid';
import { useAuthStore } from '../services';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useToast } from 'vue-toastification';
import { auth } from '../services/useFirebaseService';

export default defineComponent({
   components: {
    LockClosedIcon,
  },
   setup () {
      const router = useRouter();
      const authStore = useAuthStore();
      const toast = useToast();

      const state = reactive({
         auth:{
            email: '',
            password: ''
         }
      })

      const onLoginAction = () =>{
        
        signInWithEmailAndPassword(auth, state.auth.email, state.auth.password)
          .then((userCredential) => {
              router.replace('/u/0/dashboard');
              const user = userCredential.user;
              authStore.onLoginAction(user);
              toast.success("You succesfuly logged in " + user.email);
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;

              authStore.$patch(state => state.error = {
                errorCode: errorCode,
                errorMessage: errorMessage
              });

              console.log(`${errorCode} => ${errorMessage}`);
          });
      }

      onMounted(()=>{
        if (localStorage.getItem('_uid')) 
          router.push('/u/0/dashboard');
      })
      

      return {
         ...toRefs(state),
         onLoginAction
      }
   }
})
</script>