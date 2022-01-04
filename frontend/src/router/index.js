import { createRouter, createWebHistory } from 'vue-router'
import Authentification from '../views/Authentification.vue'
import Home from '../views/Home.vue'
// import store from '../store/index';



const routes = [
  {
    path: '/',
    name: 'Authentification',
    component: Authentification,
    meta:{title: "Groupomania"},
    // beforeEnter(to,from,next){
    //   if (store.getters.isLoggedIn) { router.push("/home")}
    //   else {next()}
    // }
  },
  {
    path: '/home',
    name: 'Home',
    meta:{title: "Groupomania-Home"},
    component: Home,
    // beforeEnter(to,from,next){
    //   if (store.getters.isLoggedIn) { next()}
    //   else {router.push("/")}
    // }
   
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
