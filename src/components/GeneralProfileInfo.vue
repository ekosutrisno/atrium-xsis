<template>
<!-- Section 1 -->
<div class="bg-white dark:bg-color-dark-gray-darker shadow overflow-hidden rounded-lg">
    <GeneralProfileHeader 
      class="px-4 sm:px-6 "
      :info="{
        title: 'General Information',
        desc: 'Personal details and employee.'
      }"
    />
  <div>
    <dl>
      <div class="bg-gray-50 dark:bg-color-dark-gray-darkest px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 sm:col-span-1 dark:text-color-gray-default">
          Full name
        </dt>
        <dd class="mt-1 sm:col-span-2 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0 flex items-center justify-between">
           <label for="full-name" class="block sr-only text-sm font-medium text-gray-700 dark:text-color-gray-default">Full name</label>
            <input 
              type="text" v-model="user.fullName" name="full-name" id="full-name" autocomplete="off"
              :readonly="!currentEdit"
              :class="[ currentEdit 
                ? 'dark:bg-color-dark-gray-darkest dark:border-color-dark-gray-default focus:ring-indigo-500 focus:border-indigo-500' 
                : 'dark:appearance-none px-0 dark:border-none dark:bg-transparent dark:shadow-none dark:focus:ring-0'
              ]"
              class="mt-1 dark:text-color-gray-lightest block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
            />
            <svg @click="toggleEdit" v-if="currentEdit"  xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 ml-2 md:cursor-pointer text-color-gray-dark dark:text-color-gray-darker transition-all hover:text-indigo-100 dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <svg @click="toggleEdit" v-else-if="!currentEdit" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 ml-2 md:cursor-pointer text-color-gray-dark dark:text-color-gray-darker transition-all hover:text-indigo-100 dark:hover:text-indigo-100" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
        </dd>
      </div>
      <div class="bg-white dark:bg-color-dark-gray-darker px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 dark:text-color-gray-default">
          Role developer
        </dt>
        <dd class="mt-1 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0 sm:col-span-2">
          {{ currentUser.roleDeveloper }}
        </dd>
      </div>
      <div class="bg-gray-50 dark:bg-color-dark-gray-darkest px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 dark:text-color-gray-default">
          Email address
        </dt>
        <dd class="mt-1 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0 sm:col-span-2">
          {{ currentUser.email }}
        </dd>
      </div>
      <div class="bg-white dark:bg-color-dark-gray-darker px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 dark:text-color-gray-default">
          Gender
        </dt>
        <dd class="mt-1 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0 sm:col-span-2">
          {{ currentUser.gender }}
        </dd>
      </div>
      <div class="bg-gray-50 dark:bg-color-dark-gray-darkest px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 dark:text-color-gray-default">
          Date of birth
        </dt>
        <dd class="mt-1 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0 sm:col-span-2">
          {{ currentUser.dob }}
        </dd>
      </div>
      <div class="bg-white dark:bg-color-dark-gray-darker px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 dark:text-color-gray-default">
          Place of birth
        </dt>
        <dd class="mt-1 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0 sm:col-span-2">
          {{ currentUser.pob }}
        </dd>
      </div>
      <div class="bg-gray-50 dark:bg-color-dark-gray-darkest px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 dark:text-color-gray-default">
          Hobby
        </dt>
        <dd class="mt-1 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0 sm:col-span-2">
            {{ currentUser.hobby}}
        </dd>
      </div>
      <div class="bg-white dark:bg-color-dark-gray-darker px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 dark:text-color-gray-default">
          Religion
        </dt>
        <dd class="mt-1 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0 sm:col-span-2">
          {{ currentUser.religion }}
        </dd>
      </div>
      <div class="bg-gray-50 dark:bg-color-dark-gray-darkest px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 dark:text-color-gray-default">
          Nationality
        </dt>
        <dd class="mt-1 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0 sm:col-span-2">
            {{ currentUser.nationality}}
        </dd>
      </div>
      <div class="bg-white dark:bg-color-dark-gray-darker px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 dark:text-color-gray-default">
          Telephone
        </dt>
        <dd class="mt-1 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0 sm:col-span-2">
          {{ currentUser.telephone }}
        </dd>
      </div>
      <div class="bg-gray-50 dark:bg-color-dark-gray-darkest px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 dark:text-color-gray-default">
          About
        </dt>
        <dd class="mt-1 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0 sm:col-span-2">
            {{ currentUser.about}}
        </dd>
      </div>
    </dl>
  </div>
</div>

