import { defineStore } from "pinia";
import { onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signOut, updateEmail, updatePassword, User } from 'firebase/auth';
import { useToast } from "vue-toastification";
import { auth, db } from '../services/useFirebaseService';
import { useUserStore } from "./useUserStore";
import { IUser } from "../types/InterfaceType";
import { doc, updateDoc } from "@firebase/firestore";

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
            providedId: user?.providerData[0].providerId
         }

         this.currentUserSession = currentUser;
      },

      async onLogoutAction(): Promise<void> {
         signOut(auth).then(() => {
            localStorage.removeItem('_uid');
            toast.info("You has been logout.")
         }).catch((error) => {
            this.setErrorData(error);
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
               localStorage.removeItem('_role');
               this.isLoggedIn = false;
               userStore.onLoadingStateUser = false;
            }
         });
      },

      updateCurrentUserEmail(newEmail: IUser['email']) {

         const currentUser = auth.currentUser as User

         updateEmail(currentUser, newEmail)
            .then(async () => {
               const userRef = doc(db, 'tbl_users', currentUser.uid);
               await updateDoc(userRef, {
                  email: newEmail
               });

               toast.success("Your Email has been update succesfully.")
            }).catch((error) => {
               this.setErrorData(error);
            });
      },

      updateCurrentUserPasswod(newPassword: string) {
         updatePassword(auth.currentUser as User, newPassword)
            .then(() => {
               toast.success("Your Password has been update succesfully.")
            }).catch((error) => {
               this.setErrorData(error);
            });
      },

      sendPasswordResetEmail(email: IUser['email']) {
         sendPasswordResetEmail(auth, email)
            .then(() => {
               // TODO
            })
            .catch((error) => {
               this.setErrorData(error);
            });
      },

      sendVerificationEmail() {

         sendEmailVerification(auth.currentUser as User)
            .then(() => {
               // TODO
            });
      },

      setErrorData(error: any) {
         const errorCode = error.code;
         const errorMessage = error.message;

         this.$patch(state => state.error = {
            errorCode: errorCode,
            errorMessage: errorMessage
         });

         console.log(`${errorCode} => ${errorMessage}`);
      }
   }
})