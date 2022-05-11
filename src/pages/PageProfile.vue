<template>
  <div class="container">
    <p>profile boy</p>
    <!-- <div class="flex-grid">
      <div class="col-3 push-top">
          <UserProfileCard v-if="!edit" :user="user"/>
          <ProfileEditor v-else :user="user"/>
          <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>
      </div>
      <div class="col-7 push-top">
        <div class="profile-header">
            <span class="text-lead">
                {{user.username}}'s recent activity
            </span>
            <a href="#">See only started threads?</a>
        </div>
        <hr>
        <PostList :posts="user.posts"/>
      </div>
    </div> -->
  </div>
</template>

<script>
// import PostList from '@/components/PostList.vue'
// import UserProfileCard from '@/components/UserProfileCard.vue'
// import ProfileEditor from '@/components/ProfileEditor.vue'
import store from '@/store'
import { mapGetters } from 'vuex'
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    // PostList,
    // UserProfileCard,
    // ProfileEditor
  },
  computed: {
    ...mapGetters({ user: 'authUser' })
  },
  beforeRouteEnter(to, from) {
    console.log(store.state.authId)
    if (!store.state.authId) return { name: 'PageHome' }
  },
  created() {
    this.$emit('ready')
  }
}
</script>
