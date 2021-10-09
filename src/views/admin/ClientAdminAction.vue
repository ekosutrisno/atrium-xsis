<template>
<div class="wrapper min-h-screen bg-color-gray-lighter dark:bg-color-dark-black-darker">

  <header class="bg-color-gray-lighter dark:bg-color-dark-gray-darker shadow sticky top-0 z-20">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <h1 class="text-lg md:text-3xl font-bold text-color-dark-gray-darkest dark:text-color-dark-gray-lightest">
        Client Management
      </h1>
      <div class="inline-flex items-center space-x-3">
        <button type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span class="ml-2 hidden sm:block">New client</span> 
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
  <div class="flex items-center max-w-screen-sm mx-auto my-4 pt-2 px-4">
    <label for="searh-client" class="input-custom-label">Filter Query</label>
    <input 
      placeholder="Type client name..."
      v-model="filterQuery"
      type="search" name="searh-client" id="searh-client" autocomplete="off"
      class="input-custom-default input-custom-on-edit py-3" 
    />
  </div>
  <div class="max-w-7xl mx-auto px-4 lg:px-8">
    <div v-if="clientsFiltered.length > 0" class="py-4 grid sm:grid-cols-2 gap-4">
        <ClientCard 
          v-for="client in clientsFiltered" 
          :key="client.clientId" 
          :client="client"
        />
    </div>
    <div v-else class="py-4 flex flex-col max-w-screen-sm mx-auto items-center justify-center">
        <p class="text-color-dark-gray-darkest text-center dark:text-color-dark-gray-lightest">
          The client with the name <span class="font-semibold italic">{{ filterQuery }}</span> you are looking for does not seem to be found, please add it by pressing the add client button below.
        </p>
        <button type="button" class="inline-flex mt-6 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span class="ml-2">New client</span> 
        </button>

    </div>
  </div>

</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import ClientCard from '../../components/cards/admin/ClientCard.vue';
import { useClientStore } from '../../services'

export default defineComponent({
  components: { ClientCard },
  setup () {
    const clientStore = useClientStore();

    const state = reactive({
      clients: computed(() => clientStore.clients),
      filterQuery: '' as string
    })

    const clientsFiltered = computed(() => {
         return state.clients.filter(client => client
         .clientName.toLowerCase()
          .includes(state.filterQuery.toLowerCase())
          )
      })


    onMounted(async () => await clientStore.getAllClient());

    return {
      ...toRefs(state),
      clientsFiltered
    }
  }
})
</script>

<style scoped>

</style>