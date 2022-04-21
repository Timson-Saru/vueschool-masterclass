import { createStore } from 'vuex'
import sourceData from '@/data.json'
import { findById, apsert } from '@/helpers'

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
    },
    thread: state => {
      return (threadId) => {
        const thread = findById(state.threads, threadId)
        return {
          ...thread,
          get replies() {
            return thread.posts.length - 1
          },
          get contributors() {
            return thread.contributors.length
          },
          get author() {
            return findById(state.users, thread.userId).name
          }
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
      context.commit('appendPostToThread', { childId: post.id, parentId: post.threadId })
      context.commit('appendContributorToThread', { childId: post.userId, parentId: post.threadId })
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
  console.log('mutation call has been pooped')
  return (state, { parentId, childId }) => {
    const resource = findById(state[parent], parentId)
    resource[child] = resource[child] || []
    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}
