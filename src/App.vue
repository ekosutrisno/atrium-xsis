<template>
  <router-view />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
} from "vue";
import { useAuthStore, useStatisticStore, useUtilityStore } from "./services";

export default defineComponent({
  setup() {
    const utilityStore = useUtilityStore();
    const authStore = useAuthStore();
    const statisticStore = useStatisticStore();
    // const roleStore = useRoleStore();
    // const clientStore = useClientStore();
    // const vacancyStore = useVacancyStore();

    const state = reactive({
      uid: computed(() => localStorage.getItem("_uid") as string),
    });

    onBeforeMount(() => authStore.authState());
    onMounted(async () => {
      // Check Theme Selected
      utilityStore.wathcThemeSelected();

      // Check Connectivity
      utilityStore.checkConnectifity();

      if (state.uid) {
        // Check and Generate if not exist (By Year)
        // await statisticStore.registerStatistic(state.uid, FlagUseOn.GENERATION);

        // Listen All Snapshot Timesheet Data
        await statisticStore.onSnapshotRealtimeUpdateStatistic();
      }

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