<!-- Section 2 -->
<div class="bg-white dark:bg-color-dark-gray-darker shadow rounded-lg overflow-hidden">
  <GeneralProfileHeader
    class="px-4 sm:px-6"
    :info="{
      title: 'Personal Information',
      desc: 'Use a permanent address where you can receive mail.'
    }"
    :enableEdit="true"
  />
  <div class="mt-5 md:mt-0 md:col-span-2">
    <form @submit.prevent="onSubmitAction">
      <div class="shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6">
              <label for="street-address" class="block text-sm font-medium text-gray-700 dark:text-color-gray-default">Street address</label>
              <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="mt-1 dark:bg-color-dark-gray-darkest dark:border-color-dark-gray-default dark:text-color-gray-lightest focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>

            <div class="col-span-6 sm:col-span-6 lg:col-span-2">
              <label for="city" class="block text-sm font-medium text-gray-700 dark:text-color-gray-default">City</label>
              <input type="text" name="city" id="city" class="mt-1 dark:bg-color-dark-gray-darkest dark:border-color-dark-gray-default dark:text-color-gray-lightest focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
              <label for="state" class="block text-sm font-medium text-gray-700 dark:text-color-gray-default">State / Province</label>
              <input type="text" name="state" id="state" class="mt-1 dark:bg-color-dark-gray-darkest dark:border-color-dark-gray-default dark:text-color-gray-lightest focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
              <label for="postal-code" class="block text-sm font-medium text-gray-700 dark:text-color-gray-default">ZIP / Postal</label>
              <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="mt-1 dark:bg-color-dark-gray-darkest dark:border-color-dark-gray-default dark:text-color-gray-lightest focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 dark:bg-color-dark-gray-darkest text-right sm:px-6">
          <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

<!-- Section 3 -->
<div class="bg-white dark:bg-color-dark-gray-darker shadow rounded-lg overflow-hidden">
  <GeneralProfileHeader
    class="px-4 sm:px-6"
    :info="{
      title: 'Notifications',
      desc: 'Decide which communications you did like to receive and how.'
    }"
  />
  <div class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST">
      <div class="shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 space-y-6 sm:p-6">
          <fieldset>
            <legend class="text-base font-medium text-gray-900 dark:text-color-gray-lightest">By Email</legend>
            <div class="mt-4 space-y-4">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="comments" name="comments" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest rounded" />
                </div>
                <div class="ml-3 text-sm">
                  <label for="comments" class="font-medium text-gray-700 dark:text-color-dark-gray-lighter">Comments</label>
                  <p class="text-gray-500 dark:text-color-gray-light">Get notified when someones posts a comment on a posting.</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="candidates" name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest rounded" />
                </div>
                <div class="ml-3 text-sm">
                  <label for="candidates" class="font-medium text-gray-700 dark:text-color-dark-gray-lighter">Candidates</label>
                  <p class="text-gray-500 dark:text-color-gray-light">Get notified when a candidate applies for a job.</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="offers" name="offers" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest rounded" />
                </div>
                <div class="ml-3 text-sm">
                  <label for="offers" class="font-medium text-gray-700 dark:text-color-dark-gray-lighter">Offers</label>
                  <p class="text-gray-500 dark:text-color-gray-light">Get notified when a candidate accepts or rejects an offer.</p>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div>
              <legend class="text-base font-medium text-gray-900 dark:text-color-gray-lightest">Push Notifications</legend>
              <p class="text-sm text-gray-500 dark:text-color-gray-light">These are delivered via SMS to your mobile phone.</p>
            </div>
            <div class="mt-4 space-y-4">
              <div class="flex items-center">
                <input id="push-everything" name="push-notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
                <label for="push-everything" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  Everything
                </label>
              </div>
              <div class="flex items-center">
                <input id="push-email" name="push-notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
                <label for="push-email" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  Same as email
                </label>
              </div>
              <div class="flex items-center">
                <input id="push-nothing" name="push-notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
                <label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                  No push notifications
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="px-4 py-3 bg-gray-50 dark:bg-color-dark-gray-darkest text-right sm:px-6">
          <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { useUserStore, useUtilityStore } from '../services';
import GeneralProfileHeader from './GeneralProfileHeader.vue';

export default defineComponent({
  components: { GeneralProfileHeader },
   setup () {
      const userStore = useUserStore();
      const utilityStore = useUtilityStore();

      const state = reactive({
        currentUser: computed(() => userStore.currentUser),
        isOnEdit: computed(() => utilityStore.isOnEditUserData),
        currentEdit: false
      })

      const user = ref({
          nationality: state.currentUser.nationality,
          email: state.currentUser.email,
          fullName: state.currentUser.fullName,
          telephone: state.currentUser.telephone,
          dob: state.currentUser.dob,
          pob: state.currentUser.pob,
          hobby: state.currentUser.hobby,
          religion: state.currentUser.religion,
          about: state.currentUser.about,
        })

      const onSubmitAction = ()=>{
        console.log(user.value);
      }

      const toggleEdit = ()=> state.currentEdit = !state.currentEdit;

      return {
        ...toRefs(state),
        user,
        toggleEdit,
        onSubmitAction
      }
   }
})
</script>

<style scoped>

</style>