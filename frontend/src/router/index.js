import { createRouter, createWebHistory } from 'vue-router'
// import de la vue d'authentification
import Authentification from '../views/Authentification.vue'
// import de la vue principale avec les posts
import Home from '../views/Home.vue'
// import de la vue profil
import Profil from '../views/Profil.vue'
// import du store
import store from '../store/index';


const routes = [
  // route vers la vue d'authentification
  {
    path: '/',
    name: 'Authentification',
    component: Authentification,
    meta:{title: "Groupomania"},
    // si utilisateur déja loguer , on le dirige vers vue home
    beforeEnter(to,from,next){
      if (store.getters.isLoggedIn) { router.push("/home")}
      else {next()}
    }
  },
  // route vers la vue principale avec l'ensemble des publications
  {
    path: '/home',
    name: 'Home',
    meta:{title: "Groupomania-Home"},
    component: Home,
    // si pas loguer on le dirige vers la vue authentification 
    beforeEnter(to,from,next){
      if (store.getters.isLoggedIn) { next()}
      else {router.push("/")}
    }
   
  },
  // route vers la vue de profil
  {
    path: '/profil',
    name: 'Profil',
    meta:{title: "Groupomania-Profil"},
    component: Profil,
    // si pas loguer on le dirige vers la vue authentification 
    beforeEnter(to,from,next){
      if (store.getters.isLoggedIn) { next()}
      else {router.push("/")}
    }
 
   
  },
  // match de l'ensemble des autres routes
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
