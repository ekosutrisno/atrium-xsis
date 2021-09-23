import { defineStore } from "pinia";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useToast } from "vue-toastification";
import { auth } from '../services/useFirebaseService';
import { useUserStore } from "./useUserStore";

const toast = useToast();

interface AuthStoreState {
   isLoggedIn: boolean,
   isRegisterProcess: boolean,
   currentUserSession: {
      displayName: string,
      phoneNumber: string,
      photoUrl: string,
      email: string,
      emailVerified: boolean,
      providedId: string
   },
   error: {
      errorCode: string | null,
      errorMessage: string | null
   }
}

export const useAuthStore = defineStore({
   id: 'useAuthStore',
   state: (): AuthStoreState => ({
      isLoggedIn: false,
      isRegisterProcess: false,
      currentUserSession: {
         displayName: '',
         phoneNumber: '',
         photoUrl: '',
         email: '',
         emailVerified: false,
         providedId: ''
      },
      error: {
         errorCode: null,
         errorMessage: null
      }
   }),
   actions: {
      onLoginAction(user?: any) {
         var currentUser = {
            displayName: user?.displayName,
            phoneNumber: user?.phoneNumber,
            photoUrl: user?.photoURL,
            email: user?.email,
            emailVerified: user?.emailVerified,
            providedId: user?.providerId
         }

         this.currentUserSession = currentUser;

      },

      async onLogoutAction(): Promise<void> {
         signOut(auth).then(() => {
            localStorage.removeItem('_uid');
            toast.info("You has been logout.")
         }).catch((error) => {
            toast.error(`Failed, ${error.code}`);
         });
      },

      authState() {

         const userStore = useUserStore();

         onAuthStateChanged(auth, (user) => {
            if (user) {
               const uid = user.uid;

               this.isLoggedIn = true;
               localStorage.setItem('_uid', uid);

               // Set Detail Information such as profiderId
               this.onLoginAction(user);

               userStore.fetchCurrentUser(uid);
            } else {
               localStorage.removeItem('_uid');
               this.isLoggedIn = false;
               userStore.onLoadingStateUser = false;
            }
         });
      },
   }
})