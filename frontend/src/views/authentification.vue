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
        <input v-model="nom" type="text" id="nom" name="user_nom" placeholder="Votre nom :"  >
      </div>
      <div v-if="mode=='createAccount'">
        <label for="prénom"></label>
        <input v-model="prenom" type="text" id="prénom" name="user_prénom" placeholder="Votre prénom :" >
      </div>
      <div>
        <label for="mail"></label>
        <input @input="validatedEmail" v-model="email" type="email" id="mail" name="user_email" placeholder="Votre e-mail :" >
      </div>
      <div>
        <label for="password"></label>
        <input  @input="validatedPassword" v-model="password" type="text" id="password" name="user_password" placeholder="Votre mot de passe :" >
      </div>
      <div class="auth__form__button">
        <button v-if="mode=='login'" class="auth__form__button--login" :class="{'auth__form__button--disabled' : !validatedFields}"  type="submit" @click.prevent="login">Se connecter</button>
        <button v-else :class="{'auth__form__button--disabled' : !validatedFields}" @click.prevent="createAccount" >S'inscrire</button>
      </div>
      <div class="auth__form__error">
        <p v-if="loginError&&mode=='login'">Adresse email et/ou mot de passe incorrect.</p>
        <p v-if="!validatedNames&&mode=='createAccount'">Votre Nom et Prénom ne doivent pas contenir de caracteres spéciaux.</p>
        <p v-if="errorEmail&&mode=='createAccount'">Merci de renseigner une adresse mail valide.</p>
        <p v-if="errorPassword&&mode=='createAccount'">Votre mot de passe doit contenir au minimum huit caracteres dont :<br>
        une minuscule, une majuscule et un chiffre. <br>
        Il ne doit pas contenir d'espace.
        </p>


        
        <ul v-if="createAccountError.length">
          <li v-for="error in createAccountError" :key="error">{{error}}</li>
        </ul>
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
const instance = axios.create({baseURL: 'http://localhost:3000/api/auth'});

export default {
  name: 'authentification',
  data: function (){
    return {
      mode :"login",
      nom:"",
      prenom:"",
      email:"",
      password:"",
      loginError:false,
      createAccountError:[],
      errorEmail :null,
      errorPassword :null
      
    }
  },
  
  methods:{
    switchToCreateAccount : function (){
      this.mode = "createAccount"
    },
    switchToLogin : function (){
      this.mode = "login"
    },
    createAccount : function(){
      if (this.validatedFields){
      const self =this;
      const user = {user_nom:this.nom,user_prenom:this.prenom,user_email: this.email,user_password:this.password};
      instance.post('/signup', user)
        .then(function () {self.login();})
        .catch(function (error) {
          console.log(error);
          if (error =="Error: Request failed with status code 400") {console.log("ok")}
          else{console.log("ko")}
        });
      }
      // const self =this;
      // const user = {user_nom:this.nom,user_prenom:this.prenom,user_email: this.email,user_password:this.password};
      // instance.post('/signup', user)
      //   .then(function () {self.login();})
      //   .catch(function (error) {
      //     console.log(error);
      //     if (error =="Error: Request failed with status code 400") {console.log("ok")}
      //     else{console.log("ko")}
      //   });
    },
    login : async function(){
      
      const user = {user_email: this.email,user_password:this.password}
      try{
          const response = await instance.post('/login',user);
          console.log("response.data////////");
          console.log(response.data);
          this.$store.commit("logUser", response.data);
          this.$router.push('/about');

      }
      catch (error){
        this.loginError=true;
        console.log(error)
      }
    },
    validatedEmail  () {
     const regexp =/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      if (regexp.test(this.email)) {
        this.errorEmail =false
      }
      else {this.errorEmail =true} 
    },
    validatedPassword  () {
     const regexp =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
     const regexp2=/\s/;
     if (regexp.test(this.password) && !regexp2.test(this.password)){ this.errorPassword= false}
     else {this.errorPassword= true}
     
    }
    
  },
  computed : {
    validatedFields : function(){
      if (this.mode =='createAccount'){
        if ( this.nom !="" && this.prenom !="" && this.validatedNames && this.errorEmail==false && this.errorPassword==false  ){return true}
        else {return false}
      }
      else {
        if (this.email !="" &&this.password !="") {return true}
        else return false
      }

    },
    validatedNames  () {
     const regexp = /[^a-zA-Z0-9 _-]/;
      if (regexp.test(this.nom)  ||  regexp.test(this.prenom)) {
        return false
      }
      else {return true} 
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
    &__error{
      display: flex;
      flex-direction: column;
      font-size: 1.5rem !important;
      color: red !important;
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