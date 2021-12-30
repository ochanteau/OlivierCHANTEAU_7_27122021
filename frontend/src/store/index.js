import { createStore } from 'vuex'

const axios = require('axios');
const instance = axios.create({baseURL: 'http://localhost:3000/api/auth'});

let user = localStorage.getItem('user');
if (!user) {
 user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

console.log("////instance begin");
console.log(instance.defaults.headers.common);
console.log("////user");
console.log(user);

export default createStore({
  state: {
    user
  },
  mutations: {
    logUser : function(state,user){
      console.log("user/////")
      console.log(user)
      instance.defaults.headers.common['Authorization'] = user.token;
      console.log("////instance after");
      console.log(instance.defaults.headers.common);
      localStorage.setItem('user', JSON.stringify(user));
      state.user =user;
      console.log("state.user//////////")
      console.log(state.user)
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
