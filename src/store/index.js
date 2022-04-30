import { createStore } from 'vuex'
import { findById, apsert } from '@/helpers'
import firebase from 'firebase/compat/app'

export default createStore({
  state: {
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
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
        if (!thread) return {}
        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId)
          },
          get repliesCount() {
            return thread.posts.length - 1
          },
          get contributorsCount() {
            return thread.contributors.length
          }
        }
      }
    }
  },
  actions: {
    // ---------------------
    // Fetch single resource
    // ---------------------
    fetchCategory({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'categories', id })
    },
    fetchForum({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'forums', id })
    },
    fetchThread({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'threads', id })
    },
    fetchUser({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'users', id })
    },
    fetchPost({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'posts', id })
    },
    fetchItem({ commit }, { id, resource }) {
      return new Promise(resolve => {
        firebase.firestore().collection(resource).doc(id).onSnapshot((doc) => {
          const item = { ...doc.data(), id: doc.id }
          commit('addItem', { resource, id, item })
          resolve(item)
        })
      })
    },
    // ------------------------
    // Fetch multiple resources
    // ------------------------
    fetchAllCategories({ commit }) {
      return new Promise((resolve) => {
        firebase.firestore().collection('categories').onSnapshot((querySnapshot) => {
          const categories = querySnapshot.docs.map(doc => {
            const item = { id: doc.id, ...doc.data() }
            commit('addItem', { resource: 'categories', item })
            return item
          })
          resolve(categories)
        })
      })
    },
    fetchCategories({ dispatch }, { ids }) {
      return dispatch('fetchItems', { resource: 'categories', ids })
    },
    fetchForums({ dispatch }, { ids }) {
      return dispatch('fetchItems', { resource: 'forums', ids })
    },
    fetchThreads({ dispatch }, { ids }) {
      return dispatch('fetchItems', { resource: 'threads', ids })
    },
    fetchUsers({ dispatch }, { ids }) {
      return dispatch('fetchItems', { resource: 'users', ids })
    },
    fetchPosts({ dispatch }, { ids }) {
      return dispatch('fetchItems', { resource: 'posts', ids })
    },
    fetchItems({ dispatch }, { ids, resource }) {
      return Promise.all(ids.map(id => dispatch('fetchItem', { id, resource })))
    },
    createPost({ commit, state }, post) {
      post.id = 'testUser' + Math.random()
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      commit('addItem', { resource: 'posts', item: post })
      commit('appendPostToThread', { childId: post.id, parentId: post.threadId })
      commit('appendContributorToThread', { childId: state.authId, parentId: post.threadId })
    },
    updateUser({ commit }, user) {
      commit('addItem', { resource: 'users', item: user })
    },
    async createThread({ state, commit, dispatch }, { title, text, forumId }) {
      const id = 'gggThread' + Math.random()
      const userId = state.authId
      const publishedAt = Math.floor(Date.now() / 1000)
      const thread = { forumId, id, userId, title, publishedAt }
      commit('addItem', { resource: 'threads', item: thread })
      commit('appendThreadToForum', { childId: thread.id, parentId: thread.forumId })
      commit('appendThreadToUser', { childId: id, parentId: userId })
      dispatch('createPost', { text, threadId: id })
      return findById(state.threads, id)
    },
    async updateThread({ state, commit }, { title, text, id }) {
      const thread = findById(state.threads, id)
      const post = findById(state.posts, thread.posts[0])
      const newThread = { ...thread, title }
      const newPost = { ...post, text }
      commit('addItem', { resource: 'threads', item: newThread })
      commit('addItem', { resource: 'posts', item: newPost })
      return newThread
    }
  },
  mutations: {
    addItem(state, { resource, item }) {
      apsert(state[resource], item)
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
    if (!resource) {
      console.log(`${childId} cant be pushed to ${parentId} cus no`)
      return
    }
    resource[child] = resource[child] || []
    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}
