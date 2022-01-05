import { createRouter, createWebHistory } from 'vue-router'
// import de la vue d'authentification
import Authentification from '../views/Authentification.vue'
// import de la vue principale avec les posts
import Home from '../views/Home.vue'
// import du store
// import store from '../store/index';



const routes = [
  {
    path: '/',
    name: 'Authentification',
    component: Authentification,
    meta:{title: "Groupomania"},
    // si utilisateur déja loguer , on le dirige vers vue home
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
    // si pas loguer on le dirige vers la vue authentification 
    // beforeEnter(to,from,next){
    //   if (store.getters.isLoggedIn) { next()}
    //   else {router.push("/")}
    // }
   
  },
  {
    // si la route ne correspond à aucune vue, on renvoie vers vue authentification 
   path: '/:pathMatch(.*)*',
   redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
