import { createStore } from 'vuex'
import router from '../router/index';

// import axios pour le requetes API 
const axios = require('axios');
// URL de base pour les requetes
const instance = axios.create({baseURL: 'http://localhost:3000/api'});
// configuration du token dans le header
instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`


export default createStore({
  state: {
    user_id:null,
    currentUser:{},
    postList:[],
    // assignation du token via local storage
    token :localStorage.getItem('token'),
    // verification de la presence du token
    isLoggedIn: localStorage.getItem('token')? true:false
  },
  getters:{
  
    isLoggedIn: state =>  state.isLoggedIn,
    // recupération du nom et du prenom de l'utilisateur et mise en capital
    fullName : state => {
               if (!state.currentUser.user_prenom || !state.currentUser.user_nom) { return null} 
               else {return state.currentUser.user_prenom[0].toUpperCase() + state.currentUser.user_prenom.slice(1)+ " " + state.currentUser.user_nom.toUpperCase()}  

    },
    //  recupération du prenom de l'utilisateur et mise en capital
    firstName : state => {
      if (!state.currentUser.user_prenom ) { return null} 
      else {return state.currentUser.user_prenom[0].toUpperCase() + state.currentUser.user_prenom.slice(1)}  

    },
      
  }, 
    
  mutations: {
    //  fonction pour identifier l'utilisateur 
    logUser : function(state,user){
      // configuration du token dans le header  
      instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      // envoie du token dans le local storage
      localStorage.setItem('token', user.token);
      // modification du state
      state.token = user.token;
      state.user_id =user.user_id;
      state.isLoggedIn = true;
        
    },
    // MAJ  apres actions requete API  FetchCurrentUSer
    getCurrentUser(state,payload){
      state.currentUser = payload.currentUser;
      state.user_id = payload.user_id;
    },
    // MAJ de l url de la photo de profil de l'utilisateur
    updateUserPicture(state,payload){
      state.currentUser.user_picture= payload;
    },
    // deconnection de l'utilateur 
    logout(state){
      localStorage.removeItem('token');
      state.currentUser={};
      state.token=null;
      state.user_id=null;
      state.isLoggedIn=false;
      router.push('/');
    },
    // MAJ de l'ensemble des publications
    getAllPost(state,postList){
      state.postList = [...postList];
      
    },
    // ajout d une nouvelle publication dans la liste de publication
    createPost(state,newPost){
      state.postList.unshift(newPost)
    },
    // MAJ d'une publication
    updatePost(state,data) {
      state.postList[data.post_index] = {...state.postList[data.post_index], ...data}
    },
    // suppression d'une publication
    deletePost(state,post_index){
      state.postList.splice(post_index,1);

    }
  },
  actions: {
    // recuperation API des infos de l'utilisateur
    async fetchCurrentUser({commit}) {
      try{
        // requete Get api pour recuperer les données utilisateur
      const response = await instance.get('/auth/currentUser');
      commit("getCurrentUser", response.data);
      }
      // en cas d'erreur on appelle logout 
      catch(err) {
        console.log(err)
        commit("logout")
       
        
      }
    },
    // recuperation API de l'ensemble des publications
    async fetchAllPost ({commit}){
      try{
        // requete Get api pour recuperer la totalité des posts
      const response = await instance.get('/post/');
      // appel de la mutation getAllPost du store
      commit("getAllPost", response.data);
      }
      catch(err) {
        console.log(err)    
      }
    }
  },

  modules: {
  }
})
