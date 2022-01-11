<template>
  <div  role ="main" class="auth">
    <div role="header" class="auth__header">
    <img height="100" width="100"    src="../assets/images/icon.svg" alt="logo groupomania">
    <h1 class="auth__h1">Groupomania</h1>
    </div>
    <h2 class="auth__h2">Bienvenue sur le réseau social de votre entreprise !</h2>

    <!-- signin and signup form-->
    <form role="form" class="form" :class="{ 'form--login': mode=='login' }">
      <!-- input Nom -->
      <div class="form__fields" v-if="mode=='createAccount'">
        <input aria-label="nom" class="form__input" v-model="nom" type="text" id="nom" name="user_nom" placeholder="Votre nom :"  >
      </div>
      <!-- input Prenom-->
      <div class="form__fields" v-if="mode=='createAccount'">
        <input aria-label="prénom" class="form__input" v-model="prenom" type="text" id="prénom" name="user_prénom" placeholder="Votre prénom :" >
      </div>
      <!-- input Email-->
      <div class="form__fields">
        <input aria-label="mail" class="form__input" @input="validatedEmail" v-model="email" type="email" id="mail" name="user_email" placeholder="Votre e-mail :" >
      </div>
      <!-- input Password-->
      <div class="form__fields">
        <input aria-label="password" class="form__input" @input="validatedPassword" v-model="password" type="password" id="password" name="user_password" placeholder="Votre mot de passe :" >
      </div>
      <!-- signin and signup button -->
      <div class="form__fields">
        <button v-if="mode=='login'" class="form__button  form__button--login" :class="{'form__button--disabled' : !validatedFields}"  type="submit" @click.prevent="login">Se connecter</button>
        <button v-else class="form__button " :class="{'form__button--disabled' : !validatedFields}" @click.prevent="createAccount" >S'inscrire</button>
      </div>
      <!-- error displays -->
      <div class=" form__fields form__fields--error">
        <p v-if="loginError&&mode=='login'">Adresse email et/ou mot de passe incorrect.</p>
        <p v-if="!validatedNames&&mode=='createAccount'">Votre nom et prénom ne doivent pas contenir de caracteres spéciaux.</p>
        <p v-if="errorEmail&&mode=='createAccount'">Merci de renseigner une adresse email valide.</p>
        <div class="form__fields--errorPassword" v-if="errorPassword&&mode=='createAccount'">
          <p>Votre mot de passe doit contenir :</p>
          <p><em>huit caracteres minimum,</em></p>
          <p><em>une minuscule, une majuscule et un chiffre.</em></p>
          <p><em>Il ne doit pas contenir d'espace.</em></p>
        </div>
        <ul v-if="createAccountError.length&&mode=='createAccount'">
          <li v-for=" (error,index) in createAccountError" :key="index">{{error}}</li>
        </ul>
      </div>
    </form>
    <!-- signin/signup navigation -->
    <div role="navigation" class="auth__nav">
        <p v-if="mode=='login'">Vous n'avez pas encore de compte ? <span tabindex="0" aria-label="naviguer vers la page d'inscription'" class="auth__nav__switch" @click="switchToCreateAccount">Inscrivez vous</span></p>
        <p v-else >Vous avez déjà un compte ? <span tabindex="0" aria-label="naviguer vers la page de connexion" class="auth__nav__switch" @click="switchToLogin">Connectez vous</span></p>
    </div>
  
  </div>
</template>

<script>

// import axios pour requete API 
const axios = require('axios');
// ajout d'une URL de base aux requetes
const instance = axios.create({baseURL: 'http://localhost:3000/api/auth'});

