<template>
  <div class="col-full push-top">
    <h1>Create new thread in <i>{{forum.name}}</i></h1>
    <form @submit.prevent="save">
      <div class="form-group">
        <label for="thread_title">Title:</label>
        <input v-model="title" type="text" id="thread_title" class="form-input" name="title">
      </div>
      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea v-model="text" id="thread_content" class="form-input" name="content" rows="8" cols="140"></textarea>
      </div>
      <div class="btn-group">
        <button @click="cancel" class="btn btn-ghost">Cancel</button>
        <button type="submit" class="btn btn-blue" name="Publish">Publish</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  props: {
    forumId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      text: '',
      title: ''
    }
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
    async save() {
      const thread = await this.$store.dispatch('createThread', {
        text: this.text,
        title: this.title,
        forumId: this.forumId
      })
      this.$router.push({ name: 'ThreadShow', params: { id: thread.id } })
    }
  }
}

</script>
