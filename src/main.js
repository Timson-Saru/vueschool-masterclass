import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from '@/store'
import AppDate from '@/components/AppDate.vue'
import firebase from 'firebase/compat/app'
import firebaseConfig from '@/config/firebase'
firebase.initializeApp(firebaseConfig)

createApp(App)
  .use(router)
  .use(store)
  .component('AppDate', AppDate)
  .mount('#app')
