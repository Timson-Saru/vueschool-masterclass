<template>
  <div class="col-full push-top">
    <h1>Create new thread in <i>{{forum.name}}</i></h1>
    <form action="">
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
        <router-link @click="save" :to="{ name: 'PageForum', params: { forumId: forum.id } }" class="btn btn-blue" name="Publish">Publish</router-link>
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
    cancel() {},
    save() {
      const thread = {
        text: this.text,
        title: this.title,
        forumId: this.forumId
      }
      this.$store.dispatch('createThread', thread)
    }
  }
}

</script>
