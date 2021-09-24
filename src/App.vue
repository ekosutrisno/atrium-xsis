<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from "vue";
import { useAuthStore, useStatisticStore, useUtilityStore } from "./services";

export default defineComponent({
  setup() {
    const utilityStore = useUtilityStore();
    const authStore = useAuthStore();
    const statisticStore = useStatisticStore();
    // const roleStore = useRoleStore();
    // const clientStore = useClientStore();
    // const vacancyStore = useVacancyStore();

    onBeforeMount(() => authStore.authState());
    onMounted(async () => {
      // Check Theme Selected
      utilityStore.wathcThemeSelected();

      // Listen All Snapshot Timesheet Data
      await statisticStore.onSnapshotRealtimeUpdateStatistic();

      // Insert Role Master if not present
      //roleStore.init();

      // Insert Default Client Data
      //clientStore.init();

      //Insert Vacancy Default
      //vacancyStore.insertInitVancancy();
    });
  },
});
</script>