import { defineStore } from 'pinia';
import { IAddress, IUser, IUserPreference } from '../types/InterfaceType';
import { userMock } from '../utils/mockDataAPI';
import { doc, getDoc, setDoc, updateDoc, } from 'firebase/firestore';
import { db, storage } from '../services/useFirebaseService';
import { useToast } from 'vue-toastification';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const toast = useToast();

export const useUserStore = defineStore({
   id: 'useUserStore',
   state: () => ({
      currentUser: userMock
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
               cretedDate: Date.now(),
               lastModifiedDate: Date.now()
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
            const data: any = docSnap.data();
            this.currentUser = data;
         }
      },

      async updateCurrentUserData(user: IUser) {
         var userId = user.userId;

         const docRef = doc(db, "tbl_users", userId);
         setDoc(docRef, user, { merge: true })
            .then(() => {
               this.fetchCurrentUser(userId);
               toast.info(`Your profile data up to date now.`)
            });
      },

      async updateCurrentUserAddress(address: IAddress) {
         var userId = address.userId;
         const docRef = doc(db, "tbl_users", userId);

         if (address.isDomisili) {
            updateDoc(docRef, {
               "address.addressDomisili": address
            }).then(() => {
               this.fetchCurrentUser(userId);
               toast.info(`Your Address Domisili up to date now.`)
            });
         } else {
            updateDoc(docRef, {
               "address.addressAsli": address
            }).then(() => {
               this.fetchCurrentUser(userId);
               toast.info(`Your Address Asli up to date now.`)
            });
         }
      },

      async updateUserPreference(userId: IUser['userId'], userPreference: IUserPreference): Promise<void> {
         const docRef = doc(db, "tbl_users", userId);

         userPreference.lastModifiedDate = Date.now(),

         updateDoc(docRef, {
            "userPreference": userPreference
         }).then(() => {
            this.fetchCurrentUser(userId);
            toast.info(`Your Notification preference up to date now.`)
         });
      },

      async updateFotoProfile(photo: any, userId: IUser['userId']){
         if (photo) {
            const storageRef = ref(storage, `profiles/${userId}`);
            const uploadTask = uploadBytesResumable(storageRef, photo);

            uploadTask.on('state_changed',
               (snapshot) => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                     case 'paused':
                        console.log('Upload is paused');
                        break;
                     case 'running':
                        console.log('Upload is running');
                        break;
                  }
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
                           this.fetchCurrentUser(userId);
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
      }
   }
})