import { defineStore } from 'pinia';
import { IUser } from '../types/InterfaceType';
import { userMock } from '../utils/mockDataAPI';
import { doc, DocumentData, getDoc, setDoc, } from 'firebase/firestore';
import { db } from '../services/useFirebaseService';

export const useUserStore = defineStore({
   id: 'useUserStore',
   state: () => ({
      currentUser: userMock as DocumentData
   }),
   actions: {
      async onRegisterUser(newData: { userId: IUser['userId'], email: IUser['email'] }) {

         var newUser: IUser = {
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
                  cretedDate: Date.now(),
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
                  cretedDate: Date.now(),
                  lastModifiedDate: Date.now(),
               },
            },
            roleDeveloper: "Developer",
            clients: [],
            userPreference: {
               useThemeMode: "light",
               pushNotification: 3,
               sendToEmail: {
                  candidates: true,
                  offers: true,
               },
            },
            cretedDate: Date.now(),
            lastModifiedDate: Date.now(),
         };

         await setDoc(doc(db, 'tbl_users', newData.userId), newUser);
      },

      async fetchCurrentUser(userId: IUser['userId']) {
         const docRef = doc(db, "tbl_users", userId);
         const docSnap = await getDoc(docRef);
         if (docSnap.exists()) {
            const data: DocumentData = docSnap.data();
            this.currentUser = data;
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
      }
   }
})