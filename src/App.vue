<template>
  <TheNavbar/>
  <div class="container">
    <router-view v-show="showPage" @ready="showPage = true"/>
    <div class="spinnerBackground col-full" v-show="!showPage">
      <AppSpinner/>
    </div>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    TheNavbar,
    AppSpinner
  },
  methods: {
    ...mapActions(['fetchAuthUser'])
  },
  created() {
    this.fetchAuthUser()
    this.$router.beforeEach(() => {
      console.log('app to false')
      this.showPage = false
    })
  },
  data() {
    return {
      showPage: false
    }
  }
}

</script>

<style lang="scss" scoped>
@import './assets/style.css';
</style>
