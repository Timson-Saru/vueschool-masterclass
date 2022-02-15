<template>
  <div class="home-page-wrapper">
    <router-link class="go-back-boy" :to="{name: 'PageHome'}"><img alt="Vue logo" src="./assets/logo.png" /></router-link>
    <button @click="$router.back()" class="backBtn">GO BACK BOY</button>
  </div>
  <router-view/>
</template>

<style lang="scss" scoped>
@import './assets/style.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.butycheek {
  border: solid 1px red;
  padding: 20px;
}
.backBtn {
  padding: 15px;
  background: rgb(233, 247, 212);
  border: solid 1px black;
  border-radius: 4px;
  margin: 10px 0;
}
.home-page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  a > img:hover {
    opacity: 1;
  }
}
</style>
