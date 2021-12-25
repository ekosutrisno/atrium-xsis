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

    const state = reactive({
      uid: computed(() => localStorage.getItem("_uid") as string),
    });

    onBeforeMount(() => authStore.authState());
    onMounted(async () => {
      // Check Theme Selected
      utilityStore.wathcThemeSelected();

      if (state.uid) {
        // Listen All Snapshot Timesheet Data
        await statisticStore.onSnapshotRealtimeUpdateStatistic();
      }
      
    });
  },
});
</script>