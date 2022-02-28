import { createStore } from 'vuex'
import sourceData from '@/data.json'

export default createStore({
  state: {
    ...sourceData,
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters: {
    authUser: state => {
      const user = state.users.find(user => user.id === state.authId)
      if (!user) return null
      return {
        ...user,
        get posts() {
          return state.posts.filter(post => post.userId === user.id)
        },
        get threads() {
          return state.threads.filter(thread => thread.userId === user.id)
        },
        get postsCount() {
          return this.posts.length
        },
        get threadsCount() {
          return this.threads.length
        }
      }
    }
  },
  actions: {
    createPost(context, post) {
      post.id = 'testUser' + Math.random()
      post.userId = context.state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      context.commit('addPost', post)
      context.commit('appendToThread', { threadId: post.threadId, postId: post.id })
    },
    updateUser({ commit }, user) {
      commit('saveUser', { user, userId: user.id })
    },
    createThread(context, { title, text, forumId }) {
      const id = 'gggThreadUser' + Math.random()
      const userId = context.state.authId
      const publishedAt = Math.floor(Date.now() / 1000)
      const newThread = {
        forumId,
        id,
        userId,
        title,
        publishedAt,
        posts: []
      }
      context.commit('addThread', newThread)
      context.commit('appendToForums', { threadId: newThread.id, forumId: newThread.forumId })
      context.dispatch('createPost', { text, threadId: id })
    }
  },
  mutations: {
    addThread(state, thread) {
      state.threads.push(thread)
    },
    appendToForums(state, { forumId, threadId }) {
      state.forums.find(forum => forum.id === forumId).threads.push(threadId)
    },
    saveUser(state, { user, userId }) {
      const userIndex = state.users.findIndex(user => user.id === userId)
      state.users[userIndex] = user
    },
    addPost(state, post) {
      state.posts.push(post)
    },
    appendToThread(state, { threadId, postId }) {
      state.threads.find(thread => thread.id === threadId).posts.push(postId)
    }
  }
})
