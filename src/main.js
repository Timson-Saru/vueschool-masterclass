import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from '@/store'
import AppDate from '@/components/AppDate.vue'

createApp(App)
  .use(router)
  .use(store)
  .component('AppDate', AppDate)
  .mount('#app')
