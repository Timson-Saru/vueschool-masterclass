<template>

  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
          <h1>{{ forum.name }}</h1>
          <p class="text-lead">{{ forum.description }}</p>
      </div>
      <router-link
        :to="{ name: 'PageCreateThread', params: { forumId: forum.id } }"
        class="btn-green btn-small"
      >
        Start a thread
      </router-link>
    </div>

    <div class="col-full push-top">
     <ThreadList :threads="threads" />
    </div>

  </div>

</template>

<script>
import ThreadList from '@/components/ThreadList.vue'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { mapActions } from 'vuex'
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
  mixins: [asyncDataStatus],
  methods: {
    ...mapActions(['fetchForum', 'fetchThreads', 'fetchUsers'])
  },
  computed: {
    threads() {
      if (!this.forum) return []
      return this.forum.threads.map(threadId => this.$store.getters.thread(threadId))
    },
    forum() {
      return findById(this.$store.state.forums, this.forumId)
    }
  },
  async created() {
    const forum = await this.fetchForum({ id: this.forumId })
    const threads = await this.fetchThreads({ ids: forum.threads })
    await this.fetchUsers({ ids: threads.map(thread => thread.userId) })
    this.asyncDataStatus_fetched()
  }
}
</script>
