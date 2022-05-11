<template>
  <header class="header" id="header">

    <router-link :to="{name: 'PageHome'}" class="logo">
        <img src="../assets/svg/vueschool-logo.svg" >
    </router-link>

    <div class="btn-hamburger">
        <div class="top bar"></div>
        <div class="middle bar"></div>
        <div class="bottom bar"></div>
    </div>

    <nav class="navbar">
        <ul>
            <li v-if="authUser" class="navbar-user">
                <a @click.prevent="toggleDropDown">
                    <img class="avatar-small" :src="authUser.avatar" :alt="`${authUser.name}'s profile picture`">
                    <span>
                        {{ authUser.name }}
                        <img class="icon-profile" src="../assets/svg/arrow-profile.svg" alt="">
                    </span>
                </a>

                <div id="user-dropdown" :class="{ 'active-drop': userDropdownOpened }">
                    <div class="triangle-drop"></div>
                    <ul class="dropdown-menu">
                        <li class="dropdown-menu-item"><router-link :to="{ name: 'PageProfile' }">View profile</router-link></li>
                        <li class="dropdown-menu-item"><a @click.prevent="$store.dispatch('signOut')">Sign Out</a></li>
                    </ul>
                </div>
            </li>
            <!-- <li v-if="authUser === null">
              <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
            </li> -->
            <li v-if="!authUser" class="navbar-item"><router-link :to="{ name: 'PageSignIn' }">Sign In</router-link></li>
            <li v-if="!authUser" class="navbar-item"><router-link :to="{ name: 'PageRegister' }">Register</router-link></li>
        </ul>
        <!-- <ul>
            <li class="navbar-item">
                <a href="index.html">Home</a>
            </li>
            <li class="navbar-item">
                <a href="category.html">Category</a>
            </li>
            <li class="navbar-item">
                <a href="forum.html">Forum</a>
            </li>
            <li class="navbar-item">
                <a href="thread.html">Thread</a>
            </li>
            <li class="navbar-item mobile-only">
                <a href="profile.html">My Profile</a>
            </li>
            <li class="navbar-item mobile-only">
                <a href="#">Logout</a>
            </li>
        </ul> -->
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['authUser'])
  },
  data() {
    return {
      userDropdownOpened: false
    }
  },
  methods: {
    toggleDropDown() {
      this.userDropdownOpened = !this.userDropdownOpened
    }
  }
}
</script>

<style scoped>
.spinner {
  margin: 0 auto 0;
  width: 70px;
  text-align: center;
  display: flex;
}

.spinner > div {
  width: 9px;
  height: 9px;
  background-color: rgb(0,212,255);
  margin-right: 5px;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>
