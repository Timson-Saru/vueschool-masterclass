import { createStore } from 'vuex'
import sourceData from '@/data.json'

export default createStore({
  state: sourceData,
  actions: {
    createPost(context, postObject) {
      postObject.id = 'testUser' + Math.random()
      context.commit('addPost', postObject)
      context.commit('appendToThread', postObject)
    }
  },
  mutations: {
    addPost(state, newPost) {
      state.posts.push(newPost)
    },
    appendToThread(state, { threadId, PostId }) {
      state.threads.find(thread => thread.id === threadId).posts.push(PostId)
      console.log(state)
    }
  }
})
