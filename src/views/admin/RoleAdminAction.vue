<template>
  <div class="wrapper min-h-screen pb-10 bg-color-gray-lighter dark:bg-color-dark-black-darker">
    <header class="bg-color-gray-lighter dark:bg-color-dark-gray-darker shadow sticky top-0 z-20">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <h1 class="text-lg md:text-3xl font-bold text-color-dark-gray-darkest dark:text-color-dark-gray-lightest">
        Role Management
      </h1>
      <div class="inline-flex items-center space-x-3">
        <button  type="button"  class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span class="ml-2 hidden sm:block">New Role</span> 
        </button>
        <button type="button"  class="hidden items-center px-4 py-2 cursor-default sm:cursor-pointer border border-gray-300 dark:border-color-gray-darkest rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-color-gray-lighter bg-white dark:bg-color-gray-darkest dark:hover:bg-color-dark-gray-darker hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
    <div class="max-w-7xl mx-auto px-4">
      <!-- Replace with your content -->
        <div>
          <div class="mt-4">
            <p class="text-color-custome inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              Main Role
            </p>
            <p class="text-label text-sm">Main Role is a role that is used to restrict or grant access to administrative features.</p>
          </div>
          <ul v-if="mainRoles.length" class="py-4 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            <li v-for="mainRole in mainRoles" :key="mainRole.roleId">
              <MainRoleCard :role="mainRole"/>
            </li>
          </ul>
          <div v-else class="flex flex-col with-transition space-y-8 items-center justify-center py-10 border-b border-opacity-30">
              <div class="flex flex-col items-center space-y-1">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 class="font-semibold dark:text-color-gray-lighter">No Main Role</h3>
                  <p class="text-sm text-gray-700 dark:text-gray-400">Get started by create main role first.</p>
              </div>
            <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="ml-2">Create Main Role</span>
            </button>
          </div>
        </div>

        <div>
           <div class="mt-4">
            <p class="text-color-custome inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Developer Role
            </p>
            <p class="text-label text-sm">Developer Role is a role that is used to identify the job position of the employee.</p>
          </div>
          <ul v-if="developerRoles.length" class="py-4 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            <li v-for="devRole in developerRoles" :key="devRole.roleDeveloperId">
              <DeveloperRoleCard :role="devRole"/>
            </li>
          </ul>
           <div v-else class="flex flex-col with-transition space-y-8 items-center justify-center pt-10">
                <div class="flex flex-col items-center space-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 class="font-semibold dark:text-color-gray-lighter">No Developer Role</h3>
                    <p class="text-sm text-gray-700 dark:text-gray-400">Get started by create developer role first.</p>
                </div>
              <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="ml-2">Create Developer Role</span>
              </button>
            </div>
        </div>
      <!-- /End replace -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import DeveloperRoleCard from '@/components/cards/admin/DeveloperRoleCard.vue';
import MainRoleCard from '@/components/cards/admin/MainRoleCard.vue';
import Spinner from '@/components/modal/Spinner.vue';
import { useRoleStore } from '@/services'
export default defineComponent({
  components: { MainRoleCard, DeveloperRoleCard, Spinner },
  setup () {
    const roleStore = useRoleStore();

    const state = reactive({
      mainRoles: computed(()=> roleStore.mainRole),
      developerRoles: computed(()=> roleStore.developerRole)
    })

    onMounted(async ()=> {
      await roleStore.getAllMainRole();
      await roleStore.getAllDeveloperRole();
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>

</style>