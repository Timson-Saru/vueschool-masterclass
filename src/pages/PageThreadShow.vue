<template>
  <div class="col-large push-top" >

    <h1>{{ thread.title }}</h1>
     <router-link
      class="btn btn-blue"
      :to="{ name: 'PageUpdateThread', params: { id: this.id } }"
      tag="button"
    >
      Edit
    </router-link>
    <PostList :posts="threadPosts"/>

    <PostEditor @saveNewPost="save"/>

  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'
import { findById } from '@/helpers'
export default {
  methods: {
    save({ postData }) {
      this.$store.dispatch('createPost', {
        ...postData,
        threadId: this.id
      })
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
      return findById(this.threads, this.id)
    },
    threadPosts() {
      return this.posts.filter(post => post.threadId === this.id)
    }
  }
}
</script>
