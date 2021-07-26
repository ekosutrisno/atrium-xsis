<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="lg:flex lg:items-center lg:justify-between bg-color-gray-lightest dark:bg-color-dark-gray-darker dark:text-color-gray-light md:cursor-pointer hover:shadow-2xl hover:ring-1 hover:ring-indigo-400 hover:ring-opacity-75 transition-all border border-gray-200 dark:border-color-gray-darkest rounded-md p-4">
    <div class="flex-1 min-w-0">
      <h2 class="text-lg font-bold leading-7 text-color-gray-darkest dark:text-color-gray-lighter sm:text-xl sm:truncate">
        {{ vacancy.vacancyName }}
      </h2>
      <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
        <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-color-gray-light">
          <BriefcaseIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          {{ vacancy.isFullTimeJob ? 'Full-time' : '-' }}
        </div>
        <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-color-gray-light">
          <LocationMarkerIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
           {{ vacancy.isRemoteJob ? 'Remote' : '-' }}
        </div>
        <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-color-gray-light">
          <CurrencyDollarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          {{ `Rp${vacancy.minSalaryOffer}K` }} &ndash; {{ `Rp${vacancy.maxSalaryOffer}K` }}
        </div>
        <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-color-gray-light">
          <QrcodeIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          {{ vacancy.vacancyCode }} | {{ vacancy.vacancyType }}
        </div>
        <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-color-gray-light">
          <CalendarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          Closing on {{ formatDateWithMonth(vacancy.offerEndDate) }}
        </div>
      </div>
    </div>
    <div class="mt-5 flex lg:mt-0 lg:ml-4">
      <span class="hidden sm:block ml-3">
        <button @click="goToVacancyDetail" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <LinkIcon class="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          View
        </button>
      </span>

      <span class="sm:ml-3">
        <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <CheckIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Apply
        </button>
      </span>

      <!-- Dropdown -->
      <Menu as="span" class="ml-3 relative sm:hidden">
        <MenuButton class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          More
          <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
        </MenuButton>

        <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuItem v-slot="{ active }">
              <router-link :to="{name: 'VacancyDetail', params:{ vacancyId: vacancy.vacancyId }}" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">View</router-link>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  PencilIcon,
  QrcodeIcon
} from '@heroicons/vue/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { IJobVacancy } from '../../types/InterfaceType';
import { formatDateWithMonth } from '../../utils/helperFunction';
import { useRouter } from 'vue-router';

export default defineComponent({
  props:{
    vacancy:{
      type: Object as ()=> IJobVacancy,
      required: true
    }
  },
  components: {
      Menu,
      MenuButton,
      MenuItem,
      MenuItems,
      BriefcaseIcon,
      CalendarIcon,
      CheckIcon,
      ChevronDownIcon,
      CurrencyDollarIcon,
      LinkIcon,
      LocationMarkerIcon,
      PencilIcon,
      QrcodeIcon
    },

    setup(props){
      const router = useRouter();

      const goToVacancyDetail = ()=>{
        router.push({
          name: 'VacancyDetail', 
          params:{ vacancyId: props.vacancy.vacancyId}}
        );
      }

      return{
        formatDateWithMonth,
        goToVacancyDetail
      }
    }
})

</script>