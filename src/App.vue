<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, onMounted} from 'vue';
import { useUtilityStore } from './services/useUtilityStore';

export default defineComponent({
  name: 'App',
  setup(){
    const utilityStore = useUtilityStore();
    onMounted(()=> utilityStore.wathThemeSelected());
  }

})
</script>