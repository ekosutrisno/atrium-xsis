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
                  :class="[item.currentId === currentNav ? 'bg-color-dark-gray-darkest text-white' : 'text-gray-300 hover:bg-color-dark-gray-dark hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" 
                  :aria-current="item.currentId === currentNav ? 'page' : undefined"
              >
              {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Notification dropdown -->
          <Menu as="div" class="ml-3 relative z-50">
            <div>
              <MenuButton class="bg-gray-800 p-1 relative rounded-full cursor-default sm:cursor-pointer text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-400">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
                <div 
                  v-if="haveNotification.length" 
                  class="bg-indigo-500 text-white absolute -top-0.5 -right-2 rounded-full h-4 w-4 p-1 flex items-center justify-center text-xs">
                    {{haveNotification.length <= 3 ? haveNotification.length : `3+`}}
                </div>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
              <MenuItems class="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg overflow-hidden bg-color-gray-lightest dark:bg-color-dark-gray-dark ring-1 ring-color-gray-dark dark:ring-color-dark-black-default ring-opacity-5 focus:outline-none">
                <MenuItem v-for="notif in haveNotification" :key="notif.timestamp" v-slot="{ active }">
                  <router-link to="/u/0/settings" :class="[active ? 'bg-gray-100 dark:bg-color-dark-gray-darker' : '', 'inline-flex items-start space-x-2 w-full px-4 py-3 text-color-gray-darkest dark:text-color-gray-light']">
                    <BellIcon class="h-6 w-6 text-indigo-300" aria-hidden="true" />
                    <div class="flex flex-col">
                      <span class="text-xs font-semibold">{{ notif.text }}</span>
                      <span class="text-xs text-gray-300">{{ notif.data }}</span>
                    </div>
                  </router-link>
                </MenuItem>

                <!-- TODO integrate with notification service-->

              </MenuItems>
            </transition>
          </Menu>

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative z-50">
            <div>
              <MenuButton class="dark:bg-gray-800 z-0 flex cursor-default sm:cursor-pointer text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-400">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" :src="photoUrl" alt="profile-avatar" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
              <MenuItems class="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg overflow-hidden bg-color-gray-lightest dark:bg-color-dark-gray-dark ring-1 ring-color-gray-dark dark:ring-color-dark-black-default ring-opacity-5 focus:outline-none">
                <MenuItem>
                  <div :class="['p-4 relative h-full flex flex-col space-y-2 items-center justify-center bg-color-gray-lightest border-b border-b-color-gray-light dark:border-b-transparent dark:bg-color-dark-gray-darkest text-color-dark-gray-darkest dark:text-color-gray-light']">
                     <img class="w-14 h-14 object-cover border border-gray-300 dark:border-gray-600 rounded-full" :src="photoUrl" alt="avatar-drop-menu">
                     <div class="text-center">
                       <p class=""> {{ loginAsInfo.fullName }} </p>
                       <p class="text-sm"> {{ loginAsInfo.email }} </p>
                     </div>
                     <Svg2 aria-hidden="true" class="absolute -top-2"/>
                     <button type="button" class="absolute top-2 right-5">
                        <svg v-if="theme == 'dark'" @click="togleDarkLightMode('light')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#9a6fc3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <svg v-if="theme == 'light'" @click="togleDarkLightMode('dark')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#9a6fc3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                     </button>
                  </div>
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <router-link to="/u/0/settings" :class="[active ? 'bg-gray-100 dark:bg-color-dark-gray-darker' : '', 'inline-flex items-center space-x-2 w-full px-4 py-3 text-color-gray-darkest dark:text-color-gray-light']">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="text-gray-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>User settings</span>
                  </router-link>
                </MenuItem>
                <MenuItem v-if="!notAdmin" v-slot="{ active }">
                  <router-link to="/a/0/dashboard" :class="[active ? 'bg-gray-100 dark:bg-color-dark-gray-darker' : '', 'inline-flex items-center space-x-2 w-full px-4 py-3 text-color-gray-darkest dark:text-color-gray-light']">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="text-gray-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Admin Views</span>
                  </router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <router-link to="/user/help" :class="[active ? 'bg-gray-100 dark:bg-color-dark-gray-darker' : '', 'inline-flex items-center space-x-2 w-full px-4 py-3 text-color-gray-darkest dark:text-color-gray-light']">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="text-gray-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Help</span>
                  </router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button @click="onLogoutAction" :class="[active ? 'bg-gray-100 dark:bg-color-dark-gray-darker' : '', 'inline-flex items-center space-x-2 w-full px-4 py-3 text-color-gray-darkest dark:text-color-gray-light']">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="text-gray-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign out</span>
                  </button>
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
import { useAuthStore, useNotificationStore, useUserStore, useUtilityStore } from '../services'
import { useRouter } from 'vue-router'
import Svg2 from './svg/Svg2.vue'

const navigation = [
  { name: 'Dashboard', href: '/u/0/dashboard', currentId: 1 },
  { name: 'Projects', href: '/u/0/project', currentId: 2 },
  { name: 'Timesheets', href: '/u/0/timesheet', currentId: 3 },
  { name: 'Vacancy', href: '/u/0/vacancy', currentId: 4 }
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
    Svg2,
  },
  setup() {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    const utilityStore = useUtilityStore();
    const notificationStore = useNotificationStore();
    const router = useRouter();

    const state = reactive({
      open: false,
      currentNav: 1,
      navigation: navigation,
      theme: computed(() => utilityStore.theme),
      photoUrl: computed(()=> userStore.getPhotoUrl),
      loginAsInfo: computed(()=>userStore.getLoginAsInfo),
      userRole: computed(() => localStorage.getItem('_role')),
      haveNotification:  computed(()=> notificationStore.notifications),
    })

    const setCurrentActiveNav = (current: number): void => {
      state.currentNav = current;
    }

    const togleDarkLightMode = (value: string): void => {
      utilityStore.setToggleTheme(value);
    };

    const notAdmin = computed(()=> {
      const exclude = ['6','7'];
      return exclude.includes(state.userRole as string);
    })

    const onLogoutAction = () => {
      localStorage.removeItem('_uid');
      authStore.onLogoutAction();
      router.replace('/user/login');
    }

    return {
      ...toRefs(state),
      notAdmin,
      setCurrentActiveNav,
      togleDarkLightMode,
      onLogoutAction
    }
  },
})
</script>