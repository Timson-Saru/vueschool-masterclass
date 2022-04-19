import { createStore } from 'vuex'
import sourceData from '@/data.json'
import { findById } from '@/helpers'

export default createStore({
  state: {
    ...sourceData,
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters: {
    authUser: state => {
      const user = findById(state.users, state.authId)
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
    async createThread(context, { title, text, forumId }) {
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
      return findById(context.state.threads, id)
    },
    async updateThread(context, { title, text, id }) {
      const thread = findById(context.state.threads, id)
      const post = findById(context.state.posts, thread.posts[0])
      const newThread = { ...thread, title }
      const newPost = { ...post, text }
      context.commit('addThread', newThread)
      context.commit('addPost', newPost)
      return newThread
    }
  },
  mutations: {
    addThread(state, thread) {
      const index = state.threads.findIndex(t => t.id === thread.id)
      if (index !== -1) {
        state.threads[index] = thread
      } else {
        state.threads.push(thread)
      }
    },
    appendToForums(state, { forumId, threadId }) {
      findById(state.forums, forumId).threads.push(threadId)
    },
    saveUser(state, { user, userId }) {
      const userIndex = state.users.findIndex(user => user.id === userId)
      state.users[userIndex] = user
    },
    addPost(state, post) {
      const index = state.posts.findIndex(p => p.id === post.id)
      if (index !== -1) {
        state.posts[index] = post
      } else {
        state.posts.push(post)
      }
    },
    appendToThread(state, { threadId, postId }) {
      findById(state.threads, threadId).posts.push(postId)
    }
  }
})
