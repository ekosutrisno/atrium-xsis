<template>
<div class="wrapper min-h-screen pb-10 bg-color-gray-lighter dark:bg-color-dark-black-darker">
<!-- Slide Over -->
  <ClientSlideOver 
    :open="open" 
    :client="currentSelectedClient" 
    @on-close="toggleSlider" 
  />
<!-- End Slide Over -->

  <header class="bg-color-gray-lighter dark:bg-color-dark-gray-darker shadow sticky top-0 z-20">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <h1 class="text-lg md:text-3xl font-bold text-color-dark-gray-darkest dark:text-color-dark-gray-lightest">
        Client Management
      </h1>
      <div class="inline-flex items-center space-x-3">
        <button v-if="!onClientDetail" type="button" @click="toggleNewClient('new_client')" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span class="ml-2 hidden sm:block">New client</span> 
        </button>
        <button v-else type="button" @click="toggleCancel" class="inline-flex items-center px-4 py-2 cursor-default sm:cursor-pointer border border-gray-300 dark:border-color-gray-darkest rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-color-gray-lighter bg-white dark:bg-color-gray-darkest dark:hover:bg-color-dark-gray-darker hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               Cancel
        </button>
        <router-link to="/a/0/dashboard" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span class="ml-2 hidden sm:block">Admin View</span> 
        </router-link>
      </div>
    </div>
  </header>
  <div v-if="onClientDetail" class="max-w-7xl with-transition mx-auto px-4 pt-6 lg:px-8">
    <NewClientInputCard 
      @after-save="afterSaved"
      :status="statusCreated" 
      :clientData="currentUpdateSelectedClient"
    />
  </div>
  <div v-else class="max-w-7xl with-transition mx-auto px-4 lg:px-8">
    <div class="flex items-center max-w-screen-sm mx-auto my-4 pt-2">
      <label for="searh-client" class="input-custom-label">Filter Query</label>
      <input 
        placeholder="Type client name..."
        v-model="filterQuery"
        type="search" name="searh-client" id="searh-client" autocomplete="off"
        class="input-custom-default input-custom-on-edit py-3" 
      />
    </div>
    <div v-if="clientsFiltered.length > 0" class="pt-4 grid sm:grid-cols-2 gap-2">
        <ClientCard 
          v-for="client in clientsFiltered" 
          :key="client.clientId" 
          :client="client"
          @on-edit="toggleUpdateClient"
          @on-show="setCurrentClient"
        />
    </div>
    <div v-else class="with-transition ">
        <div class="text-color-dark-gray-darkest dark:text-white p-4 mt-10 max-w-screen-sm mx-auto  text-sm flex flex-col items-center space-y-2">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 class="font-semibold">No Clients</h3>
          <p>Get started by add a new client.</p>
        </div>
        <div class="text-color-gray-lighter text-sm w-full flex items-center justify-center my-5">
          <button type="button" @click="toggleSlider" class="inline-flex justify-center space-x-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              <span>New Client</span>
          </button>
        </div>
    </div>
  </div>

</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import ClientCard from '@/components/cards/admin/ClientCard.vue';
import ClientSlideOver from '@/components/cards/admin/ClientSlideOver.vue';
import NewClientInputCard from '@/components/input/NewClientInputCard.vue';
import { useClientStore } from '@/services'
import { IClient } from '@/types/InterfaceType';

export default defineComponent({
  components: { ClientCard, ClientSlideOver, NewClientInputCard },
  setup () {
    const clientStore = useClientStore();

    const state = reactive({
      clients: computed(() => clientStore.clients),
      currentSelectedClient: {} as IClient,
      currentUpdateSelectedClient: {} as IClient,
      filterQuery: '' as string,
      onClientDetail: false,
      statusCreated: 'new_client',
      open: false
    })

    onMounted(async () => await clientStore.getAllClient());

    const afterSaved = ()=>{
       clientStore.getAllClient()
        .then(()=> toggleCancel());
    }

    const clientsFiltered = computed(() => {
         return state.clients.filter(client => client
         .name.toLowerCase()
          .includes(state.filterQuery.toLowerCase())
          )
      })

    const setCurrentClient = (client: IClient) =>{
      toggleSlider();
      state.currentSelectedClient = client;
    }

    const toggleSlider =()=>{
        state.open = !state.open;
    }

    const toggleNewClient = (status: string) => {
        state.statusCreated = status;
        state.currentUpdateSelectedClient = {} as IClient;
        state.onClientDetail = !state.onClientDetail;
    }

    const toggleUpdateClient = (payload: {status: string, data: IClient}) => {
        state.statusCreated = payload.status;
        state.currentUpdateSelectedClient = payload.data;
        state.onClientDetail = !state.onClientDetail;
    }

    const toggleCancel = ()=>{
      state.onClientDetail = !state.onClientDetail;
    }


    return {
      ...toRefs(state),
      clientsFiltered,
      afterSaved,
      setCurrentClient,
      toggleNewClient,
      toggleUpdateClient,
      toggleCancel,
      toggleSlider
    }
  }
})
</script>

<style scoped>

</style>