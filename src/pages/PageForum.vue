<template>

    <div class="col-full push-top">

      <div class="forum-header">
          <div class="forum-details">
              <h1>{{ forum.name }}</h1>
              <p class="text-lead">{{ forum.description }}</p>
          </div>
          <router-link :to="{ name: 'PageCreateThread', params: { forumId: forum.id } }" class="btn-green btn-small">Start a thread</router-link>
      </div>

    </div>

    <div class="col-full push-top">
       <ThreadList :threads="threads" />
    </div>

</template>

<script>
import ThreadList from '@/components/ThreadList.vue'
import { findById } from '@/helpers'
export default {
  props: {
    forumId: {
      required: true,
      type: String
    }
  },
  components: {
    ThreadList
  },
  computed: {
    threads() {
      return this.forum.threads ? this.forum.threads.map(threadId => this.$store.getters.thread(threadId)) : []
    },
    forum() {
      return findById(this.$store.state.forums, this.forumId)
    }
  }
}
</script>
