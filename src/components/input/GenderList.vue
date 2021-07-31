<template>
  <div class="w-full">
    <Listbox v-model="selectedPerson">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full py-2 pr-10 text-left dark:text-color-gray-lightest text-sm border-gray-300 rounded-md sm:text-sm">
          <span class="block truncate">{{ selectedPerson.gender }}</span>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute w-full py-1 mt-1 overflow-auto text-base  bg-white dark:bg-color-dark-gray-darker dark:ring-opacity-20 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              @click="setGender"
              v-slot="{ active, selected }"
              v-for="person in people"
              :key="person.gender"
              :value="person"
              as="template"
            >
              <li
                :class="[
                  active ? 'text-amber-900 bg-amber-100' : 'text-gray-900 dark:text-color-gray-lighter',
                  'cursor-default select-none relative py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ person.gender }}</span
                >
                <span
                  v-if="selected || (person.gender === selectedPerson.gender)"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="w-5 h-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import { useUserStore } from '../../services';
import { Gender } from '../../types/EnumType';

export default defineComponent({
   components: {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    SelectorIcon,
  },

   setup() {

    const userStore = useUserStore(); 
    const people = [
      { gender: Gender.LAKI_LAKI },
      { gender: Gender.PEREMPUAN },

    ]
    const selectedPerson = ref({gender: computed(()=>userStore.currentUser.gender as string)})
    const setGender = ()=>{
      userStore.$patch((state)=> state.gender = selectedPerson.value.gender);
    }

    return {
      people,
      selectedPerson,
      setGender
    }
  },
})
</script>
