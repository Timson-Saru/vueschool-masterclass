<template>
  <div class="thread-list">
    <h2 class="list-title">Threads</h2>
    <div v-for="thread in threads" :key="thread.id" class="thread">
      <template v-if="thread.id">
      <div>
        <p>
          <router-link :to="{name: 'ThreadShow', params:{ id: thread.id }}">{{ thread.title }}</router-link>
        </p>
        <p class="text-faded text-xsmall">
          By <a href="#">{{ userById(thread.userId).name }}</a>, <AppDate :timeStamp="thread.publishedAt"/>.
        </p>
      </div>
      <div class="activity">
        <p class="replies-count">
         {{ thread.repliesCount }} replies
        </p>
        <img class="avatar-medium" :src="userById(thread.userId).avatar" alt="">
        <div>
          <p class="text-xsmall">
            <a href="#">{{ userById(thread.userId).name }}</a>
          </p>
          <p class="text-xsmall text-faded"> <AppDate :timeStamp="thread.publishedAt"/> </p>
        </div>
      </div>
      </template>
    </div>
  </div>
</template>

<script>
import { findById } from '@/helpers'
export default {
  props: {
    threads: {
      type: Array,
      required: true
    }
  },
  computed: {
    users() {
      return this.$store.state.users
    }
  },
  methods: {
    userById(userId) {
      return findById(this.users, userId) || {}
    }
  }
}

</script>
