import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from '@/store'
import AppDate from '@/components/AppDate.vue'
import fireBaseConfig from '@/config/firebase'

createApp(App)
  .use(router)
  .use(store)
  .component('AppDate', AppDate)
  .mount('#app')
