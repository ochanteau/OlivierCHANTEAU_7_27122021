import { createStore } from 'vuex'

const axios = require('axios');
const instance = axios.create({baseURL: 'http://localhost:3000/api/auth'});
instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`
// let token = localStorage.getItem('token');
// console.log("///////token");
// console.log(token);

// if (!token) {token = ""}
// else {
//   try {
//     token = JSON.parse(token);
//     instance.defaults.headers.common['Authorization'] =`Bearer ${token}`;
//   } catch (err) {
//     token = ''
//     }
// }


console.log("////instance begin");
console.log(instance.defaults.headers.common);
// console.log("////token");
// console.log(token);

export default createStore({
  state: {
    user_id:"",
    token :localStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('token')? true:false
  },
  getters:{
    isLoggedIn: state =>  state.isLoggedIn
  },
    
  mutations: {
    logUser : function(state,user){
        console.log("user/////")
        console.log(user)
      instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        console.log("////instance after");
        console.log(instance.defaults.headers.common);
      // localStorage.setItem('token', JSON.stringify(user.token));
      localStorage.setItem('token', user.token);
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
