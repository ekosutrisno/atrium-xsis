<template>
  <div class="flex flex-col with-transition space-y-8 items-center justify-center border-t-2 border-gray-500 pt-6 border-opacity-20">
      <div class="flex flex-col items-center space-y-1">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="font-semibold dark:text-color-gray-lighter">No Statistic</h3>
          <p class="text-sm text-gray-700 dark:text-gray-400">Get started by generating a timesheet first.</p>
      </div>
    <button @click="$router.push('/u/0/timesheet')" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <span class="ml-2">Go to Timesheet Page</span>
    </button>
  </div>
</template>