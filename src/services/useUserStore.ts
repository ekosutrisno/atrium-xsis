import { defineStore } from 'pinia';
import { Gender, Religion } from '../types/EnumType';

export const useUserStore = defineStore({
   id: 'useUserStore',
   state: () => ({
      currentUser: {
         userId: 'e7a0f822-edad-4ba2-bc6c-286b0556d7ae',
         eroId: '56f59bb6-680b-498c-a48c-118a7ecaff55',
         fullName: 'Eko Sutrisno',
         username: '@eko_sutrisno',
         isEro: false,
         isForeign: false,
         isActive: true,
         email: 'eko.sutrisno@xsis.co.id',
         telephone: '082371928902',
         photoUrl: 'https://res.cloudinary.com/ekosutrisno/image/upload/v1625803063/avatars/MyAvatar_taylrm.png',
         gender: Gender.LAKI_LAKI,
         dob: new Date(1996, 4, 20),
         pob: 'Simpang Tiga',
         hobby: 'Music, Watching Video',
         joinAt: new Date(2019, 10, 11),
         religion: Religion.ISLAM,
         address: [
            {
               userId: 'e7a0f822-edad-4ba2-bc6c-286b0556d7ae',
               jalan: 'Jl. Kelapa Muda, NO 14',
            }
         ],
         roleDeveloper: {
            roleDeveloperId: '0f9a1de3-8e37-42a5-8ff6-6202f3ca8c1d',
            roleDeveloperName: 'Fullstack Developer',
         },
         clients:[
            {
               clientId: 'fd66392c-b2b8-4f39-a7f2-0a4a8f35995d',
               clientName: 'PT Azec Indonesia Management Services',
            }
         ],
         about: 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu'
      }
   }),
   getters:{
      getPhotoUrl(state){
         return state.currentUser.photoUrl;
      }
   }
})