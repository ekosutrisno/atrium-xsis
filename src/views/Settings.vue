<template>
  <div class="inline-flex space-x-4">
    <button
      type="button"
      @click="togleDarkLightMode('light')"
      class="dark:text-yellow-300 text-white p-2 bg-indigo-500 rounded-md"
    >
      Light
    </button>
    <button
      type="button"
      @click="togleDarkLightMode('dark')"
      class="dark:text-yellow-300 text-white p-2 bg-purple-500 rounded-md"
    >
      Dark
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUtilityStore } from "../services/useUtilityStore";

export default defineComponent({
  setup() {
    const utilityStore = useUtilityStore();

    const togleDarkLightMode = (value: string): void => {
      utilityStore.setTheme(value);
    };

    return {
      togleDarkLightMode
    };
  },
});
</script>