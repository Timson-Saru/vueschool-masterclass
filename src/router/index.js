import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
const routes = [
  {
    path: '/forum/:forumId',
    name: 'PageForum',
    props: true,
    beforeEnter(to, from, next) {
      const forumExists = store.state.forums.find(forum => forum.id === to.params.forumId)
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
    path: '/me',
    name: 'PageProfile',
    component: () => import(/* webpackChunkName: "HOME PAGE" */ '@/pages/PageProfile.vue')
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    props: true,
    beforeEnter(to, from, next) {
      const threadExists = store.state.threads.find(thread => thread.id === to.params.id)
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
    },
    component: () => import(/* webpackChunkName: "THREAD SHOW PAGE" */ '@/pages/PageThreadShow.vue')
  },
  {
    name: 'PageCategory',
    path: '/category/:categoryId',
    props: true,
    beforeEnter(to, from, next) {
      const categoryExists = store.state.categories.find(category => category.id === to.params.categoryId)
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
  linkActiveClass: 'jigaboo-cock-sucking-motherfuckers'
})

export default router
