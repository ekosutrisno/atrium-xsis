import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import { createPinia } from 'pinia'
import router from './router';
import App from './App.vue'

import './index.css'

const updateSW = registerSW({
   onNeedRefresh() { },
   onOfflineReady() { },
})

createApp(App)
   .use(createPinia())
   .use(router)
   .mount('#app')
