import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from '@/store'
import AppDate from '@/components/AppDate.vue'
import firebaseConfig from '@/config/firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

firebase.initializeApp(firebaseConfig)

createApp(App)
  .use(router)
  .use(store)
  .component('AppDate', AppDate)
  .mount('#app')
