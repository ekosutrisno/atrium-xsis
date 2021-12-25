<template>
 <div class="min-h-screen relative font-quicksand flex items-center justify-center bg-white bg-gradient-to-br dark:from-color-dark-gray-darker dark:via-color-dark-black-default dark:to-color-dark-gray-darkest py-12 px-4 sm:px-6 lg:px-8">
     <img 
      aria-hidden="true" 
      class="hidden lg:block object-cover absolute inset-0 opacity-5" 
      src="https://www.gstatic.com/mobilesdk/200303_mobilesdk/ML_fore@2x.png" 
      alt="img"
    >

    <!-- main Form -->
    <div class="max-w-md z-30 w-full with-transition space-y-8">
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
      <form class="mt-8 space-y-6" @submit.prevent="confirmPasswordResetAction">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="new-password" class="sr-only">New Password</label>
            <input id="new-password" v-model="auth.newPassword" name="new-password" type="password" autocomplete="off" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:bg-color-dark-gray-darkest dark:border-color-gray-darkest placeholder-gray-500 text-gray-900 dark:text-color-gray-light rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="New password" />
            <p  class="hidden text-red-400 text-sm my-3">Email is not registered, please fill in your registered email.</p>
          </div>
          <div>
            <label for="new-confrim-password" class="sr-only">New Password Confirm</label>
            <input id="new-confrim-password" v-model="auth.newConfirmPassword" name="new-confrim-password" type="password" autocomplete="off" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:bg-color-dark-gray-darkest dark:border-color-gray-darkest placeholder-gray-500 text-gray-900 dark:text-color-gray-light rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm new password" />
            <p  class="hidden text-red-400 text-sm my-3">Email is not registered, please fill in your registered email.</p>
          </div>
        </div>
        <div>
          <button type="submit" :disabled="!isValidPassword" class="group relative disabled:bg-opacity-25 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { confirmPasswordReset, verifyPasswordResetCode } from "@firebase/auth";
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../../services";
import { auth } from "../../services/useFirebaseService";
import { isMatchPassword } from "../../utils/helperFunction";

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const { mode, oobCode } = route.query;

    const state = reactive({
      auth: {
        newPassword: '',
        newConfirmPassword: ''
      }
    })

    const isValidPassword = computed(()=> isMatchPassword(state.auth.newPassword, state.auth.newConfirmPassword));

    const confirmPasswordResetAction = (): void =>{
      if(isValidPassword.value)
        verifyPasswordResetCode(auth, `${oobCode}`)
          .then((email) =>{
            if(email){
              authStore
                .resetPasswordConfirm(oobCode as string, state.auth.newPassword)
                .then(()=>{
                  router.replace({name: 'LoginPage'});
                  toast.success('Your password has been updated.');
                });
            }
          })
          .catch(() => toast.warning('Invalid Action Code'))
    }
    return {
      ...toRefs(state),
      mode,
      isValidPassword,
      confirmPasswordResetAction
    };
  },
});
</script>