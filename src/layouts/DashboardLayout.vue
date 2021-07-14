<template>
<div class="h-full font-quicksand flex min-h-screen flex-col justify-between bg-color-dark-black-darker">
   <header class="w-full bg-color-dark-black-default h-64 p-4">
       <NavHeader/>
   </header>

   <div class="flex-1 w-full mx-auto p-4 sm:p-8 -mt-44 max-w-7xl">
      <router-view/>
   </div>
   <footer class="text-sm text-color-gray-darker p-3 text-center">
      &copy;Exoapp Corporation {{new Date().getFullYear()}}
   </footer>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavHeader from '../components/NavHeader.vue'

export default defineComponent({
  components: { NavHeader },
   setup () {
      

      return {}
   }
})
</script>