export default {
  name: 'authentification',
  data: function (){
    return {
      // mode login ou createAccount
      mode :"login",
      // champs du formualire
      nom:"",
      prenom:"",
      email:"",
      password:"",
      // erreurs
      loginError:false,
      createAccountError:[],
      errorEmail :null,
      errorPassword :null
      
    }
  },
  
  methods:{
    // focntion pour naviguer entre signup et signin
    switchToCreateAccount : function (){
      this.mode = "createAccount"
    },
    switchToLogin : function (){
      this.mode = "login"
    },
    // fonction d'enregistrement de l'utilisateur
    createAccount : function(){
      // on vide le tableau d 'erreur
      this.createAccountError =[];
      // si l'ensemble des champs est rempli correctement
      if (this.validatedFields){
      // reference a l'instance
      const self =this;
      // creation objet avec les données du formualaire
      const user = {user_nom:this.nom,user_prenom:this.prenom,user_email: this.email,user_password:this.password};
      // requete post API avec envoi des données du formulaire
      instance.post('/signup', user)
        // si OK, appel de la fonction Login
        .then(function () {self.login();})
        // si erreur, affichage des erreurs
        .catch(function (error) {
          console.log(error.response);
          console.log(error.response.data)
          console.log(error.message);
          
          if (error.response.data.err.code =="ER_DUP_ENTRY") { self.createAccountError.push("L'adresse email a déja été utilisé pour créer un compte")}
          else{self.createAccountError.push(error.response.data.message)}
        });
      }
     
    },
    // fonction de connection de l utilisateur
    login : async function(){
      // creation objet avec les données du formualaire
      const user = {user_email: this.email,user_password:this.password}
      try{
          // requete POST api avec les donneés du formulaire
          const response = await instance.post('/login',user);
          console.log("response.data////////");
          console.log(response.data);
          // appel de la mutation Log user du store
          this.$store.commit("logUser", response.data);
          // envoie de l'utilisateur sur la vue Home
          this.$router.push('/profil');
      }
      catch (error){
        // affichage de l'erreur de login
        this.loginError=true;
        console.log(error)
      }
    },
    // fonction  pour verifier la conformaité de l'adresse email
    validatedEmail  () {
     const regexp =/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      if (regexp.test(this.email)) {this.errorEmail =false}
      else {this.errorEmail =true} 
    },
    //fonction pour verifier validité du MDP
    validatedPassword  () {
    // regexp pour 8 caracteres, un nombre, une minuscule, une majuscule
     const regexp =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    //  regexp pour verifier la presence d'espace
     const regexp2=/\s/;
     if (regexp.test(this.password) && !regexp2.test(this.password)){ this.errorPassword= false}
     else {this.errorPassword= true}
     
    }
    
  },
  computed : {
    // fonction pour verifier que tous les champs sont bien remplis
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
    // verification de l'absence de caracteres speciaux
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

// responsive
@mixin S {
    @media (max-width: 430px) {
      @content;
    }
  }
  
@mixin M {
    @media (max-width: 700px) {
      @content;
    }
  }
  



// mise en forme de la page d'authentification
.auth{
  display: flex;
  flex-direction: column;
  align-items: center;
  // en tete de la page
  &__header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    @include M {
      flex-direction: column;
    }
  }
  &__h1{
    font-size: 6rem;
    padding: 1rem;
    color: $secondary;
    @include S{
    font-size: 4rem;
    }
  }
  &__h2{
    font-size: 3rem;
    color: rgb(66, 61, 61);
    margin-top: 2rem;
    text-align: center;
     @include S{
    font-size: 2rem;
    }
  }
  // navigation entre signin et signup
  &__nav{
    font-size: 2rem;
    margin-top : 2rem;
    text-align: center;
    &__switch {
      color:red;
      text-decoration: underline;
      font-weight: bold;
      cursor: pointer;
       @include S{
         display: block;
    }
    }
    
  }

}


// formulaire
.form{
  margin-top: 3rem;
  padding: 2rem 4rem;
  font-size: 2.5rem;
  border-radius: 1rem;
  box-shadow: $box-shadow $primary;
  color: rgb(66, 61, 61);
  @include S{
    padding: 1.5rem;
  }

  &--login{
    margin-top: 6rem ;
  }

  &__fields{
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    &--error{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 1.5rem ;
    color: blue;
    }
    &--errorPassword{
      
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  
  &__input{
    color: rgb(66, 61, 61);
    font-weight: bold;
    background-color:white;
    border: solid 2px $primary ;
    border-radius: 0.5rem;
    padding: 1rem 6rem;
    @include S{
    padding: 1rem;
    }
   
      &:focus{
        outline: groove 2px secondary;
      }
      &::placeholder{
        color: rgb(66, 61, 61);
        font-weight:bold;
      }
  }

  &__button{
    font-size: 2.5rem ;
    margin-top: 1rem;
    padding: 1rem 7rem;
    border-radius: 1rem;
    color: rgb(66, 61, 61);
    border: $secondary solid 1px;
    background-color: $primary;
    box-shadow: 2px 2px 4px #999;
    cursor: pointer;
      &:focus{
          outline: groove 2px $secondary;
      }
      &--login{
        margin-bottom: 2rem ;
      }
      &--disabled{
        background-color: $button-disabled  ;
        cursor: not-allowed ;
        border: $primary solid 1px ;
        color:white  ;
      }
  }
  
}

</style>