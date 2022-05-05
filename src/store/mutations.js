import { findById, apsert, docToResource } from '@/helpers'

export default {
  setItem(state, { resource, item }) {
    apsert(state[resource], docToResource(item))
  },
  appendUnsubscribe(state, { unsubscribe }) {
    state.unsubscribes.push(unsubscribe)
  },
  clearAllUnsubscribes(state) {
    state.unsubscribes = []
  },
  appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
  appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
  appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),
  appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' })
}
function makeAppendChildToParentMutation({ parent, child }) {
  return (state, { parentId, childId }) => {
    const resource = findById(state[parent], parentId)
    if (!resource) {
      console.warn(`There is no id:${parentId} in state[${parent}]`)
      return
    }
    resource[child] = resource[child] || []
    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}
