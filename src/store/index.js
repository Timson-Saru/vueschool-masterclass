import { createStore } from 'vuex'
import sourceData from '@/data.json'
import { findById, apsert } from '@/helpers'

export default createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser: (state, getters) => {
      return getters.user(state.authId)
    },
    user: state => {
      return (id) => {
        const user = findById(state.users, id)
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
    thread: state => {
      return (id) => {
        const thread = findById(state.threads, id)
        // thread.contributors = thread.contributors || []
        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId).name
          },
          get repliesCount() {
            return thread.posts.length - 1
          },
          get contributorsCount() {
            return thread.contributors ? thread.contributors.length : 0
          }
        }
      }
    }
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = 'testUser' + Math.random()
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      commit('addPost', post)
      commit('appendPostToThread', { childId: post.id, parentId: post.threadId })
      commit('appendContributorToThread', { childId: state.authId, parentId: post.threadId })
    },
    updateUser({ commit }, user) {
      commit('saveUser', { user, userId: user.id })
    },
    async createThread(context, { title, text, forumId }) {
      const id = 'gggThread' + Math.random()
      const userId = context.state.authId
      const publishedAt = Math.floor(Date.now() / 1000)
      const newThread = { forumId, id, userId, title, publishedAt }
      context.commit('addThread', newThread)
      context.commit('appendThreadToForum', { childId: newThread.id, parentId: newThread.forumId })
      context.commit('appendThreadToUser', { childId: id, parentId: userId })
      context.dispatch('createPost', { text, threadId: id })
      return findById(context.state.threads, id)
    },
    updateThread(context, { title, text, id }) {
      const thread = findById(context.state.threads, id)
      const post = findById(context.state.posts, thread.posts[0])
      const newThread = { ...thread, title }
      const newPost = { ...post, text }
      context.commit('addThread', newThread)
      context.commit('addPost', newPost)
    }
  },
  mutations: {
    addThread(state, thread) {
      apsert(state.threads, thread)
    },
    addPost(state, post) {
      apsert(state.posts, post)
    },
    saveUser(state, { user, userId }) {
      const userIndex = state.users.findIndex(user => user.id === userId)
      state.users[userIndex] = user
    },
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),
    appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' })
  }
})

function makeAppendChildToParentMutation({ parent, child }) {
  return (state, { parentId, childId }) => {
    const resource = findById(state[parent], parentId)
    resource[child] = resource[child] || []
    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}
