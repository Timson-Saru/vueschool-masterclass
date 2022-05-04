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
      By <a class="link-unstyled">{{thread.author?.name}}</a>, <AppDate v-if="thread.publishedAt" :timeStamp="thread.publishedAt"/>.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >
        {{thread.repliesCount}} {{repliesText}} by {{thread.contributorsCount}} {{contributorsText}}
      </span>
    </p>
    <PostList :posts="threadPosts"/>
    <PostEditor @save="save"/>

  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'
import { mapActions } from 'vuex'

export default {
  computed: {
    posts() {
      return this.$store.state.posts
    },
    thread() {
      return this.$store.getters.thread(this.id)
    },
    threadPosts() {
      return this.posts.filter(post => post.threadId === this.id)
    },
    contributorsText() {
      return this.thread.contributorsCount === 1 ? 'contributor' : 'contributors'
    },
    repliesText() {
      return this.thread.repliesCount === 1 ? 'reply' : 'replies'
    }
  },
  methods: {
    ...mapActions(['createPost', 'fetchThread', 'fetchPosts', 'fetchUsers']),
    save({ post }) {
      this.createPost({
        ...post,
        threadId: this.id
      })
    }
  },
  async created() {
    const thread = await this.fetchThread({ id: this.id })
    const posts = await this.fetchPosts({ ids: thread.posts })
    const users = posts.map(post => post.userId).concat(thread.userId)
    this.fetchUsers({ ids: users })
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
  }

}
</script>
