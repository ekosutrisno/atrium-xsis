import { defineStore } from 'pinia';
import { IAddress, IClient, ICurrentEro, IUser, IUserPreference } from '../types/InterfaceType';
import { userMock } from '../utils/mockDataAPI';
import { doc, getDoc, onSnapshot, setDoc, updateDoc, } from 'firebase/firestore';
import { db, storage } from '../services/useFirebaseService';
import { useToast } from 'vue-toastification';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const toast = useToast();
interface UserStoreState {
   gender: string,
   currentUser: IUser,
   currentClient: IClient
   currentEro: ICurrentEro | null
   onLoadingStateUser: boolean
}

export const useUserStore = defineStore({
   id: 'useUserStore',
   state: (): UserStoreState => ({
      gender: '',
      onLoadingStateUser: true,
      currentUser: userMock,
      currentEro: {
         eroId: '',
         email: '',
         fullName: '',
         telephone: '',
         eroImageAvatar: ''
      } as ICurrentEro,
      currentClient: {} as IClient
   }),
   actions: {
      /**
      * @param  {userId: IUser['userId'], email: IUser['email']} newData
      * @description register user to Database Collection
      */
      async onRegisterUser(newData: { userId: IUser['userId'], email: IUser['email'] }) {

         const newUser: IUser = {
            userId: newData.userId,
            eroId: '',
            isEro: false,
            nationality: "",
            isActive: false,
            email: newData.email,
            username: `@${newData.email?.split('@')[0].replace('.', '_')}`,
            fullName: `${newData.email?.split('@')[0]}`,
            telephone: "",
            photoUrl: "https://res.cloudinary.com/ekosutrisno/image/upload/v1627464871/avatars/profile1_otttcz.png",
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
               roleDeveloperId: 8,
               roleDeveloperName: 'On Bootcamp',
               roleDeveloperDesc: 'Role as Bootcamp former',
               roleDeveloperSalary: 'Rp100K / Day',
            },
            mainRole: {
               roleId: 6,
               isActive: true,
               roleName: 'Employee',
               roleDescription: 'Role as Employee'
            },
            clients: [
               {
                  clientId: '6',
                  clientName: '__BOOTCAMP__',
                  clientAddress: 'Jl. Dr. Satrio Lt 25',
                  clientCountry: 'Indonesia',
                  clientKota: 'Jakarta Pusat',
                  clientProvinsi: 'DKI Jakarta',
                  createdDate: Date.now(),
                  lastModifiedDate: Date.now()
               }
            ],
            userPreference: {
               useThemeMode: "light",
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
               this.currentUser = data;

               // Get First CLient Only
               this.currentClient = data.clients[0];

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
      getUserClient(state): IUser['clients'] {
         return state.currentUser ? state.currentUser.clients : [];
      },

      /**
       * @param  {} state
       * @param {IUser['username']} fullName
       * @param  {IUser['email']} email
       * @returns IUser
       */
      getLoginAsInfo(state): { fullName: IUser['username'], email: IUser['email'] } {
         const loginAs = {
            fullName: state.currentUser.fullName,
            email: state.currentUser.email
         }
         return loginAs;
      }

   }
})