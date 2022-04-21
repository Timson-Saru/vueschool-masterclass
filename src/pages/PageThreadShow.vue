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
    <p>
      By <a class="link-unstyled">{{thread.author}}</a>, <AppDate :timeStamp="thread.publishedAt"/>.
      <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{thread.replies}} replies by {{thread.contributors}} contributors</span>
    </p>
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
    posts() {
      return this.$store.state.posts
    },
    thread() {
      return this.$store.getters.thread(this.id)
    },
    threadPosts() {
      return this.posts.filter(post => post.threadId === this.id)
    }
  }
}
</script>
