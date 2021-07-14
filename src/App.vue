<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { togleDarkLightMode } from './utils/helperFunction';

export default defineComponent({
  name: 'App',
  beforeMount(){
    togleDarkLightMode();
  }
})
</script>