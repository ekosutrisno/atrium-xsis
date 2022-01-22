<template>
    <div class="text-color-dark-black-default relative mt-4 md:mt-2 flex flex-col-reverse sm:flex-row items-start justify-between dark:text-color-gray-lightest">
        <div class="text-color-gray-darkest mt-4 dark:text-color-gray-default flex flex-col md:mt-1 space-y-3">
            <div class="flex flex-col">
                <p class="text-sm">Client Name</p>
                <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ client.name }}</p>
            </div>
            <div class="flex flex-col">
                <p class="text-sm">Email</p>
                <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ client.email }}</p>
            </div>
            <div class="flex flex-col">
                <p class="text-sm">Contact</p>
                <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ client.telephone }}</p>
            </div>
            <div class="flex flex-col">
                <p class="text-sm">Country</p>
                <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ client.country }}</p>
            </div>
            <div class="flex flex-col">
                <p class="text-sm">Kota Provinsi</p>
                <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ `${client.kota}, ${client.provinsi}` }}</p>
            </div>
            <div class="flex flex-col">
                <p class="text-sm">Website</p>
                <a v-if="client.website" :href="client.website" class="text-color-custome inline-flex items-center" target="_blank" rel="noopener noreferrer">
                    {{client.website}}
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 ml-2 text-indigo-300 text-opacity-50 hover:text-opacity-100" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                </a>
                <span v-else>-</span>
            </div>
            <div class="flex flex-col">
                <p class="text-sm">Address</p>
                <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ client.address }}</p>
            </div>
            <div class="flex flex-col">
                <p class="text-sm">About</p>
                <p class="text-color-dark-gray-darker dark:text-color-gray-light">{{ client.description }}</p>
            </div>
        </div>
        <div v-if="client.image" class="h-60 w-full md:max-w-md md:absolute md:top-4 md:right-0 overflow-hidden rounded-md shadow-md">
            <img class="h-full w-full object-cover" :src="client.image" :alt="client.clientId">
        </div>
        <div v-else class="h-full w-full sm:w-auto flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div class="space-y-1 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="flex text-sm text-gray-600">
                <p class="pl-1 text-label">No client image</p>
            </div>
        </div>
    </div>
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IClient } from '@/types/InterfaceType'

export default defineComponent({
    props:{
        client:{
            type: Object as ()=> IClient,
            required: true
        }
    },
})
</script>

<style scoped>

</style>