<template>
  <div class="col-full push-top">
    <h1>Editing: <i>{{thread.title}}</i></h1>
    <ThreadEditor :title="thread.title" :text="firstPost" @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue'
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
  computed: {
    thread() {
      return findById(this.$store.state.threads, this.id)
    },
    firstPost() {
      return findById(this.$store.state.posts, this.thread.posts[0]).text
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
    },
    save({ title, text }) {
      this.$store.dispatch('updateThread', { text, title, id: this.id })
      this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
    }
  }
}

</script>
