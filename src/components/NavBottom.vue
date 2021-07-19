<template>
  <Disclosure as="nav">
    <div class="max-w-7xl with-transition w-full sm:hidden bg-color-dark-black-default mx-auto sm:px-6 lg:px-8 fixed bottom-0">
        <div class="flex-1 flex items-center justify-around">
          <router-link to="/u/0/dashboard" class="text-white w-full cursor-default hover:text-[#d3adf7] transition-all px-3 py-2 text-xs font-medium flex flex-col space-y-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>Dashboard</span>
          </router-link>
          <router-link to="/u/0/project" class="text-white w-full cursor-default hover:text-[#d3adf7] transition-all px-3 py-2 text-xs font-medium flex flex-col space-y-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            <span>Project</span>
          </router-link>
          <router-link to="/u/0/timesheet" class="text-white w-full cursor-default hover:text-[#d3adf7] transition-all px-3 py-2 text-xs font-medium flex flex-col space-y-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            <span>Timesheet</span>
          </router-link>
        </div>
    </div>
  </Disclosure>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
const navigation = [
  { name: 'Dashboard', href: '/u/0/dashboard', current: true },
  { name: 'Projects', href: '/u/0/project', current: false },
  { name: 'Timesheets', href: '#', current: false }
]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
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
