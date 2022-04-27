import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import PageProfile from '@/pages/PageProfile.vue'
import PageThreadShow from '@/pages//PageThreadShow.vue'
import { findById } from '@/helpers'
const routes = [
  {
    path: '/forum/:forumId',
    name: 'PageForum',
    props: true,
    beforeEnter(to, from, next) {
      const forumExists = findById(store.state.forums, to.params.forumId)
      if (forumExists) {
        next()
      } else {
        next({
          name: 'NoPage',
          params: { pathMatch: to.path.substring(1).split('/') },
          hash: to.hash,
          query: to.query
        })
      }
    },
    component: () => import('@/pages/PageForum.vue')
  },
  {
    path: '/',
    name: 'PageHome',
    component: () => import(/* webpackChunkName: "HOME PAGE" */ '@/pages/PageHome.vue')
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'PageCreateThread',
    props: true,
    component: () => import(/* webpackChunkName: "HOME PAGE" */ '@/pages/PageCreateThread.vue')
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
    component: () => import(/* webpackChunkName: "HOME PAGE" */ '@/pages/PageProfile.vue')
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    props: true,
    component: () => import(/* webpackChunkName: "THREAD SHOW PAGE" */ '@/pages/PageThreadShow.vue')
    // beforeEnter(to, from, next) {
    //   const threadExists = findById(store.state.threads, to.params.id)
    //   if (threadExists) {
    //     next()
    //   } else {
    //     next({
    //       name: 'NoPage',
    //       params: { pathMatch: to.path.substring(1).split('/') },
    //       hash: to.hash,
    //       query: to.query
    //     })
    //   }
    // }
  },
  {
    path: '/thread/:id/edit',
    name: 'PageUpdateThread',
    props: true,
    component: () => import(/* webpackChunkName: "HOME PAGE" */ '@/pages/PageUpdateThread.vue')
  },
  {
    name: 'PageCategory',
    path: '/category/:categoryId',
    props: true,
    beforeEnter(to, from, next) {
      const categoryExists = findById(store.state.categories, to.params.categoryId)
      if (categoryExists) {
        next()
      } else {
        next({
          name: 'NoPage',
          params: { pathMatch: to.path.substring(1).split('/') },
          hash: to.hash,
          query: to.query
        })
      }
    },
    component: () => import('@/pages/PageCategory.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NoPage',
    component: () => import(/* webpackChunkName: "404 PAGE" */ '@/pages/Page404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'jigaboo-cock-sucking-motherfuckers',
  scrollBehavior(to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})

export default router
