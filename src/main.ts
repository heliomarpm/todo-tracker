import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import router from './router'
import { keyStore, store } from './store'

createApp(App)
    .use(router)
    .use(store, keyStore)
    .mount('#app')
