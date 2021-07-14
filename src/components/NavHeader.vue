<template>
  <Disclosure as="nav">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-1 flex items-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 font-semibold text-indigo-400 flex items-center text-2xl">
             ATRIUM
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-color-dark-gray-darkest text-white' : 'text-gray-300 hover:bg-color-dark-gray-dark hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative z-50">
            <div>
              <MenuButton class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" src="https://res.cloudinary.com/ekosutrisno/image/upload/v1625803063/avatars/MyAvatar_taylrm.png" alt="profile-avatar" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg pt-1 bg-color-dark-gray-dark ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <router-link to="/" :class="[active ? 'bg-color-dark-gray-darker' : '', 'block px-4 py-2 text-sm text-color-gray-light']">Your Profile</router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <router-link to="/" :class="[active ? 'bg-color-dark-gray-darker' : '', 'block px-4 py-2 text-sm text-color-gray-light']">Settings</router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <router-link to="/" :class="[active ? 'bg-color-dark-gray-darker' : '', 'block px-4 py-2 text-sm text-color-gray-light']">Sign out</router-link>
                </MenuItem>
                <MenuItem>
                  <router-link to="/" :class="['px-4 py-2 mt-5 flex flex-col bg-color-dark-gray-darkest rounded-b-md text-color-gray-light']">
                     <span class="text-xs">Eko Sutrisno</span>
                     <span class="text-[11px]">eko.sutrisno@xsis.co.id</span>
                  </router-link>
                </MenuItem>
                
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon} from '@heroicons/vue/outline'

const navigation = [
  { name: 'Dashboard', href: '/u/0/dashboard', current: true },
  { name: 'Projects', href: '/u/0/project', current: false },
  { name: 'Timesheets', href: '/u/0/timesheet', current: false }
]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
  },
  setup() {
    const state = reactive({
      navigation: navigation,
      open: false
    })

    return {
      ...toRefs(state)
    }
  },
}
</script>