import { createStore } from 'vuex'

// import axios pour le requetes API 
const axios = require('axios');
// URL de base pour les requetes
const instance = axios.create({baseURL: 'http://localhost:3000/api/auth'});
// configuration du token dans le header
instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`


console.log("////instance begin");
console.log(instance.defaults.headers.common);


export default createStore({
  state: {
    user_id:"",
    // assignation du token via local storage
    token :localStorage.getItem('token'),
    // verification de la presence du token
    isLoggedIn: localStorage.getItem('token')? true:false
  },
  getters:{
    isLoggedIn: state =>  state.isLoggedIn
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
        
    }
  },
  actions: {
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
