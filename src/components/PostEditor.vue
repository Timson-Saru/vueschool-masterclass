<template>
    <form action="" @submit.prevent="addPost">

      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea v-model="postCopy.text" id="thread_content" class="form-input" name="content" rows="8" cols="140"></textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-blue" type="submit" name="Publish">{{post.text ? 'Update' : 'Publish'}}</button>
      </div>

    </form>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => ({ text: null })
    }
  },
  data() {
    return {
      postCopy: { ...this.post }
    }
  },
  methods: {
    addPost() {
      this.$emit('save', { post: this.postCopy })
      this.postCopy.text = ''
    }
  }
}
</script>
