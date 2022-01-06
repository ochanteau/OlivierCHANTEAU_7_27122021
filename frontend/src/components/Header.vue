<template>
  <header>
    <div class="header">
        <img class="header__img" height="80" width="80  "    src="../assets/images/icon.svg" alt="logo groupomania">
        <h1 class="header__h1">Groupomania</h1>
    </div>
   
            
    <div class="navigation">
        <div class="dropDown" @click="openNav">
          <img class="dropDown__img" height="40" width="40" src="../assets/images/profil.png" alt="">
          <button class="dropDown__button">Olivier</button>
        </div>
        <nav class="nav" v-if="isOpen">
            <router-link to="/home" class="nav__home">Accueil</router-link> 
            <router-link to="/profil" class="nav__profil">Votre profil</router-link>
            <button class="nav__button">Déconnexion</button>
        </nav>
        
    </div>
  </header>

</template>

<script>
export default {
  name: 'Header',
  data: function(){
    return {
      isOpen:false
    }
  },
  methods:{
    openNav : function(){this.isOpen = !this.isOpen}
  },
  props: {
    msg: String
  }
}
</script>


<style lang="scss" scoped>

// responsive
@mixin S {
    @media (max-width: 500px) {
      @content;
    }
  }
  
@mixin M {
    @media (max-width: 950px) {
      @content;
    }
  }
  

  header{
    
    height: 80px;
    // border-bottom: solid 1px $primary;
    box-shadow: $box-shadow $primary;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
    grid-template-areas:" . header navigation";
    @include M{
    display: flex;
    justify-content: space-between;
    }
    @include S{
      justify-content: space-around;
      
    }
    // @include S{
    // // display: flex;
    // // flex-direction: column;
    // // align-items: center;
    // // height: 130px;
    // // padding-bottom: 1rem;
    // }
  }

  .header{
    grid-area: header;
    display: flex;
    align-items: center;
    &__h1{
      color: $secondary;
      @include S{
      display: none;
      
    }
    }
  }

  .navigation{
    // padding: 0rem 2rem;
    justify-content: center;
    grid-area: navigation;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .dropDown{
      display: flex;
      
      
      &__img{
        border-radius: 50%;
       
        cursor: pointer;
        
      
        // margin: 1rem;
      }
      &__button{
        border:none;
        font-weight: bold;
        font-size:2rem;
        color: $secondary;
        background: none ;
        cursor: pointer;
        padding: 0 3rem 0 1rem;
      }
    }
    
      
      
      


      .nav{
        margin-top: 1rem;
        background-color: $primary;
        position: absolute ;
        top: 6rem;
        font-size:2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1rem;
        border-radius: 10%;
        &__button{
          background: none;
          border:none;
          font-size:2rem;
          padding: 0.5rem 0;
          cursor: pointer;
        }
        &__home{
          padding: 0.5rem 0;
        }
        &_profil{
          padding: 0.5rem 0;
        }


      }
    
  
  }
</style>
