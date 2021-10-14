<template>
   <!-- Update Password -->
   <div class="card-wrapper-general-theme overflow-hidden with-transition">
      <div class="py-5 border-b relative p-6 border-gray-200 dark:border-color-gray-darkest">
         <h3 class="text-lg leading-6 font-medium text-color-dark-gray-darkest dark:text-color-gray-lighter">
            Change password
         </h3>
         <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-color-gray-default">
            You can change your password here
         </p>

         <svg @click="toggleEditActionPassword(false)" v-if="isOnEditPassword" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 absolute top-5 right-5 md:cursor-pointer text-color-dark-gray-lighter text-opacity-50 hover:text-opacity-100 dark:text-color-gray-darker transition-all dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
         </svg>
         <svg @click="toggleEditActionPassword(true)" v-else-if="!isOnEditPassword" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 absolute top-5 right-5 md:cursor-pointer text-color-dark-gray-lighter text-opacity-50 hover:text-opacity-100 dark:text-color-gray-darker transition-all dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
         </svg>
      </div>
      <form @submit.prevent="toggleModalPassword">
         <dl>
            <div v-if="isOnEditPassword" class="with-transition">
               <div class="input-custom-wrapper-gray">
                  <dt class="input-custom-dt">
                     New password
                  </dt>
                  <dd class="input-custom-dd">
                     <label for="new-password" class="input-custom-label">New password</label>
                        <input
                           v-model="newPassword"
                           placeholder="type new password" 
                           type="password" name="new-password" id="new-password" autocomplete="off"
                           class="input-custom-default input-custom-on-edit" 
                        />
                  </dd>
               </div>
               <div class="input-custom-wrapper-gray">
                  <dt class="input-custom-dt">
                     Confirm new password
                  </dt>
                  <dd class="input-custom-dd">
                     <label for="confirm-new-password" class="input-custom-label">Confirm new password</label>
                        <input 
                           v-model="newConfirmPassword"
                           placeholder="type confirm new password"
                           type="password" name="confirm-new-password" id="confirm-new-password" autocomplete="off"
                           class="input-custom-default input-custom-on-edit" 
                        />
                     <p v-if="isMatchPassword" class="text-sm text-green-500 py-2">Password match</p>
                     <p v-else class="text-sm text-red-500 py-2">Password did not match</p>
                  </dd>
               </div>
            </div>
            <div class="px-4 py-3 space-x-3 bg-gray-50 border-t border-gray-200 dark:border-color-gray-darkest dark:bg-color-dark-gray-darkest text-right sm:px-6">
               <button v-if="!isOnEditPassword" type="button" @click="toggleEditActionPassword(true)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-color-dark-gray-default dark:text-white bg-color-gray-light dark:bg-color-dark-gray-darker dark:hover:bg-color-dark-gray-dark hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Change password
               </button>
               <button v-if="isOnEditPassword" type="button" @click="toggleEditActionPassword(false)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:text-white text-color-dark-gray-default hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Cancel
               </button>
               <button v-if="isOnEditPassword" type="submit" :disabled="!isMatchPassword" class="inline-flex disabled:bg-opacity-25 with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save
               </button>
            </div>
         </dl>
      </form>
   </div>

   <!-- Update Email -->
   <div class="card-wrapper-general-theme overflow-hidden with-transition">
      <div class="py-5 border-b relative p-6 border-gray-200 dark:border-color-gray-darkest">
         <h3 class="text-lg leading-6 font-medium text-color-dark-gray-darkest dark:text-color-gray-lighter">
            Update email
         </h3>
         <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-color-gray-default">
            You can change your email here, and use the new email to login
         </p>

         <svg @click="toggleEditActionEmail(false)" v-if="isOnEditEmail" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 absolute top-5 right-5 md:cursor-pointer text-color-dark-gray-lighter text-opacity-50 hover:text-opacity-100 dark:text-color-gray-darker transition-all dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
         </svg>
         <svg @click="toggleEditActionEmail(true)" v-else-if="!isOnEditEmail" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 absolute top-5 right-5 md:cursor-pointer text-color-dark-gray-lighter text-opacity-50 hover:text-opacity-100 dark:text-color-gray-darker transition-all dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
         </svg>
      </div>
      <form @submit.prevent="toggleModalEmail">
         <dl>
            <div v-if="isOnEditEmail" class="with-transition">
               <div class="input-custom-wrapper-gray">
                  <dt class="input-custom-dt">
                     New email
                  </dt>
                  <dd class="input-custom-dd">
                     <label for="new-email" class="input-custom-label">New email</label>
                        <input
                           v-model="newEmail"
                           placeholder="email@example.com" 
                           type="email" name="new-email" id="new-email" autocomplete="off"
                           class="input-custom-default input-custom-on-edit" 
                        />
                  </dd>
               </div>
            </div>
            <div class="px-4 py-3 space-x-3 bg-gray-50 border-t border-gray-200 dark:border-color-gray-darkest dark:bg-color-dark-gray-darkest text-right sm:px-6">
               <button v-if="!isOnEditEmail" type="button" @click="toggleEditActionEmail(true)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-color-dark-gray-default dark:text-white bg-color-gray-light dark:bg-color-dark-gray-darker dark:hover:bg-color-dark-gray-dark hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Update email
               </button>
               <button v-if="isOnEditEmail" type="button" @click="toggleEditActionEmail(false)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:text-white text-color-dark-gray-default hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Cancel
               </button>
               <button v-if="isOnEditEmail" :disabled="!isValidEmail" type="submit" class="inline-flex disabled:bg-opacity-25 with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save
               </button>
            </div>
         </dl>
      </form>
   </div>

   <!-- Danger Zone -->
    <div class="card-wrapper-general-theme overflow-hidden with-transition">
      <div class="py-5 border-b relative p-6 border-gray-200 dark:border-color-gray-darkest">
         <h3 class="text-lg leading-6 font-medium text-color-dark-gray-darkest dark:text-color-gray-lighter">
            Danger zone
         </h3>
         <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-color-gray-default">
            You can deactive your account, and make sure your decision already right because this action cannot be restored!
         </p>
      </div>
      <dl>
         <div class="px-4 py-3 space-x-3 bg-gray-50 border-t border-gray-200 dark:border-color-gray-darkest dark:bg-color-dark-gray-darkest text-left sm:px-6">
            <button type="button" @click="onSubmitAction" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
               Delete account
            </button>
      </div>
      </dl>
   </div>

   <PromtCredentialEmailModal :open="openModalEmail" @action="onUpdateEmail" @close-modal="toggleModalEmail"/>
   <PromtCredentialPasswordModal :open="openModalPassword" @action="onUpdatePassword" @close-modal="toggleModalPassword"/>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useAuthStore } from '../services'
