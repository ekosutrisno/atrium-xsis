<template>
  <div class="font-quicksand">
    <Disclosure as="nav" class="bg-color-dark-gray-darkest">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
               <router-link to="/" class="flex-shrink-0 font-semibold text-color-gray-lightest flex items-center text-2xl">
                  <span class="text-indigo-300 font-semibold">AT</span>RIUM ADMIN
               </router-link>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
              </div>
            </div>
          </div>
          <span class="py-1 px-3 text-white bg-indigo-400 rounded-full text-sm font-semibold">
              Admin View
          </span>
        </div>
      </div>
    </Disclosure>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/outline'
import { useUserStore } from '../services';

const navigation = [
  { name: 'Main Dashboard', href: '/u/0/dashboard', current: true }
]

export default defineComponent({
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    BellIcon,
  },
  setup() {
     const userStore = useUserStore();

     const state = reactive({
         photoUrl:computed(()=> userStore.getPhotoUrl),
         loginAsInfo: computed(()=>userStore.getLoginAsInfo),
     })

    return {
       ...toRefs(state),
      navigation,
    }
  },
})
</script>