<template>
  <div class="col-large push-top" >

    <h1>{{ thread.title }}</h1>

    <PostList :posts="threadPosts"/>

    <PostEditor @saveNewPost="save"/>

  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'

export default {
  methods: {
    save({ postData }) {
      const postObject = {
        ...postData,
        threadId: this.id
      }
      this.$store.dispatch('createPost', postObject)
    }
  },
  components: {
    PostList,
    PostEditor
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    threads() {
      return this.$store.state.threads
    },
    posts() {
      return this.$store.state.posts
    },
    thread() {
      return this.threads.find(thread => thread.id === this.id)
    },
    threadPosts() {
      return this.posts.filter(post => post.threadId === this.id)
    }
  }
}
</script>
