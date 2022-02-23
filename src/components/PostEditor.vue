<template>
    <form action="" @submit.prevent="addPost">

      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea v-model="newPostText" id="thread_content" class="form-input" name="content" rows="8" cols="140"></textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-blue" type="submit" name="Publish">Publish</button>
      </div>

    </form>
</template>

<script>
export default {
  methods: {
    addPost() {
      const postData = {
        text: this.newPostText
      }
      this.$emit('saveNewPost', { postData })
      this.newPostText = ''
    }
  },
  data() {
    return {
      newPostText: ''
    }
  }
}
</script>
