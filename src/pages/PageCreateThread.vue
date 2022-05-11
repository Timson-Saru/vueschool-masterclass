<template>

  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Create new thread in <i>{{forum.name}}</i></h1>
    <ThreadEditor
      @clean="formIsDirty = false"
      @dirty="formIsDirty = true"
      @save="save"
      @cancel="cancel"
    />
  </div>

</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { mapActions } from 'vuex'
import { findById } from '@/helpers'
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
  mixins: [asyncDataStatus],
  computed: {
    forum() {
      return findById(this.$store.state.forums, this.forumId)
    }
  },
  methods: {
    ...mapActions(['createThread', 'fetchForum']),
    cancel() {
      this.$router.push({ name: 'PageForum', params: { forumId: this.forumId } })
    },
    async save({ title, text }) {
      const thread = await this.createThread({
        text,
        title,
        forumId: this.forumId
      })
      this.$router.push({ name: 'ThreadShow', params: { id: thread.id } })
    }
  },
  async created() {
    await this.fetchForum({ id: this.forumId })
    this.asyncDataStatus_fetched()
  },
  beforeRouteLeave(to, from) {
    if (this.formIsDirty) {
      const confirmed = window.confirm('Are you sure you want to leave? Unsaved changes will be lost')
      if (!confirmed) return false
    }
  },
  data() {
    return {
      formIsDirty: false
    }
  }
}

</script>
