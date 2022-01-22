<template>
  <header>
    <!-- logo du groupe -->
    <div class="header">
        <img class="header__img" height="80" width="80  "    src="../assets/images/icon.svg" alt="logo groupomania">
        <h1 class="header__h1">Groupomania</h1>
    </div>
   
   <!-- navigation  -->
    <div class="navigation">
        <!-- ouverture de la navigation -->
        <div class="dropDown" @click="openNav">
          <img class="dropDown__img" height="40" width="40" :src="this.currentUser.user_picture" alt="Image de profil ">
          <button class="dropDown__button">{{this.firstName}}</button>
        </div>
        <!-- liens vers les autres vues et logout -->
        <nav class="nav" v-if="isOpen">
            <router-link to="/home" class="nav__home">Accueil</router-link> 
            <router-link to="/profil" class="nav__profil">Votre profil</router-link>
            <button @click="logout" class="nav__button">Déconnexion</button>
        </nav>
        
    </div>
  </header>

</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';


export default {
  name: 'Header',
  data: function(){
    return {
      isOpen:false
    }
  },
  computed:{
    ...mapState(['currentUser']),...mapGetters(['firstName'])
  },
  methods:{
    openNav : function(){this.isOpen = !this.isOpen},
    ...mapMutations(['logout'])
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
  
// container
  header{
    background-color: white;
    height: 80px;
    box-shadow: $box-shadow $border;
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
   
  }
// logo du groupe
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
// navigation
  .navigation{
   
    justify-content: center;
    grid-area: navigation;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    // ouverture de la navigation
    .dropDown{
      display: flex;
      border-radius: 1rem;
      background-color: $primary;
      padding: 0.5rem 0rem 0.5rem 1rem;
      margin-right: 1rem;
       box-shadow: $box-shadow $border;
      &__img{
        border-radius: 50%;
        cursor: pointer;    
      }
      &__button{
        border:none;
        font-weight: bold;
        font-size:2rem;
        background: none ;
        cursor: pointer;
        padding: 0 3rem 0 1rem;
      }
    }
   

    // liens vers les autres vues et logout
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
         box-shadow: $box-shadow $border;
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
