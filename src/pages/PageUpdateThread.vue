<template>
  <div v-if="thread && firstPost" class="col-full push-top">
    <h1>Editing: <i>{{thread.title}}</i></h1>
    <ThreadEditor :title="thread.title" :text="firstPost" @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { mapActions } from 'vuex'
import { findById } from '@/helpers'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    ThreadEditor
  },
  mixins: [asyncDataStatus],
  computed: {
    thread() {
      return findById(this.$store.state.threads, this.id)
    },
    firstPost() {
      const firstPost = findById(this.$store.state.posts, this.thread.posts[0])
      return firstPost ? firstPost.text : ''
    }
  },
  methods: {
    ...mapActions(['updateThread', 'fetchThread', 'fetchPost']),
    cancel() {
      this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
    },
    async save({ title, text }) {
      const thread = await this.updateThread({ text, title, id: this.id })
      this.$router.push({ name: 'ThreadShow', params: { id: thread.id } })
    }
  },
  async created() {
    const thread = await this.fetchThread({ id: this.id })
    this.fetchPost({ id: thread.posts[0] })
  }
}

</script>
