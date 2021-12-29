<template>
  <div class="home">
    <div class="home__img">
    <img height="100" width="100"    src="../assets/icon.svg" alt="logo groupomania">
    <h1 class="home__h1">Groupomania</h1>
    </div>
    <h3 class="home__h3">Bienvenue sur le réseau social de votre entreprise !</h3>

    <form class="home__form">
       <div>
        <label for="nom"></label>
        <input type="text" id="nom" name="user_nom" placeholder="Votre nom :">
      </div>
      <div>
        <label for="prénom"></label>
        <input type="text" id="prénom" name="user_prénom" placeholder="Votre prénom :" >
      </div>
      <div>
        <label for="mail"></label>
        <input type="email" id="mail" name="user_email" placeholder="Votre e-mail :">
      </div>
      <div>
        <label for="password"></label>
        <input type="text" id="password" name="user_password" placeholder="Votre mot de passe :">
      </div>
      <div class="home__form__button">
        <button type="submit">S'inscrire</button>
      </div>
      

    </form>
    <div class="home__nav">
        <p>Vous avez déjà un compte ? Connectez vous</p>
    </div>
  
  </div>
</template>

<script>



export default {
  name: 'Home',
  components: {
 
  }
}
</script>

<style  lang="scss" scoped>

.home{
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
    margin-top : 2rem
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
     
      button{   
        font-size: 2.5rem ;
        margin-top: 1rem;
        padding: 1rem 7rem;
        border-radius: 1rem;
        color: rgb(66, 61, 61);
        border: #FD2D01 solid 1px;
        background-color:#FFD7D7 ;
        box-shadow: 2px 2px 4px #999;
        &:focus{
          outline: groove 2px #FD2D01;
        }
      }
    }
  
  }

}



</style>