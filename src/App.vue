<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from "vue";
import { useAuthStore, useTimesheetStore, useUtilityStore } from "./services";

export default defineComponent({
  name: "App",
  setup() {
    const timehseetStore = useTimesheetStore();
    const utilityStore = useUtilityStore();
    const authStore = useAuthStore();

    onBeforeMount(() => authStore.authState());
    onMounted(() => {
      utilityStore.wathcThemeSelected();
      timehseetStore.generateTimesheetTemplate(localStorage.getItem('_uid') as string)
    });
  },
});
</script>