<template>
  <TheNavbar/>
  <div class="container">
    <router-view v-show="showPage" @ready="onPageReady"/>
    <AppSpinner v-show="!showPage"/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import AppSpinner from '@/components/AppSpinner.vue'
// import { mapActions } from 'vuex'
import NProgress from 'nprogress'
export default {
  name: 'App',
  components: {
    TheNavbar,
    AppSpinner
  },
  methods: {
    // ...mapActions(['fetchAuthUser']),
    onPageReady() {
      this.showPage = true
      NProgress.done()
    }
  },
  created() {
    NProgress.configure({
      showSpinner: false,
      speed: 200
    })
    // this.fetchAuthUser()
    this.$router.beforeEach(() => {
      this.showPage = false
      NProgress.start()
    })
  },
  data() {
    return {
      showPage: false
    }
  }
}

</script>

<style scoped>
@import './assets/style.css';
@import '~nprogress/nprogress.css';
</style>
