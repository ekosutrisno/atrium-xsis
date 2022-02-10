import { defineStore } from 'pinia';
import { IAddress, IClient, ICurrentEro, IMainRole, IRoleDeveloper, IUser, IUserPreference, UserAddress } from '../types/InterfaceType';
import { userMock } from '../utils/mockDataAPI';
import { collection, doc, DocumentReference, getDoc, getDocs, onSnapshot, setDoc, updateDoc, } from 'firebase/firestore';
import { db, storage } from '../services/useFirebaseService';
import { useToast } from 'vue-toastification';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useStatisticStore, useTimesheetStore } from '.';
import { FlagUseOn } from '../types/EnumType';

const toast = useToast();
interface UserStoreState {
   gender: string
   currentUser: IUser
   currentUserDeveloperRole: IRoleDeveloper
   currentUserMainRole: IMainRole
   userList: IUser[]
   currentClient: IClient | null
   currentUserAddress: UserAddress | null
   currentEro: ICurrentEro | null
   onLoadingStateUser: boolean
}

export const useUserStore = defineStore('useUserStore', {
   state: (): UserStoreState => ({
      gender: '',
      onLoadingStateUser: true,
      currentUser: userMock,
      currentUserDeveloperRole: {} as IRoleDeveloper,
      currentUserMainRole: {} as IMainRole,
      currentEro: null,
      currentUserAddress: null,
      currentClient: null,
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
            eroId: null,
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
            address: doc(db, 'tbl_address', newData.userId),
            roleDeveloper: doc(db, 'tbl_developer_role', '11'),
            mainRole: doc(db, 'tbl_main_role', '7'),
            client: doc(db, 'tbl_clients', 'zKrmP1vkUwqvAhuNEVlJ'),
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

         const address: UserAddress = {
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
         };


         await setDoc(doc(db, 'tbl_users', newData.userId), newUser);
         await setDoc(newUser.address, address);
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

               // Set The Current User
               this.currentUser = data;

               // Parse all reference data
               this.parseFromReference(data);

               // Stop the loading indicator
               this.onLoadingStateUser = false;

               if (data.eroId)
                  this.fetchCurrentEro(data.eroId);
               else
                  this.currentEro = null;
            }
         })
      },

      /**
       * @param  {IUser['userId']} userId
       * @description Get Current Ero by EroId Key and if isEro = false
       */
      async fetchCurrentEro(eroRefId: DocumentReference) {
         const docSnap = await getDoc(eroRefId);
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
         const docRef = doc(db, "tbl_users", user.userId);
         setDoc(docRef, user, { merge: true })
            .then(() => {
               toast.info(`Profile data has been updated.`)
            });
      },

      /**
       * @param  {IAddress} address
       * Update for specific UserAddress Asli or Domisili
       */
      async updateCurrentUserAddress(addressRef: DocumentReference, address: IAddress) {
         if (address.isDomisili) {
            updateDoc(addressRef, {
               addressDomisili: address
            }).then(() => {
               toast.info(`Address Domisili updated.`)
            });
         } else {
            updateDoc(addressRef, {
               addressAsli: address
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
               toast.info(`User preference updated.`)
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
      },

      /**
       * @param  {IUser} ref
       * This method will parse all data reference from User
       */
      parseFromReference(ref: IUser) {
         getDoc(ref.mainRole)
            .then(mainRole => {

               if (mainRole.exists()) {
                  // Set User Role
                  localStorage.setItem('_role', mainRole.data().roleId.toString());

                  this.currentUserMainRole = mainRole.data() as IMainRole
               }
            });

         getDoc(ref.roleDeveloper)
            .then(devRole => this.currentUserDeveloperRole = devRole.data() as IRoleDeveloper);

         getDoc(ref.client)
            .then(client => this.currentClient = client.data() as IClient);

         getDoc(ref.address)
            .then(address => this.currentUserAddress = address.data() as UserAddress);
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