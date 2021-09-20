<template>
<!-- Section 1 -->
<div class="card-wrapper-general-theme overflow-hidden with-transition">
    <GeneralProfileHeader 
      class="px-4 sm:px-6 "
      :info="{ title: 'Personal Information', desc: 'Personal details and employee.'}"
      :enableEdit="true"
    />
    <div class="px-2 py-1 ml-4 sm:ml-6 my-2 text-sm rounded bg-indigo-600 w-max dark:text-color-gray-lightest text-white" >
        <span class="block text-[11px] text-gray-200">Last updated {{ formatDateFromNow(currentUser.lastModifiedDate) }}</span>
    </div>
  <div>
    <dl>
      <div class="input-custom-wrapper-gray">
        <dt class="input-custom-dt">
          Full name
        </dt>
        <dd class="input-custom-dd">
           <label for="full-name" class="input-custom-label">Full name</label>
            <input 
              type="text" v-model="currentUser.fullName" name="full-name" id="full-name" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
              class="input-custom-default" 
            />
        </dd>
      </div>
      <div class="input-custom-wrapper-white">
        <dt class="input-custom-dt">
          Role developer
        </dt>
        <dd class="input-custom-dd">
           <label for="role-developer" class="input-custom-label">Full name</label>
            <input 
              type="text" v-model="currentUser.roleDeveloper.roleDeveloperName" name="role-developer" id="role-developer" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
              class="input-custom-default" 
            />
        </dd>
      </div>
      <div class="input-custom-wrapper-gray">
        <dt class="input-custom-dt">
          Email address
        </dt>
        <dd class="input-custom-dd">
           <label for="email-address" class="input-custom-label">Full name</label>
            <input 
              type="email" v-model="currentUser.email" name="email-address" id="email-address" autocomplete="off"
              readonly
              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
              class="input-custom-default" 
            />
        </dd>
      </div>
      <div class="input-custom-wrapper-white">
        <dt class="input-custom-dt">
          Gender
        </dt>
        <dd class="input-custom-dd">
           <label for="gender" class="input-custom-label">Full name</label>
            <GenderList v-if="isOnEdit"/>
            <span v-else>
              {{ currentUser.gender }}
            </span>
        </dd>
      </div>
      <div class="input-custom-wrapper-gray">
        <dt class="input-custom-dt">
          Date of birth
        </dt>
        <dd class="input-custom-dd">
           <label for="dob" class="input-custom-label">Full name</label>
            <input
              v-if="isOnEdit" 
              type="date" v-model="currentUser.dob" name="dob" id="dob" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
              class="input-custom-default" 
            />
            <span v-else>
              {{ formatDateWithMonth(currentUser.dob)}}
            </span>
        </dd>
      </div>
      <div class="input-custom-wrapper-white">
        <dt class="input-custom-dt">
          Place of birth
        </dt>
        <dd class="input-custom-dd">
           <label for="pob" class="input-custom-label">Full name</label>
            <input 
              type="text" v-model="currentUser.pob" name="pob" id="pob" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
              class="input-custom-default" 
            />
        </dd>
      </div>
      <div class="input-custom-wrapper-gray">
        <dt class="input-custom-dt">
          Hobby
        </dt>
        <dd class="input-custom-dd">
           <label for="hobby" class="input-custom-label">Full name</label>
            <input 
              type="text" v-model="currentUser.hobby" name="hobby" id="hobby" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
              class="input-custom-default" 
            />
        </dd>
      </div>
      <div class="input-custom-wrapper-white">
        <dt class="input-custom-dt">
          Religion
        </dt>
        <dd class="input-custom-dd">
           <label for="religion" class="input-custom-label">Full name</label>
            <input 
              type="text" v-model="currentUser.religion" name="religion" id="religion" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
              class="input-custom-default" 
            />
        </dd>
      </div>
      <div class="input-custom-wrapper-gray">
        <dt class="input-custom-dt">
          Nationality
        </dt>
        <dd class="input-custom-dd">
           <label for="nationality" class="input-custom-label">Full name</label>
            <input 
              type="text" v-model="currentUser.nationality" name="nationality" id="nationality" autocomplete="off"
              :readonly="!isOnEdit"
              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
              class="input-custom-default" 
            />
        </dd>
      </div>
      <div class="input-custom-wrapper-white">
        <dt class="input-custom-dt">
          Contact number
        </dt>
        <dd class="input-custom-dd">
           <label for="phone-number" class="input-custom-label">Full name</label>
            <input 
              type="tel" v-model="currentUser.telephone" name="phone-number" id="phone-number" autocomplete="off"
              :readonly="!isOnEdit"
              pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
              class="input-custom-default" 
            />
        </dd>
      </div>
       <div class="input-custom-wrapper-gray">
        <dt class="input-custom-dt">
          About
        </dt>
        <dd class="input-custom-dd">
           <label for="about" class="input-custom-label">About</label>
            <textarea 
              v-model="currentUser.about" id="about" name="about" rows="5" maxlength="250" 
              :readonly="!isOnEdit"
              :class="[ isOnEdit ? 'input-custom-on-edit' : 'input-custom-non-edit']"
              class="input-custom-default"
            />
            <span class="text-xs dark:text-color-gray-default">Total caracter {{ aboutLength }}/250. </span>
        </dd>
      </div>
    </dl>
    <div class="px-4 py-3 space-x-3 bg-gray-50 border-t border-gray-200 dark:border-color-gray-darkest dark:bg-color-dark-gray-darkest text-right sm:px-6">
      <button v-if="!isOnEdit" type="button" @click="toggleEditAction(true)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-color-dark-gray-default dark:text-white bg-color-gray-light dark:bg-color-dark-gray-darker dark:hover:bg-color-dark-gray-dark hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        Edit profile
      </button>
      <button v-if="isOnEdit" type="button" @click="toggleEditAction(false)" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:text-white text-color-dark-gray-default hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        Cancel
      </button>
      <button v-if="isOnEdit" type="button" @click="onSubmitAction" class="inline-flex with-transition justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Save
      </button>
    </div>
  </div>
