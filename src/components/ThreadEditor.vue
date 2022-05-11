<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="form_title">Title:</label>
      <input v-model="form.title" type="text" id="form_title" class="form-input" name="title">
    </div>
    <div class="form-group">
      <label for="form_content">Content:</label>
      <textarea v-model="form.text" id="form_content" class="form-input" name="content" rows="8" cols="140"></textarea>
    </div>
    <div class="btn-group">
      <button @click.prevent="$emit('cancel')" class="btn btn-ghost">Cancel</button>
      <button type="submit" class="btn btn-blue" name="Publish">{{ textExists ? 'Update' : 'Publush' }}</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        title: this.title,
        text: this.text
      }
    }
  },
  methods: {
    save() {
      this.$emit('clean')
      this.$emit('save', { ...this.form })
    }
  },
  computed: {
    textExists() {
      return !!this.title
    }
  },
  watch: {
    form: {
      handler() {
        if (this.form.title !== this.title || this.form.text !== this.text) {
          this.$emit('dirty')
        } else {
          this.$emit('clean')
        }
      },
      deep: true
    }
  }
}
</script>
