<template>
  <div class="auth">
    <div class="auth__img">
    <img height="100" width="100"    src="../assets/icon.svg" alt="logo groupomania">
    <h1 class="auth__h1">Groupomania</h1>
    </div>
    <h3 class="auth__h3">Bienvenue sur le réseau social de votre entreprise !</h3>

    <form class="auth__form" :class="{ 'auth__form--login': mode=='login' }">
      <div v-if="mode=='createAccount'">
        <label for="nom"></label>
        <input v-model="nom" type="text" id="nom" name="user_nom" placeholder="Votre nom :" required >
      </div>
      <div v-if="mode=='createAccount'">
        <label for="prénom"></label>
        <input v-model="prenom" type="text" id="prénom" name="user_prénom" placeholder="Votre prénom :" required>
      </div>
      <div>
        <label for="mail"></label>
        <input v-model="email" type="email" id="mail" name="user_email" placeholder="Votre e-mail :" required>
      </div>
      <div>
        <label for="password"></label>
        <input v-model="password" type="text" id="password" name="user_password" placeholder="Votre mot de passe :" required>
      </div>
      <div class="auth__form__button">
        <button v-if="mode=='login'" class="auth__form__button--login" :class="{'auth__form__button--disabled' : !validatedFields}"  type="submit">Se connecter</button>
        <button v-else :class="{'auth__form__button--disabled' : !validatedFields}" @click="createAccount" >S'inscrire</button>
      </div>
      

    </form>
    <div class="auth__nav">
        <p v-if="mode=='login'">Vous n'avez pas encore de compte ? <span class="auth__nav__switch" @click="switchToCreateAccount">Inscrivez vous</span></p>
        <p v-else >Vous avez déjà un compte ? <span class="auth__nav__switch" @click="switchToLogin">Connectez vous</span></p>
        

    </div>
  
  </div>
</template>

<script>

const axios = require('axios');

export default {
  name: 'authentification',
  data: function (){
    return {
      mode :"login",
      nom:"",
      prenom:"",
      email:"",
      password:"",
      
    }
  },
  methods:{
    switchToCreateAccount : function (){
      this.mode = "createAccount"
    },
    switchToLogin : function (){
      this.mode = "login"
    },
    createAccount : function(e){
      e.preventDefault();
      
      const user = {user_nom:this.nom,user_prenom:this.prenom,user_email: this.email,user_password:this.password}
      console.log(user);
      axios.post('http://localhost:3000/api/auth/signup', user)
        .then(function (response) {console.log(response);})
        .catch(function (error) {console.log(error);});
      
    
    }
  },
  computed : {
    validatedFields : function(){
      if (this.mode =='createAccount'){
        if (this.nom !="" && this.prenom !="" &&this.email !="" &&this.password !="" ){return true}
        else {return false}
      }
      else {
        if (this.email !="" &&this.password !="") {return true}
        else return false
      }

    }
  },
  components: {
 
  }
}
</script>

<style  lang="scss" scoped>

.auth{
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &__img{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  &__h1{
    font-size: 6rem;
    padding: 1rem;
    color: #FD2D01;
  }
  &__h3{
    font-size: 3rem;
    color: rgb(66, 61, 61);
    margin-top: 2rem;
  }
  &__nav{
    font-size: 2rem;
    margin-top : 2rem;
    &__switch {
      color:#FD2D01 ;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &__form{
    // border: #FFD7D7 solid 1px;
    max-width: 100rem;
    margin-top: 3rem;
    padding: 2rem 4rem;
    font-size: 2.5rem;
    border-radius: 1rem;
    box-shadow: 2px 2px 8px 3px #FFD7D7;
    color: rgb(66, 61, 61);
    &--login{
    margin-top: 6rem ;
    }

    div{
      display: flex;
      justify-content: center;
      margin-top: 3rem;
      
    }
   
    input{
      // color: rgb(66, 61, 61);
      color: rgb(66, 61, 61);
      font-weight: bold;
      background-color:white;
      border: solid 2px #FFD7D7 ;
      border-radius: 0.5rem;
      padding: 1rem 6rem;
   
      &:focus{
        outline: groove 2px #FD2D01;
      }
      &::placeholder{
        color: rgb(66, 61, 61);
        font-weight:bold;
      }
    }
    &__button{
      justify-content: center !important;
      &--login{
        margin-bottom: 2rem ;
      }
      &--disabled{
        background-color: rgb(168, 161, 161) !important;
        cursor: not-allowed !important;
        border: #FFD7D7 solid 1px !important;
        color:#FFD7D7 !important ;
      }
     
      button{   
        font-size: 2.5rem ;
        margin-top: 1rem;
        padding: 1rem 7rem;
        border-radius: 1rem;
        color: rgb(66, 61, 61);
        border: #FD2D01 solid 1px;
        background-color:#FFD7D7 ;
        box-shadow: 2px 2px 4px #999;
        cursor: pointer;
        &:focus{
          outline: groove 2px #FD2D01;
        }

      }
    }
  
  }

}



</style>