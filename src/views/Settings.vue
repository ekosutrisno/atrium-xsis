<template>
  <div>
    <button 
      type="button" 
      @click="togleDarkLightMode"
      class="dark:text-color-gray-light"
    >LighOrDark</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {togleDarkLightMode} from '../utils/helperFunction';

export default defineComponent({
  setup() {
  

    return {
       togleDarkLightMode
    };
  },
});
</script>