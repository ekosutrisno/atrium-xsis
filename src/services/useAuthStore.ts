import { defineStore } from "pinia";
import { onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signOut, updateEmail, updatePassword, User, AuthCredential, EmailAuthProvider, deleteUser } from 'firebase/auth';
import { useToast } from "vue-toastification";
import { auth, db } from '../services/useFirebaseService';
import { useUserStore } from "./useUserStore";
import { IUser } from "../types/InterfaceType";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { validateEmail } from "../utils/helperFunction";

const toast = useToast();

type CurrentUserSession = {
   displayName: string
   phoneNumber: string
   photoUrl: string
   email: string
   emailVerified: boolean
   providedId: string
}

interface AuthStoreState {
   isLoggedIn: boolean
   isRegisterProcess: boolean
   currentUserSession: CurrentUserSession
   error: {
      errorCode: string | null
      errorMessage: string | null
   }
}

export const useAuthStore = defineStore({
   id: 'useAuthStore',
   state: (): AuthStoreState => ({
      isLoggedIn: false,
      isRegisterProcess: false,
      currentUserSession: {} as CurrentUserSession,
      error: {
         errorCode: null,
         errorMessage: null
      }
   }),
   actions: {
      /**
       * @param  {any} user?
       * This method will automaticly set when authState method is fire
       * This method set the info to current user session data
       */
      onLoginAction(user?: any) {
         var currentUser = {
            displayName: user?.displayName,
            phoneNumber: user?.phoneNumber,
            photoUrl: user?.photoURL,
            email: user?.email,
            emailVerified: user?.emailVerified,
            providedId: user?.providerData[0].providerId
         } as CurrentUserSession

         this.currentUserSession = currentUser;
      },

      /**
       * @returns Promise
       * logout action method
       */
      async onLogoutAction(): Promise<void> {
         signOut(auth).then(() => {
            localStorage.removeItem('_uid');
            toast.info("You has been logout.")
         }).catch((error) => {
            this.setErrorData(error);
            toast.error(`Failed, ${error.code}`);
         });
      },

      /**
       * This method will allways automaticly fire when you hard refresh your page
       * to check and identify current user session is available or not
       */
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

      /**
       * Update email with prom credential before confirm action
       * @param  {IUser['email']} newEmail
       * @param  {string} currentUserPassword
       * @returns Promise
       */
      async updateCurrentUserEmail(newEmail: IUser['email'], currentUserPassword: string): Promise<void> {

         const currentUser = auth.currentUser as User

         const credential = EmailAuthProvider.credential(
            currentUser.email as string,
            currentUserPassword
         );

         reauthenticateWithCredential(currentUser, credential).then(() => {
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
         }).catch((error) => {
            this.setErrorData(error)
         });
      },

      /**
       * Update password with prom credential before confirm action
       * @param  {string} newPassword
       * @param  {string} currentUserPassword
       * @returns Promise
       */
      async updateCurrentUserPasswod(newPassword: string, currentUserPassword: string): Promise<void> {
         const currentUser = auth.currentUser as User

         const credential = EmailAuthProvider.credential(
            currentUser.email as string,
            currentUserPassword
         );

         reauthenticateWithCredential(currentUser, credential).then(() => {
            updatePassword(auth.currentUser as User, newPassword)
               .then(() => {
                  toast.success("Your Password has been update succesfully.")
               }).catch((error) => {
                  this.setErrorData(error);
               });
         }).catch((error) => {
            this.setErrorData(error)
         });

      },

      /**
       * This method will handle and send password reset email to user
       * before send email first check if email are registered
       * @param  {IUser['email']} email
       */
      async sendPasswordResetEmail(email: IUser['email']): Promise<void> {
         const userRef = collection(db, 'tbl_users');
         const q = query(userRef, where('email', '==', email));

         getDocs(q)
            .then(async (snapshot) => {
               if (snapshot.size === 1 && validateEmail(email))
                  await sendPasswordResetEmail(auth, email)
                     .then(() => {
                        // TODO
                     })
                     .catch((error) => {
                        this.setErrorData(error);
                     });
            })

      },
     /**
      * This method and handle send email verification after user register
      * @returns Promise
      */
     async sendVerificationEmail(): Promise<void> {

        await sendEmailVerification(auth.currentUser as User)
            .then(() => {
               // TODO
            });
      },

      async deleteAccount() {
         const user = auth.currentUser as User;

         deleteUser(user).then(() => {

         }).catch((error) => {
            this.setErrorData(error);
         });
      },

      setErrorData(error: any) {
         const errorCode = error.code;
         const errorMessage = error.message;

         this.$patch(state => state.error = {
            errorCode: errorCode,
            errorMessage: errorMessage
         });

         if (errorCode === 'auth/wrong-password')
            toast.error('Wrong password, please fill in the correct password.')
         else if (errorCode === 'auth/too-many-requests')
            toast.error('Too many request, your password wrong more than three time.')

         console.log(`${errorCode} => ${errorMessage}`);
      }
   }
})
