<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, onMounted} from 'vue';
import { useUtilityStore } from './services';

export default defineComponent({
  name: 'App',
  setup(){
    const utilityStore = useUtilityStore();
    onMounted(()=> utilityStore.wathcThemeSelected());
  }

})
</script>