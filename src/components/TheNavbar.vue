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
