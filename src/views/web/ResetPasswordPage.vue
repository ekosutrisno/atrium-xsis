<template>
  <div class="min-h-screen relative font-quicksand flex items-center justify-center bg-white bg-gradient-to-br dark:from-color-dark-gray-darker dark:via-color-dark-black-default dark:to-color-dark-gray-darkest py-12 px-4 sm:px-6 lg:px-8">
     <img 
      aria-hidden="true" 
      class="hidden lg:block object-cover absolute inset-0 opacity-5" 
      src="https://www.gstatic.com/mobilesdk/200303_mobilesdk/ML_fore@2x.png" 
      alt="img"
    >
    
    <!-- main Form -->
    <div class="max-w-md z-30 with-transition w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-color-dark-gray-darker dark:text-color-gray-lighter">
          Reset Password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-color-gray-light">
            Will send email reset password or 
           <router-link to="/user/login" class="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
            Back to login
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSendEmailVerification">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" v-model="auth.email" name="email" type="email" autocomplete="off" required="true" class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:bg-color-dark-gray-darkest dark:border-color-gray-darkest placeholder-gray-500 text-gray-900 dark:text-color-gray-light rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
            <p v-if="isEmailNotRegisterd" class="text-red-400 text-sm my-3">Email is not registered, please fill in your registered email.</p>
          </div>
        </div>
        <div>
          <button type="submit" :disabled="!isValidEmail" class="group relative disabled:bg-opacity-25 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Send email
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useAuthStore, useUtilityStore } from "../../services";
import { validateEmail } from "../../utils/helperFunction";

export default defineComponent({
  setup() {
    
    const utilityStore = useUtilityStore();
    const authStore = useAuthStore();
      const state = reactive({
         auth:{
            email: ''
         },
         isSendProcess: false,
         isEmailNotRegisterd: computed(()=> authStore.emailNotRegiter),
         theme: computed(()=> utilityStore.theme),
         useBlur: computed(()=> utilityStore.useBlur)
      })

      const onSendEmailVerification = () => {
        
        state.isSendProcess = true;

        if(validateEmail(state.auth.email)){
          authStore
            .sendPasswordResetEmail(state.auth.email)
            .then(()=> {
              state.isSendProcess = false;
              state.auth.email = '';
            })
        }

        setTimeout(() => {
          state.isSendProcess = false;
        }, 3000);
      }

      const isValidEmail = computed(()=> validateEmail(state.auth.email));

    return {
      ...toRefs(state),
      isValidEmail,
      onSendEmailVerification
    };
  },
});
</script>