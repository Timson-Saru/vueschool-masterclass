import { createStore } from 'vuex'
import sourceData from '@/data.json'

export default createStore({
  state: {
    ...sourceData,
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters: {
    authUser: state => state.users.find(user => user.id === state.authId),
    assBoy: () => 'cocky boy',
    assGirl: () => 'cocky girl'
  },
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
