<template>
  <div class="col-large push-top" >

    <h1>{{ thread.title }}</h1>
     <router-link
      v-if="thread?.id"
      class="btn btn-blue"
      :to="{ name: 'PageUpdateThread', params: { id: this.id } }"
      tag="button"
    >
      Edit
    </router-link>
    <p>
      By <a class="link-unstyled">{{thread.author?.name}}</a>, <AppDate :timeStamp="thread.publishedAt"/>.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >
        {{thread.repliesCount}} replies by {{thread.contributorsCount}}
        {{thread.contributorsCount === 1 ? 'contributors' : 'contributor'}}
      </span>
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
  async created() {
    const thread = await this.$store.dispatch('fetchThread', { id: this.id })
    this.$store.dispatch('fetchUser', { id: thread.userId })
    thread.posts.forEach(async(postId) => {
      const post = await this.$store.dispatch('fetchPost', { id: postId })
      this.$store.dispatch('fetchUser', { id: post.userId })
    })
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
