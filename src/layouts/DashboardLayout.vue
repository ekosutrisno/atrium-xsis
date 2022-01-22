<template>
<div class="h-full with-scroll antialiased font-quicksand flex min-h-screen flex-col justify-between bg-color-gray-lighter dark:bg-color-dark-black-darker">
   <header class="w-full bg-color-dark-black-default h-64 p-4">
       <NavHeader/>
   </header>

   <div class="flex-1 w-full mx-auto p-4 sm:p-8 -mt-44 max-w-7xl pb-20 md:pb-0">
      <router-view />
   </div>
   <footer class="text-xs hidden sm:block text-color-gray-darker p-3 pb-5 text-center">
      &copy;Eko Sutrisno {{new Date().getFullYear()}}
   </footer>
   <NavBottom/>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBottom from '@/components/NavBottom.vue'
import NavHeader from '@/components/NavHeader.vue'

export default defineComponent({
  components: { NavHeader, NavBottom },
   setup () {
      return {}
   }
})
</script>