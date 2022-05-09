import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from '@/store'
import AppDate from '@/components/AppDate.vue'
import firebaseConfig from '@/config/firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import FontAwesome from '@/plugins/FontAwesome'

firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('fetchAuthUser')
  }
})

createApp(App)
  .use(router)
  .use(store)
  .use(FontAwesome)
  .component('AppDate', AppDate)
  .mount('#app')
