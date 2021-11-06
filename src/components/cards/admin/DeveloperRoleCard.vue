<template>
    <div class="cursor-pointer h-auto with-transition relative overflow-hidden bg-color-gray-lightest dark:bg-color-dark-gray-darker dark:text-color-gray-light md:cursor-pointer hover:shadow-xl hover:ring-1 hover:ring-indigo-400 hover:ring-opacity-75 transition-all border border-gray-200 dark:border-color-gray-darkest rounded-md p-3 flex flex-col space-y-2 sm:space-y-0 sm:flex-row items-start justify-between">
        <div>{{ role.roleDeveloperName }}</div>
        <div>{{ role.roleDeveloperSalary }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent,  } from 'vue'
import { IRoleDeveloper } from '../../../types/InterfaceType'

export default defineComponent({
    props:{
        role:{
            type: Object as ()=> IRoleDeveloper ,
            required: true
        }
    }
})
</script>