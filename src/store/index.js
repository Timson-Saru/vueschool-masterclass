import { createStore } from 'vuex'
import sourceData from '@/data.json'

export default createStore({
  state: sourceData,
  actions: {
    createPost(context, post) {
      post.id = 'testUser' + Math.random()
      context.commit('addPost', post)
      context.commit('appendToThread', { threadId: post.threadId, postId: post.id })
    }
  },
  mutations: {
    addPost(state, post) {
      state.posts.push(post)
    },
    appendToThread(state, { threadId, postId }) {
      state.threads.find(thread => thread.id === threadId).posts.push(postId)
      console.log(postId)
    }
  }
})
