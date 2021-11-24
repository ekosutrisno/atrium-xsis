import { defineStore } from 'pinia';
import { IAddress, IClient, ICurrentEro, IUser, IUserPreference } from '../types/InterfaceType';
import { userMock } from '../utils/mockDataAPI';
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc, } from 'firebase/firestore';
import { db, storage } from '../services/useFirebaseService';
import { useToast } from 'vue-toastification';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useStatisticStore, useTimesheetStore } from '.';
import { FlagUseOn } from '../types/EnumType';

const toast = useToast();
interface UserStoreState {
   gender: string
   currentUser: IUser
   userList: IUser[]
   currentClient: IClient | null
   currentEro: ICurrentEro | null
   onLoadingStateUser: boolean
}

export const useUserStore = defineStore({
   id: 'useUserStore',
   state: (): UserStoreState => ({
      gender: '',
      onLoadingStateUser: true,
      currentUser: userMock,
      currentEro: {} as ICurrentEro,
      currentClient: {} as IClient,
      userList: [] as IUser[]
   }),
   actions: {
      /**
       * Get All User in Admin Action
       */
      async getAllUser() {
         const userRef = collection(db, 'tbl_users');
         getDocs(userRef)
            .then((snapshot) => {
               const userTemp: IUser[] = [];

               snapshot.forEach((user) => {
                  userTemp.push(user.data() as IUser);
               })

               this.userList = userTemp;
            })
      },

      /**
      * @param  {userId: IUser['userId'], email: IUser['email']} newData
      * @description register user to Database Collection
      */
      async onRegisterUser(newData: { userId: IUser['userId'], email: IUser['email'] }, googleNewData?: { user?: any, oauth?: boolean }) {

         if (googleNewData?.oauth) {
            const user = await getDoc(doc(db, 'tbl_users', newData.userId));
            if (user.exists())
               return
            else {

               const statisticStore = useStatisticStore();
               const timesheetStore = useTimesheetStore();

               /** Register Statistic storage. */
               statisticStore.registerStatistic(newData.userId, FlagUseOn.REGISTRATION);

               /** Register Timesheet storage. */
               timesheetStore.registerTimesheet(newData.userId);
            }
         }

         const newUser: IUser = {
            userId: newData.userId,
            eroId: '',
            isEro: false,
            nationality: "",
            isActive: googleNewData?.oauth ? googleNewData.user.emailVerified : false,
            email: newData.email,
            username: `@${newData.email?.split('@')[0].replace('.', '_')}`,
            fullName: googleNewData?.oauth
               ? googleNewData.user.displayName
               : `${newData.email?.split('@')[0]}`,
            telephone: "",
            photoUrl: googleNewData?.oauth
               ? googleNewData.user.photoURL
               : "https://res.cloudinary.com/ekosutrisno/image/upload/v1627464871/avatars/profile1_otttcz.png",
            gender: "",
            dob: "",
            pob: "",
            hobby: "",
            joinAt: Date.now(),
            religion: "",
            about: "",
            address: {
               userId: newData.userId,
               addressAsli: {
                  userId: newData.userId,
                  isDomisili: false,
                  jalan: "",
                  kota: "",
                  provinsi: "",
                  kodePos: "",
                  desa: "",
                  country: "",
                  kabupaten: "",
                  kecamatan: "",
                  createdDate: Date.now(),
                  lastModifiedDate: Date.now(),
               },
               addressDomisili: {
                  userId: newData.userId,
                  isDomisili: true,
                  jalan: "",
                  kota: "",
                  provinsi: "",
                  kodePos: "",
                  desa: "",
                  country: "",
                  kabupaten: "",
                  kecamatan: "",
                  createdDate: Date.now(),
                  lastModifiedDate: Date.now(),
               },
            },
            roleDeveloper: {
               roleDeveloperId: 11,
               roleDeveloperName: 'Applicants',
               roleDeveloperDesc: 'Role as Applicants',
               roleDeveloperSalary: 'Rp0K',
            },
            mainRole: {
               roleId: 7,
               isActive: true,
               roleName: 'Applicants',
               roleDescription: 'Role as Applicants'
            },
            client: null,
            userPreference: {
               useThemeMode: "dark",
               pushNotification: 3,
               sendToEmail: {
                  candidates: true,
                  offers: true,
               },
               createdDate: Date.now(),
               lastModifiedDate: Date.now()
            },
            createdDate: Date.now(),
            lastModifiedDate: Date.now(),
         };

         await setDoc(doc(db, 'tbl_users', newData.userId), newUser);
      },

      /**
       * @param  {IUser['userId']} userId
       * @description Get Current User By userID Key
       */
      async fetchCurrentUser(userId: IUser['userId']) {
         const docRef = doc(db, "tbl_users", userId);

         onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
               const data: IUser = docSnap.data() as IUser;
               // Set User Role
               localStorage.setItem('_role', data.mainRole.roleId.toString());

               // Set The Current User
               this.currentUser = data;

               // Get First CLient Only
               this.currentClient = data.client;

               // Stop the loading indicator
               this.onLoadingStateUser = false;

               if (!data.isEro && data.eroId)
                  this.fetchCurrentEro(data.eroId as IUser['userId']);
               else
                  this.currentEro = null;
            }
         })
      },

      /**
       * @param  {IUser['userId']} userId
       * @description Get Current Ero by EroId Key and if isEro = false
       */
      async fetchCurrentEro(userId: IUser['userId']) {
         const docRef = doc(db, "tbl_users", userId);
         const docSnap = await getDoc(docRef);
         if (docSnap.exists()) {
            const data: IUser = docSnap.data() as IUser;
            this.currentEro = {
               eroId: data.userId,
               email: data.email as string,
               fullName: data.fullName as string,
               telephone: data.telephone,
               eroImageAvatar: data.photoUrl
            };
         }
      },

      /**
       * @param  {IUser} user
       * @description Update All Detail User Data Property
       */
      async updateCurrentUserData(user: IUser) {
         var userId = user.userId;
         user.client =
            {
               website: "https://www.telkom.co.id/sites",
               lastModifiedDate: 1635859320438,
               address: "Telkom Landmark Tower, 39-nd floor Jl. Jendral Gatot Subroto Kav. 52 RT.6/RW.1, Kuningan Barat, Mampang Prapatan",
               name: "PT Baskom Indonesia",
               clientId: "-MnLhwdWF5NeiaYy6bcI",
               description: "© 2020 PT Baskom Indonesia (Persero) Tbk. Hak Cipta Dilindungi Undang-Undang",
               telephone: "+62 21 - 808 63539",
               provinsi: "DKI Jakarta", "kota": "Jakarta Selatan",
               email: "corporate_comm@baskom.co.id",
               postalCode: "12711",
               country: "Indonesia",
               image: "https://images.unsplash.com/photo-1462206092226-f46025ffe607?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y29tcGFueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
               createdDate: 1635689941601
            } as IClient


         const docRef = doc(db, "tbl_users", userId);
         setDoc(docRef, user, { merge: true })
            .then(() => {
               toast.info(`Profile data has been updated.`)
            });
      },

      /**
       * @param  {IAddress} address
       * Update for specific UserAddress Asli or Domisili
       */
      async updateCurrentUserAddress(address: IAddress) {
         var userId = address.userId;
         const docRef = doc(db, "tbl_users", userId);

         if (address.isDomisili) {
            updateDoc(docRef, {
               "address.addressDomisili": address
            }).then(() => {
               toast.info(`Address Domisili updated.`)
            });
         } else {
            updateDoc(docRef, {
               "address.addressAsli": address
            }).then(() => {
               toast.info(`Address Asli updated.`)
            });
         }
      },

      /**
       * @param  {IUser['userId']} userId
       * @param  {IUserPreference} userPreference
       * @returns Promise
       * @description Update user Preference
       */
      async updateUserPreference(userId: IUser['userId'], userPreference: IUserPreference): Promise<void> {
         const docRef = doc(db, "tbl_users", userId);

         userPreference.lastModifiedDate = Date.now(),

            updateDoc(docRef, {
               "userPreference": userPreference
            }).then(() => {
               toast.info(`Notification preference updated.`)
            });
      },

      /**
       * @param  {any} photo
       * @param  {IUser['userId']} userId
       * @description Update user profile avatar image
       */
      async updateFotoProfile(photo: any, userId: IUser['userId']) {
         if (photo) {
            const storageRef = ref(storage, `profiles/${userId}`);
            const uploadTask = uploadBytesResumable(storageRef, photo);

            uploadTask.on('state_changed',
               (snapshot) => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               },
               (error) => {
                  switch (error.code) {
                     case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                     case 'storage/canceled':
                        // User canceled the upload
                        break;
                     case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                  }
               },
               () => {
                  // Upload completed successfully, now we can get the download URL
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                     const docRef = doc(db, "tbl_users", userId);
                     updateDoc(docRef, {
                        "photoUrl": downloadURL,
                        "lastModifiedDate": Date.now()
                     }).then(() => {
                        toast.info(`Your profile photo has been updated.`)
                     });
                  });
               }
            );
         }
      }
   },
   getters: {
      /**
       * @param  {} state
       * @returns IUser.photoUrl
       */
      getPhotoUrl(state): IUser['photoUrl'] {
         return state.currentUser ? state.currentUser.photoUrl : '';
      },

      /**
       * @param  {} state
       * @returns IUser.clients
       */
      getUserClient(state): IUser['client'] {
         return state.currentUser.client
      },

      /**
       * @param  {} state
       * @param {IUser['username']} fullName
       * @param  {IUser['email']} email
       * @returns IUser
       */
      getLoginAsInfo(state): { fullName: IUser['fullName'], email: IUser['email'] } {
         const loginAs = {
            fullName: state.currentUser.fullName,
            email: state.currentUser.email
         }
         return loginAs;
      }

   }
})