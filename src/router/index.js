import { createRouter, createWebHistory } from 'vue-router'
import PageProfile from '@/pages/PageProfile.vue'
import PageForum from '@/pages/PageForum.vue'
import PageHome from '@/pages/PageHome.vue'
import PageCreateThread from '@/pages/PageCreateThread.vue'
import PageThreadShow from '@/pages/PageThreadShow.vue'
import PageUpdateThread from '@/pages/PageUpdateThread.vue'
import PageCategory from '@/pages/PageCategory.vue'
import Page404 from '@/pages/Page404.vue'
import store from '@/store'
import { findById } from '@/helpers'
const routes = [
  {
    path: '/forum/:forumId',
    name: 'PageForum',
    props: true,
    // beforeEnter(to, from, next) {
    //   const forumExists = findById(store.state.forums, to.params.forumId)
    //   if (forumExists) {
    //     next()
    //   } else {
    //     next({
    //       name: 'NoPage',
    //       params: { pathMatch: to.path.substring(1).split('/') },
    //       hash: to.hash,
    //       query: to.query
    //     })
    //   }
    // },
    component: PageForum
  },
  {
    path: '/',
    name: 'PageHome',
    component: PageHome
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'PageCreateThread',
    props: true,
    component: PageCreateThread
  },
  {
    path: '/me/edit',
    name: 'PageProfileEdit',
    props: { edit: true },
    component: PageProfile
  },
  {
    path: '/me',
    name: 'PageProfile',
    meta: { toTop: true, smoothScroll: true },
    component: PageProfile
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    props: true,
    component: PageThreadShow,
    beforeEnter(to, from, next) {
      const threadExists = findById(store.state.threads, to.params.id)
      if (threadExists) {
        next()
      } else {
        next({
          name: 'NoPage',
          params: { pathMatch: to.path.substring(1).split('/') },
          hash: to.hash,
          query: to.query
        })
      }
    }
  },
  {
    path: '/thread/:id/edit',
    name: 'PageUpdateThread',
    props: true,
    component: PageUpdateThread
  },
  {
    name: 'PageCategory',
    path: '/category/:categoryId',
    props: true,
    // beforeEnter(to, from, next) {
    //   const categoryExists = findById(store.state.categories, to.params.categoryId)
    //   if (categoryExists) {
    //     next()
    //   } else {
    //     next({
    //       name: 'NoPage',
    //       params: { pathMatch: to.path.substring(1).split('/') },
    //       hash: to.hash,
    //       query: to.query
    //     })
    //   }
    // },
    component: PageCategory
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NoPage',
    component: Page404
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'activeLink',
  scrollBehavior(to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})
router.beforeEach(() => {
  console.log('unsub')
  store.dispatch('unsubscribeAllSnapshots')
})
export default router
