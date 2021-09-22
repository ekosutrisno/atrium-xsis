import { collection, doc, getDocs, setDoc } from "@firebase/firestore";
import { defineStore } from "pinia";
import { IClient } from "../types/InterfaceType";
import { db } from "./useFirebaseService";

interface ClientStoreState {
   clients: IClient[]
}

export const useClientStore = defineStore({
   id: 'useClientStore',

   state: (): ClientStoreState => ({
      clients: [] as IClient[],
   }),

   actions: {
      /**
       * @returns Promise
       * Insert Default initial Client
       */
      async insertInitClient(): Promise<void> {
         // Database Ref
         const dbRef = collection(db, 'tbl_clients');

         // Default Payload
         const clients: IClient[] = [
            {
               clientId: '1',
               clientName: 'PT Erajaya Swasembada',
               clientAddress: 'JL Bandengan Selatan',
               clientCountry: 'Indonesia',
               clientKota: 'Jakarta Barat',
               clientProvinsi: 'DKI Jakarta',
               createdDate: Date.now(),
               lastModifiedDate: Date.now()
            },
            {
               clientId: '2',
               clientName: 'PT Astra International',
               clientAddress: 'JL Jendral Sutrisno',
               clientCountry: 'Indonesia',
               clientKota: 'Jakarta Selatan',
               clientProvinsi: 'DKI Jakarta',
               createdDate: Date.now(),
               lastModifiedDate: Date.now()
            },
            {
               clientId: '3',
               clientName: 'PT Telkom Indonesia',
               clientAddress: 'JL Pangeran Antasari, SCBD',
               clientCountry: 'Indonesia',
               clientKota: 'Jakarta Pusat',
               clientProvinsi: 'DKI Jakarta',
               createdDate: Date.now(),
               lastModifiedDate: Date.now()
            },
            {
               clientId: '4',
               clientName: 'Bank Indonesia',
               clientAddress: 'Jl. M.H. Thamrin No.2, RT.2/RW.3, Gambir, Kecamatan Gambir',
               clientCountry: 'Indonesia',
               clientKota: 'Jakarta Pusat',
               clientProvinsi: 'DKI Jakarta',
               createdDate: Date.now(),
               lastModifiedDate: Date.now()
            },
            {
               clientId: '5',
               clientName: '__IDLE__',
               clientAddress: 'Jl. Dr. Satrio Lt 25',
               clientCountry: 'Indonesia',
               clientKota: 'Jakarta Pusat',
               clientProvinsi: 'DKI Jakarta',
               createdDate: Date.now(),
               lastModifiedDate: Date.now()
            },
            {
               clientId: '6',
               clientName: '__BOOTCAMP__',
               clientAddress: 'Jl. Dr. Satrio Lt 25',
               clientCountry: 'Indonesia',
               clientKota: 'Jakarta Pusat',
               clientProvinsi: 'DKI Jakarta',
               createdDate: Date.now(),
               lastModifiedDate: Date.now()
            },
         ]

         // Get all and check if data alerady exist
         getDocs(dbRef)
            .then(async (snapshot) => {

               // Insert if data not present
               if (snapshot.empty) {
                  clients.forEach(async (client) => await setDoc(doc(db, 'tbl_clients', client.clientId), client))
               }
            })
      },

      async addClient(client: IClient) {

      },

      async updateClient(client: IClient) {

      },

      async deleteClient(clientId: IClient[ 'clientId' ]) {

      },

      /**
       * Init Calling insertInitClient ()
       */
      async init() {
         await this.insertInitClient();
      }

   }
})