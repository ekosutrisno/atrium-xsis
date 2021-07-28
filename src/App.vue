<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted} from 'vue';
import { useAuthStore, useUtilityStore } from './services';

export default defineComponent({
  name: 'App',
  setup(){
    const utilityStore = useUtilityStore();
    const authStore = useAuthStore();

    onBeforeMount(()=> authStore.authState());
    onMounted(()=> utilityStore.wathcThemeSelected());
  }

})
</script>