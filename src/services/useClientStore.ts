import { collection, doc, getDocs, setDoc, updateDoc } from "@firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { IClient } from "../types/InterfaceType";
import { generateID } from "../utils/helperFunction";
import { db } from "./useFirebaseService";

const toast = useToast();

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
      async insertNewClient(client: IClient): Promise<void> {
         // Set additional data
         client.clientId = generateID();
         client.createdDate = Date.now();
         client.lastModifiedDate = client.createdDate;

         setDoc(doc(db, 'tbl_clients', client.clientId), client)
            .then(() => toast.info('New Client has been added.'))
      },

      async getAllClient(): Promise<void> {
         const clientRef = collection(db, 'tbl_clients')
         getDocs(clientRef)
            .then((snapshot) => {
               const clientTemp: IClient[] = [];

               snapshot.forEach((client) => {
                  clientTemp.push(client.data() as IClient);
               })

               this.clients = clientTemp;
            })
      },

      async updateClient(client: IClient): Promise<void> {
         // Database Ref
         const dbRef = doc(db, 'tbl_clients', client.clientId);
         client.lastModifiedDate = Date.now();

         updateDoc(dbRef, client as any)
            .then(() => toast.info('Client data has been updated.'))

      },

      async deleteClient(clientId: IClient['clientId']): Promise<void> {

      }
   }
})