import PromtCredentialEmailModal from './modal/PromtCredentialEmailModal.vue';
import { validateEmail, isMatchPassword } from '../utils/helperFunction';
import PromtCredentialPasswordModal from './modal/PromtCredentialPasswordModal.vue';

export default defineComponent({
  components: { PromtCredentialEmailModal, PromtCredentialPasswordModal },
   setup () {

      const authStore = useAuthStore();

      const state = reactive({
         isOnEditPassword: false,
         isOnEditEmail: false,
         emailError: '',
         openModalEmail: false,
         openModalPassword: false,
         newEmail: '',
         newPassword: '',
         newConfirmPassword: ''
      })



      // Start Email Action
      const toggleEditActionEmail= (val: boolean): void => {
         state.isOnEditEmail = val;
         state.newEmail = '';
      }

      const toggleModalEmail = () => {
         state.openModalEmail = !state.openModalEmail;
      }

      const isValidEmail = computed(() => validateEmail(state.newEmail));

      const onUpdateEmail = async (password: string) => {
         if(state.newEmail.trim().length >= 5 )
            authStore
               .updateCurrentUserEmail(state.newEmail, password)
               .then(() => {
                  toggleModalEmail();
                  toggleEditActionEmail(false);
                  state.newEmail = '';
               });
         else
            console.log("Failed update email, email invalid format");
      }

      // Start Password Action
      const toggleEditActionPassword = (val: boolean): void => {
         state.isOnEditPassword = val;
         state.newPassword = '';
         state.newConfirmPassword = '';
      }
      
      const toggleModalPassword = () => {
          state.openModalPassword = !state.openModalPassword;
      }

      const onUpdatePassword = async (password: string) => {
         if(isMatchPassword(state.newPassword, state.newConfirmPassword))
            authStore
               .updateCurrentUserPasswod(state.newPassword, password)
               .then(() => {
                  toggleModalPassword();
                  toggleEditActionPassword(false);
                  state.newPassword = '';
                  state.newConfirmPassword = '';
               });
         else
            console.log("Failed update email, email invalid format");
      }

      // Start Delete Acount Action
      const onSubmitAction = () => {
         authStore.sendVerificationEmail()
         state.isOnEditPassword = false;
         state.isOnEditEmail = false;
      }

      return {
         ...toRefs(state),
         isMatchPassword: computed(()=> isMatchPassword(state.newPassword, state.newConfirmPassword)),
         isValidEmail,
         toggleEditActionPassword,
         toggleEditActionEmail,
         onSubmitAction,
         onUpdateEmail,
         onUpdatePassword,
         toggleModalEmail,
         toggleModalPassword
      }
   }
})
</script>