</div>

<!-- Section 2 -->
<div class="card-wrapper-general-theme overflow-hidden with-transition">
  <GeneralProfileHeader
    class="px-4 sm:px-6"
    :info="{ title: 'Address Information', desc: 'Use a permanent address where you can receive mail.'}"
  />
  <div class="md:mt-0 md:col-span-2">
    <AddressFormCard :address="currentUser.address.addressAsli"/>
    <AddressFormCard :address="currentUser.address.addressDomisili"/>
  </div>
</div>

<!-- Section 3 -->
<div class="card-wrapper-general-theme overflow-hidden with-transition">
  <GeneralProfileHeader
    class="px-4 sm:px-6"
    :info="{ title: 'Notifications', desc: 'Decide which communications you did like to receive and how.'}"
  />
  <div class="mt-5 md:mt-0 md:col-span-2">
    <div class="shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 space-y-6 sm:p-6">
        <fieldset>
          <legend class="text-base font-medium text-gray-900 dark:text-color-gray-lightest">By Email</legend>
          <div class="mt-4 space-y-4">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input @change="updatePreference" id="candidates" v-model="currentUser.userPreference.sendToEmail.candidates" name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest rounded" />
              </div>
              <div class="ml-3 text-sm">
                <label for="candidates" class="font-medium text-gray-700 dark:text-color-dark-gray-lighter">Candidates</label>
                <p class="text-gray-500 dark:text-color-gray-light">Get notified when a candidate applies for a job.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input @change="updatePreference" id="offers" v-model="currentUser.userPreference.sendToEmail.offers" name="offers" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest rounded" />
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
              <input @change="updatePreference" id="push-everything" name="push-notifications" v-model.number="currentUser.userPreference.pushNotification" :value="1" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
              <label for="push-everything" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                Everything
              </label>
            </div>
            <div class="flex items-center">
              <input @change="updatePreference" id="push-email" name="push-notifications" v-model.number="currentUser.userPreference.pushNotification" :value="2" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
              <label for="push-email" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                Same as email
              </label>
            </div>
            <div class="flex items-center">
              <input @change="updatePreference" id="push-nothing" name="push-notifications" v-model.number="currentUser.userPreference.pushNotification" :value="3" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-color-dark-gray-darkest" />
              <label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700 dark:text-color-dark-gray-lighter">
                No push notifications
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { useUserStore, useUtilityStore } from '../services';
import { IUserPreference } from '../types/InterfaceType';
import AddressFormCard from './cards/AddressFormCard.vue';
import GeneralProfileHeader from './GeneralProfileHeader.vue';
import { formatDateFromNow, formatDateWithMonth } from '../utils/helperFunction';
import GenderList from './input/GenderList.vue';

export default defineComponent({
  components: { GeneralProfileHeader, AddressFormCard, GenderList },
   setup () {
      const userStore = useUserStore();
      const utilityStore = useUtilityStore();

      const state = reactive({
        currentUser: computed(() => userStore.currentUser),
        isOnEdit: computed(() => utilityStore.isOnEditUserData),
      })

      const onSubmitAction = ()=>{
        /* Set new lastModifieddate */
        state.currentUser.lastModifiedDate = Date.now();
        state.currentUser.gender = userStore.gender;
        
        userStore.updateCurrentUserData(state.currentUser)
        .then(()=> toggleEditAction(false));
      }

      const updatePreference = ()=>{
        var preference = state.currentUser.userPreference as IUserPreference;
        preference.useThemeMode = utilityStore.theme;
        userStore.updateUserPreference(state.currentUser.userId, preference);
      }

      const toggleEditAction = (val: boolean): void => {
        var userId = localStorage.getItem('_uid') as string;
        userStore.fetchCurrentUser(userId);
        utilityStore.$patch((state)=>state.isOnEditUserData = val);
      }

      const aboutLength = computed(() => state.currentUser.about?.length);

      return {
        ...toRefs(state),
        aboutLength,
        onSubmitAction,
        toggleEditAction,
        formatDateFromNow,
        formatDateWithMonth,
        updatePreference
      }
   }
})
</script>