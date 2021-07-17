<template>
<!-- Section 1 -->
<div class="bg-white dark:bg-color-dark-gray-darker shadow overflow-hidden rounded-lg">
    <GeneralProfileHeader 
      class="px-4 sm:px-6 "
      :info="{
        title: 'Personal Information',
        desc: 'Personal details and employee.'
      }"
      :enableEdit="true"
    />
  <div>
    <dl>
      <div class="bg-gray-50 group dark:bg-color-dark-gray-darkest px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 my-auto dark:text-color-gray-default">
          Full name
        </dt>
        <dd class="sm:col-span-2 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0">
           <label for="full-name" class="sr-only text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">Full name</label>
            <input 
              type="text" v-model="user.fullName" name="full-name" id="full-name" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit 
                ? 'dark:bg-color-dark-gray-darkest shadow-sm dark:border-color-dark-gray-default focus:ring-indigo-500 focus:border-indigo-500' 
                : 'appearance-none p-0 border-none bg-transparent shadow-none focus:ring-0'
              ]"
              class="dark:text-color-gray-lightest w-full shadow-sm text-sm border-gray-300 rounded-md" 
            />
        </dd>
      </div>
      <div class="bg-white group dark:bg-color-dark-gray-darker px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 my-auto dark:text-color-gray-default">
          Role developer
        </dt>
        <dd class="sm:col-span-2 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0">
           <label for="role-developer" class="sr-only text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">Full name</label>
            <input 
              type="text" v-model="user.roleDeveloper" name="role-developer" id="role-developer" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit 
                ? 'dark:bg-color-dark-gray-darkest shadow-sm dark:border-color-dark-gray-default focus:ring-indigo-500 focus:border-indigo-500' 
                : 'appearance-none p-0 border-none bg-transparent shadow-none focus:ring-0'
              ]"
              class="dark:text-color-gray-lightest w-full shadow-sm text-sm border-gray-300 rounded-md" 
            />
        </dd>
      </div>
      <div class="bg-gray-50 group dark:bg-color-dark-gray-darkest px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 my-auto dark:text-color-gray-default">
          Email address
        </dt>
        <dd class="sm:col-span-2 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0">
           <label for="email-address" class="sr-only text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">Full name</label>
            <input 
              type="email" v-model="user.email" name="email-address" id="email-address" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit 
                ? 'dark:bg-color-dark-gray-darkest shadow-sm dark:border-color-dark-gray-default focus:ring-indigo-500 focus:border-indigo-500' 
                : 'appearance-none p-0 border-none bg-transparent shadow-none focus:ring-0'
              ]"
              class="dark:text-color-gray-lightest w-full shadow-sm text-sm border-gray-300 rounded-md" 
            />
        </dd>
      </div>
      <div class="bg-white group dark:bg-color-dark-gray-darker px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 my-auto dark:text-color-gray-default">
          Gender
        </dt>
        <dd class="sm:col-span-2 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0">
           <label for="gender" class="sr-only text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">Full name</label>
            <input 
              type="text" v-model="user.gender" name="gender" id="gender" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit 
                ? 'dark:bg-color-dark-gray-darkest shadow-sm dark:border-color-dark-gray-default focus:ring-indigo-500 focus:border-indigo-500' 
                : 'appearance-none p-0 border-none bg-transparent shadow-none focus:ring-0'
              ]"
              class="dark:text-color-gray-lightest w-full shadow-sm text-sm border-gray-300 rounded-md" 
            />
        </dd>
      </div>
      <div class="bg-gray-50 group dark:bg-color-dark-gray-darkest px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 my-auto dark:text-color-gray-default">
          Date of birth
        </dt>
        <dd class="sm:col-span-2 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0">
           <label for="dob" class="sr-only text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">Full name</label>
            <input 
              type="text" v-model="user.dob" name="dob" id="dob" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit 
                ? 'dark:bg-color-dark-gray-darkest shadow-sm dark:border-color-dark-gray-default focus:ring-indigo-500 focus:border-indigo-500' 
                : 'appearance-none p-0 border-none bg-transparent shadow-none focus:ring-0'
              ]"
              class="dark:text-color-gray-lightest w-full shadow-sm text-sm border-gray-300 rounded-md" 
            />
        </dd>
      </div>
      <div class="bg-white group dark:bg-color-dark-gray-darker px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 my-auto dark:text-color-gray-default">
          Place of birth
        </dt>
        <dd class="sm:col-span-2 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0">
           <label for="pob" class="sr-only text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">Full name</label>
            <input 
              type="text" v-model="user.pob" name="pob" id="pob" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit 
                ? 'dark:bg-color-dark-gray-darkest shadow-sm dark:border-color-dark-gray-default focus:ring-indigo-500 focus:border-indigo-500' 
                : 'appearance-none p-0 border-none bg-transparent shadow-none focus:ring-0'
              ]"
              class="dark:text-color-gray-lightest w-full shadow-sm text-sm border-gray-300 rounded-md" 
            />
        </dd>
      </div>
      <div class="bg-gray-50 group dark:bg-color-dark-gray-darkest px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 my-auto dark:text-color-gray-default">
          Hobby
        </dt>
        <dd class="sm:col-span-2 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0">
           <label for="hobby" class="sr-only text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">Full name</label>
            <input 
              type="text" v-model="user.hobby" name="hobby" id="hobby" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit 
                ? 'dark:bg-color-dark-gray-darkest shadow-sm dark:border-color-dark-gray-default focus:ring-indigo-500 focus:border-indigo-500' 
                : 'appearance-none p-0 border-none bg-transparent shadow-none focus:ring-0'
              ]"
              class="dark:text-color-gray-lightest w-full shadow-sm text-sm border-gray-300 rounded-md" 
            />
        </dd>
      </div>
      <div class="bg-white group dark:bg-color-dark-gray-darker px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 my-auto dark:text-color-gray-default">
          Religion
        </dt>
        <dd class="sm:col-span-2 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0">
           <label for="religion" class="sr-only text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">Full name</label>
            <input 
              type="text" v-model="user.religion" name="religion" id="religion" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit 
                ? 'dark:bg-color-dark-gray-darkest shadow-sm dark:border-color-dark-gray-default focus:ring-indigo-500 focus:border-indigo-500' 
                : 'appearance-none p-0 border-none bg-transparent shadow-none focus:ring-0'
              ]"
              class="dark:text-color-gray-lightest w-full shadow-sm text-sm border-gray-300 rounded-md" 
            />
        </dd>
      </div>
      <div class="bg-gray-50 group dark:bg-color-dark-gray-darkest px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 my-auto dark:text-color-gray-default">
          Nationality
        </dt>
        <dd class="sm:col-span-2 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0">
           <label for="nationality" class="sr-only text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">Full name</label>
            <input 
              type="text" v-model="user.nationality" name="nationality" id="nationality" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit 
                ? 'dark:bg-color-dark-gray-darkest shadow-sm dark:border-color-dark-gray-default focus:ring-indigo-500 focus:border-indigo-500' 
                : 'appearance-none p-0 border-none bg-transparent shadow-none focus:ring-0'
              ]"
              class="dark:text-color-gray-lightest w-full shadow-sm text-sm border-gray-300 rounded-md" 
            />
        </dd>
      </div>
      <div class="bg-white group dark:bg-color-dark-gray-darker px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 my-auto dark:text-color-gray-default">
          Contact number
        </dt>
        <dd class="sm:col-span-2 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0">
           <label for="phone-number" class="sr-only text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">Full name</label>
            <input 
              type="text" v-model="user.telephone" name="phone-number" id="phone-number" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit 
                ? 'dark:bg-color-dark-gray-darkest shadow-sm dark:border-color-dark-gray-default focus:ring-indigo-500 focus:border-indigo-500' 
                : 'appearance-none p-0 border-none bg-transparent shadow-none focus:ring-0'
              ]"
              class="dark:text-color-gray-lightest w-full shadow-sm text-sm border-gray-300 rounded-md" 
            />
        </dd>
      </div>
       <div class="bg-gray-50 group dark:bg-color-dark-gray-darkest px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 my-auto dark:text-color-gray-default">
          About
        </dt>
        <dd class="sm:col-span-2 text-sm text-color-dark-gray-darkest dark:text-color-gray-lighter sm:mt-0">
           <label for="about" class="sr-only text-xs sm:text-sm font-medium text-gray-700 dark:text-color-gray-default">About</label>
            <textarea 
              v-model="user.about" id="about" name="about" rows="5" maxlength="250" 
              :readonly="!isOnEdit"
              :class="[ isOnEdit 
                  ? 'dark:bg-color-dark-gray-darkest shadow-sm dark:border-color-dark-gray-default focus:ring-indigo-500 focus:border-indigo-500' 
                  : 'appearance-none p-0 border-none bg-transparent shadow-none focus:ring-0'
                ]"
              class="dark:text-color-gray-lightest w-full shadow-sm text-sm border-gray-300 rounded-md"
            />
            <span v-if="isOnEdit" class="text-xs dark:text-color-gray-default">Total caracter {{ aboutLength }}/250. </span>
        </dd>
      </div>
    </dl>
     <div v-if="isOnEdit" class="px-4 py-3 bg-gray-50 border-t border-gray-200 dark:border-color-gray-darkest dark:bg-color-dark-gray-darkest text-right sm:px-6">
          <button type="button" @click="onSubmitAction" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
  </div>
