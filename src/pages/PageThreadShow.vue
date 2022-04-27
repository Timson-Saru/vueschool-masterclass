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
        {{thread.contributorsCount > 1 ? 'contributors' : 'contributor'}}
      </span>
    </p>
    <PostList :posts="threadPosts"/>
    <PostEditor @saveNewPost="save"/>

  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
export default {
  methods: {
    save({ postData }) {
      this.$store.dispatch('createPost', {
        ...postData,
        threadId: this.id
      })
    }
  },
  created() {
    firebase.firestore().collection('threads').doc(this.id).onSnapshot((doc) => {
      const thread = { ...doc.data(), id: doc.id }
      this.$store.commit('addThread', { thread })

      firebase.firestore().collection('users').doc(thread.userId).onSnapshot((doc) => {
        const user = { ...doc.data(), id: doc.id }
        this.$store.commit('addUser', { user })
      })

      thread.posts.forEach(postId => {
        firebase.firestore().collection('posts').doc(postId).onSnapshot((doc) => {
          const post = { ...doc.data(), id: doc.id }
          this.$store.commit('addPost', { post })

          firebase.firestore().collection('users').doc(post.userId).onSnapshot((doc) => {
            const user = { ...doc.data(), id: doc.id }
            this.$store.commit('addUser', { user })
          })
        })
      })
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
