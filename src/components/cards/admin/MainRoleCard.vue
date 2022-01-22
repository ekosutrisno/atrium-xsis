<template>
    <div class="cursor-pointer h-auto with-transition relative overflow-hidden bg-color-gray-lightest dark:bg-color-dark-gray-darker dark:text-color-gray-light md:cursor-pointer hover:shadow-xl hover:ring-1 hover:ring-indigo-400 hover:ring-opacity-75 transition-all border border-gray-200 dark:border-color-gray-darkest rounded-md p-3 flex items-start justify-between">
        {{ role.roleName }}
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
    </div>
</template>

<script lang="ts">
import { defineComponent,  } from 'vue'
import { IMainRole } from '@/types/InterfaceType'

export default defineComponent({
    props:{
        role:{
            type: Object as ()=> IMainRole ,
            required: true
        }
    }
})
</script>

<style scoped>

</style>