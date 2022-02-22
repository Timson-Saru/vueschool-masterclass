<template>
  <div class="profile-card">
    <p class="text-center">
        <img :src="user.avatar" :alt="`${user.name}'s avatar picture`" class="avatar-xlarge img-update">
    </p>
    <form @submit.prevent="save">
    <div class="form-group">
        <input type="text" placeholder="Username" class="form-input text-lead text-bold" v-model="activeUser.username">
    </div>

    <div class="form-group">
        <input type="text" placeholder="Full Name" class="form-input text-lead" v-model="activeUser.name">
    </div>

    <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea class="form-input" id="user_bio" placeholder="Write a few words about yourself." v-model="activeUser.bio"></textarea>
    </div>

    <div class="stats">
        <span>{{user.postsCount}} posts</span>
        <span>{{user.threadsCount}} threads</span>
    </div>

    <hr>

    <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input autocomplete="off" class="form-input" id="user_website" v-model="activeUser.website">
    </div>

    <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input autocomplete="off" class="form-input" id="user_email" v-model="activeUser.email">
    </div>

    <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input autocomplete="off" class="form-input" id="user_location" v-model="activeUser.location">
    </div>

    <div class="btn-group space-between">
        <a @click="cancel" class="btn-ghost">Cancel</a>
        <a @click="save" class="btn-blue">Save</a>
    </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeUser: { ...this.user }
    }
  },
  methods: {
    save() {
      this.$store.dispatch('updateUser', { ...this.activeUser })
      this.$router.push({ name: 'PageProfile' })
    },
    cancel() {
      this.$router.push({ name: 'PageProfile' })
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
