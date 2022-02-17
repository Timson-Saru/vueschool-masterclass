<template>
  <TheNavbar/>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'

export default {
  name: 'App',
  components: {
    TheNavbar
  }
}

</script>

<style lang="scss" scoped>
@import './assets/style.css';
</style>
