<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from "vue";
import {
  useAuthStore,
  useClientStore,
  useRoleStore,
  useUtilityStore,
  useVacancyStore,
} from "./services";

export default defineComponent({
  setup() {
    const utilityStore = useUtilityStore();
    const authStore = useAuthStore();
    const roleStore = useRoleStore();
    const clientStore = useClientStore();
    const vacancyStore = useVacancyStore();

    onBeforeMount(() => authStore.authState());
    onMounted(() => {
      // Check Theme Selected
      utilityStore.wathcThemeSelected();

      // Insert Role Master if not present
      roleStore.init();

      // Insert Default Client Data
      clientStore.init();
      
      //Insert Vacancy Default
      vacancyStore.insertInitVancancy();
    });
  },
});
</script>