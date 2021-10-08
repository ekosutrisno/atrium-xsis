<template>
  <Disclosure as="nav">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-1 flex items-center sm:items-stretch sm:justify-start">
          <router-link to="/" class="flex-shrink-0 font-semibold text-color-gray-lightest flex items-center text-2xl">
             <span class="text-indigo-300 font-semibold">AT</span>RIUM
          </router-link>
          <div class="hidden sm:block sm:ml-6 with-transition">
            <div class="flex space-x-4">
              <router-link 
                  v-for="item in navigation" 
                  :key="item.name" 
                  :to="item.href" 
                  @click="setCurrentActiveNav(item.currentId)"
                  :class="[item.currentId === currentNav ? 'bg-color-dark-gray-darkest text-white' : 'text-gray-300 hover:bg-color-dark-gray-dark hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium', item.currentId === 5 ? userRole === '6' ? 'hidden' : 'hidden sm:block': '']" 
                  :aria-current="item.currentId === currentNav ? 'page' : undefined"
              >
              {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button class="bg-gray-800 p-1 rounded-full cursor-default sm:cursor-pointer text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#25BDAE]">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative z-50">
            <div>
              <MenuButton class="dark:bg-gray-800 z-0 flex cursor-default sm:cursor-pointer text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#25BDAE]">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" :src="photoUrl" alt="profile-avatar" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg overflow-hidden bg-color-gray-lightest dark:bg-color-dark-gray-dark ring-1 ring-color-gray-dark dark:ring-color-dark-black-default ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <router-link to="/u/0/settings" :class="[active ? 'bg-gray-100 dark:bg-color-dark-gray-darker' : '', 'block px-4 py-3 text-sm text-color-gray-darkest dark:text-color-gray-light']">User settings</router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button @click="onLogoutAction" :class="[active ? 'bg-gray-100 dark:bg-color-dark-gray-darker' : '', 'inline-flex w-full px-4 py-3 text-sm text-color-gray-darkest dark:text-color-gray-light']">Sign out</button>
                </MenuItem>
                <MenuItem>
                  <router-link to="#" :class="['px-4 py-2 flex flex-col bg-color-gray-light dark:bg-color-dark-gray-darkest rounded-b-md text-color-dark-gray-darkest dark:text-color-gray-light']">
                     <span class="text-sm"> {{ loginAsInfo.fullName }} </span>
                     <span class="text-xs"> {{ loginAsInfo.email }} </span>
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

<script lang="ts">
import { computed, reactive, toRefs, defineComponent } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/outline'
import { useAuthStore, useUserStore } from '../services'
import { useRouter } from 'vue-router'

const navigation = [
  { name: 'Dashboard', href: '/u/0/dashboard', currentId: 1 },
  { name: 'Projects', href: '/u/0/project', currentId: 2 },
  { name: 'Timesheets', href: '/u/0/timesheet', currentId: 3 },
  { name: 'Vacancy', href: '/u/0/vacancy', currentId: 4 },
  { name: 'Admin View', href: '/a/0/dashboard', currentId: 5 },
]

export default defineComponent({
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
    const userStore = useUserStore();
    const authStore = useAuthStore();
    const router = useRouter();

    const state = reactive({
      navigation: navigation,
      currentNav: 1,
      open: false,
      photoUrl:computed(()=> userStore.getPhotoUrl),
      loginAsInfo: computed(()=>userStore.getLoginAsInfo),
      userRole: computed(() => localStorage.getItem('_role'))
    })

    const setCurrentActiveNav = (current: number): void => {
      state.currentNav = current;
    }

    const onLogoutAction = () => {
      localStorage.removeItem('_uid');
      authStore.onLogoutAction();
      router.replace('/user/login');
    }

    return {
      ...toRefs(state),
      setCurrentActiveNav,
      onLogoutAction
    }
  },
})
</script>