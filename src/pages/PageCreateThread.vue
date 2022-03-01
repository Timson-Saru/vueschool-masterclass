<template>
  <div class="col-full push-top">
    <h1>Create new thread in <i>{{forum.name}}</i></h1>
    <ThreadEditor @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue'
export default {
  props: {
    forumId: {
      type: String,
      required: true
    }
  },
  components: {
    ThreadEditor
  },
  computed: {
    forum() {
      return this.$store.state.forums.find(forum => forum.id === this.forumId)
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'PageForum', params: { forumId: this.forumId } })
    },
    async save({ title, text }) {
      const thread = await this.$store.dispatch('createThread', {
        text,
        title,
        forumId: this.forumId
      })
      this.$router.push({ name: 'ThreadShow', params: { id: thread.id } })
    }
  }
}

</script>
