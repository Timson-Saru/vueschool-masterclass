import { createRouter, createWebHistory } from 'vue-router'
import sourceData from '@/data.json'
const routes = [
  {
    path: '/forum/:forumId',
    name: 'PageForum',
    props: true,
    component: () => import('@/pages/PageForum.vue')
  },
  {
    path: '/',
    name: 'PageHome',
    component: () => import(/* webpackChunkName: "HOME PAGE" */ '@/pages/PageHome.vue')
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    props: true,
    beforeEnter(to, from, next) {
      const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
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
      const threadExists = sourceData.categories.find(category => category.id === to.params.categoryId)
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
