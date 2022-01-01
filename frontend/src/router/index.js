import { createRouter, createWebHistory } from 'vue-router'
import authentification from '../views/authentification.vue'

const routes = [
  {
    path: '/',
    name: 'authentification',
    component: authentification,
    meta:{title: "Groupomania"}
  },
  {
    path: '/about',
    name: 'About',
    meta:{title: "about"},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
   path: '/:pathMatch(.*)*',
   redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
