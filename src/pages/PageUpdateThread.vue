<template>
  <div class="col-full push-top">
    <!-- <h1>Editing: <i>{{thread.title}}</i></h1> -->
    <ThreadEditor :title="thread.title" :text="firstPost" @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue'
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
      return this.$store.state.threads.find(t => {
        console.log('looking for:', this.id, 'WITH THIS', t.id)
        return t.id === this.id
      })
    },
    firstPost() {
      return this.$store.state.posts.find(p => p.id === this.thread.posts[0]).text
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
    },
    async save({ title, text }) {
      const thread = await this.$store.dispatch('updateThread', { text, title, id: this.id })
      this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
    }
  }
}

</script>
