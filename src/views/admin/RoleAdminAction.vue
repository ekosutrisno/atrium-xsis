<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">
        Role Management
      </h1>
      <router-link to="/a/0/dashboard" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span class="ml-2">Admin View</span> 
        </router-link>
    </div>
  </header>
  <div class="max-w-7xl mx-auto px-8">
    <!-- Replace with your content -->
    <div class="py-4">
       <p v-for="mainRole in mainRoles" :key="mainRole.roleId">
         {{ mainRole.roleName }}
       </p>
       <p v-for="devRole in developerRoles" :key="devRole.roleDeveloperId">
         {{ devRole.roleDeveloperName }}
       </p>
    </div>
    <!-- /End replace -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoleStore } from '../../services'

export default defineComponent({
  setup () {
    const roleStore = useRoleStore();

    const state = reactive({
      mainRoles: computed(()=> roleStore.mainRole),
      developerRoles: computed(()=> roleStore.developerRole),
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