</div>

<!-- Section 2 -->
<div class="bg-white dark:bg-color-dark-gray-darker shadow rounded-lg overflow-hidden">
  <GeneralProfileHeader
    class="px-4 sm:px-6"
    :info="{
      title: 'Address Information',
      desc: 'Use a permanent address where you can receive mail.'
    }"
  />
  <div class="mt-5 md:mt-0 md:col-span-2">
    <form @submit.prevent="onSubmitAction">
      <div class="shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6">
              <label for="street-address" class="block text-sm font-medium text-gray-700 dark:text-color-gray-default">Street address</label>
              <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="mt-1 dark:bg-color-dark-gray-darkest dark:border-color-dark-gray-default dark:text-color-gray-lightest focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-sm border-gray-300 rounded-md" />
            </div>

            <div class="col-span-6 sm:col-span-6 lg:col-span-2">
              <label for="city" class="block text-sm font-medium text-gray-700 dark:text-color-gray-default">City</label>
              <input type="text" name="city" id="city" class="mt-1 dark:bg-color-dark-gray-darkest dark:border-color-dark-gray-default dark:text-color-gray-lightest focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-sm border-gray-300 rounded-md" />
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
              <label for="state" class="block text-sm font-medium text-gray-700 dark:text-color-gray-default">State / Province</label>
              <input type="text" name="state" id="state" class="mt-1 dark:bg-color-dark-gray-darkest dark:border-color-dark-gray-default dark:text-color-gray-lightest focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-sm border-gray-300 rounded-md" />
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
              <label for="postal-code" class="block text-sm font-medium text-gray-700 dark:text-color-gray-default">ZIP / Postal</label>
              <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="mt-1 dark:bg-color-dark-gray-darkest dark:border-color-dark-gray-default dark:text-color-gray-lightest focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-sm border-gray-300 rounded-md" />
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
          roleDeveloper: state.currentUser.roleDeveloper,
          about: state.currentUser.about,
          gender: state.currentUser.gender,
        })

      const onSubmitAction = ()=>{
        console.log(user.value);
      }

      const toggleEdit = ()=> state.currentEdit = !state.currentEdit;
      const aboutLength = computed(() => user.value.about?.length);

      return {
        ...toRefs(state),
        user,
        aboutLength,
        toggleEdit,
        onSubmitAction
      }
   }
})
</script>

<style scoped>

</style>