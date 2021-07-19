import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import { createPinia } from 'pinia'
import router from './router';
import App from './App.vue'

import './index.css'

import * as dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(localizedFormat)
dayjs.extend(localeData)
dayjs.extend(relativeTime)


const updateSW = registerSW({
   onNeedRefresh() { },
   onOfflineReady() { },
})

const app = createApp(App);

app.use(createPinia())
app.use(router)
app.mount('#app')
