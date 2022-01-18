import { createStore } from 'vuex'
import router from '../router/index';

// import axios pour le requetes API 
const axios = require('axios');
// URL de base pour les requetes
const instance = axios.create({baseURL: 'http://localhost:3000/api'});
// configuration du token dans le header
instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`


console.log("////instance begin");
console.log(instance.defaults.headers.common);


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
    getPostList: state=> state.postList,
    isLoggedIn: state =>  state.isLoggedIn,
    fullName : state => {
               if (!state.currentUser.user_prenom || !state.currentUser.user_nom) { return null} 
               else {return state.currentUser.user_prenom[0].toUpperCase() + state.currentUser.user_prenom.slice(1)+ " " + state.currentUser.user_nom.toUpperCase()}  

    },
    firstName : state => {
      if (!state.currentUser.user_prenom ) { return null} 
      else {return state.currentUser.user_prenom[0].toUpperCase() + state.currentUser.user_prenom.slice(1)}  

    },
      
  }, 
    
  mutations: {
    //  fonction pour iodentifier l'utilisateur 
    logUser : function(state,user){
        console.log("user/////")
        console.log(user)
      // configuration du token dans le header  
      instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        console.log("////instance after");
        console.log(instance.defaults.headers.common);
      // envoie du token dans le local storage
      localStorage.setItem('token', user.token);
      // modification du state
      state.token = user.token;
      state.user_id =user.user_id;
      state.isLoggedIn = true;
        
    },
    getCurrentUser(state,payload){
      state.currentUser = payload.currentUser;
      state.user_id = payload.user_id;
    },
    updateUserPicture(state,payload){
      
      state.currentUser.user_picture= payload;
    },
    logout(state){
      localStorage.removeItem('token');
      state.currentUser={};
      state.token=null;
      state.user_id=null;
      state.isLoggedIn=false;
      router.push('/');
    },
    getAllPost(state,postList){
      state.postList = [...postList];
      
    },
    createPost(state,newPost){
      state.postList.unshift(newPost)
    },
    updatePost(state,data,index) {
      state.postList[index] = {...state.postList[index], ...data}
    }
  },
  actions: {
    async fetchCurrentUser({commit}) {
      try{
        // requete Get api pour recuperer les données utilisateur
      const response = await instance.get('/auth/currentUser');
      console.log("response.data////////");
      console.log(response.data);
      // const currentUser = JSON.parse(response.data)
      // console.log(currentUser);

      // appel de la mutation getCurrentUser du store
      // commit("getCurrentUser", currentUser);

      commit("getCurrentUser", response.data);
      // throw new Error('test');
      }
      catch(err) {
        console.log(err)
        commit("logout")
       
        
      }
    },
    async fetchAllPost ({commit}){
      try{
        // requete Get api pour recuperer la totalité des posts
      const response = await instance.get('/post/');
      console.log("response.data////////");
      console.log(response.data);
      commit;
      // appel de la mutation getAllPost du store
      commit("getAllPost", response.data);
      // throw new Error('test');
      }
      catch(err) {
        console.log(err)
        // commit("logout")
       
        
      }
    }
   


    // login : function ({commit}, user) {
    //   commit;
    //   return new Promise((resolve, reject) => {
    //     instance.post('/login',user)
    //         .then(function (response) {
    //     console.log(response);
    //   })
    //         .catch(function (error) {
    //     console.log(error);
    //   });
    //   })
    // }
    // login : async function ({commit}, user) {
    //   commit;
    //   try{
    //     const response = await instance.post('/login',user);
       
    //     return response.data;
    //   }
    //   catch (error){console.log(error)}
      
    // }
  },

  modules: {
  }
})
