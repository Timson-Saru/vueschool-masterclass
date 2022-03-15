<template>
  <div class="col-full push-top">
    <h1>Editing: <i>{{thread.name}}</i></h1>
    <ThreadEditor :title="thread.title" :text="firstPost" @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue'
export default {
  props: {
    threadId: {
      type: String,
      required: true
    }
  },
  components: {
    ThreadEditor
  },
  computed: {
    thread() {
      return this.$store.state.threads.find(thread => thread.id === this.threadId)
    },
    firstPost() {
      return this.$store.state.posts.find(post => post.id === this.thread.posts[0]).text
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'ThreadShow', params: { id: this.threadId } })
    },
    async save({ title, text }) {
      const thread = await this.$store.dispatch('createThread', {
        text,
        title,
        forumId: this.thread.forumId
      })
      this.$router.push({ name: 'ThreadShow', params: { id: this.threadId } })
    }
  }
}

</script>
