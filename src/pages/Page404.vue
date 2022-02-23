<template>
  <div class="push-top not-found">
    <h1>Page not found</h1>
    <router-link class="go-back" :to="{name: 'PageHome'}">Go back</router-link>
  </div>
</template>

<style lang="scss" scoped>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    width: 100%;
    background: darkred;
    color: white;
    border-radius: 7px;
  }
  .go-back {
    transition: 0.2s;
    text-decoration: none;
    border: white 1px solid;
    border-radius: 3px;
    padding: 20px;
    margin-left: 30px;
    color: white;
  }
  .go-back:hover {
    cursor: pointer;
    background: white;
    color: black;
  }
</style>
