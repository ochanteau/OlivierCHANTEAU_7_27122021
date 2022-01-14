<template>
 
    


      <div  class="post" >
        <div class=" post__container">
          <div class="user">
              <img  class="user__profilPicture" height="50" width="50" :src="this.currentUser.user_picture" alt="Image de profil ">
              <div  class="user__infos">
                <p  class="user__fullName">Prénom Nom</p>
                <p class="user__date">le 14/01/2022</p>
              </div>
          </div>
          <div class="update">
            <i @click="openNav" class="fas fa-ellipsis-h"></i>
            <div class="update__nav" v-if="isOpen">
              <p class="update__update"><i class="far fa-edit"></i>Modifier votre publication</p>
              <p class="update__delete"><i class="far fa-trash-alt"></i> Supprimer votre publication</p>
            </div>
          </div>
        </div>
        <div class="postText">
            <p class="postText__p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices vel nulla nec semper. Aenean volutpat erat turpis, a mattis ex laoreet malesuada. Donec commodo lectus eu dictum porttitor. In dui.</p>
        </div>  
        <div class="postPicture">
          <img class="postPicture__img" height="300" width="500" :src="this.currentUser.user_picture">
        </div>
        <div class="separation"></div>
        
      </div> 
      
      

 
</template>


<script>
import { mapState } from 'vuex';

export default {
    name:'UpdatePost',
    // components : {Header} ,
    data: function(){
        return {
          previewPicture : null,
          isOpen:true,
        }
    },
    created(){
      console.log("created home")
    },
    computed:{
      ...mapState(['currentUser'])
    },
    methods:{
      openNav : function(){this.isOpen = !this.isOpen}
      // ...mapActions(['fetchCurrentUser'])
    }
    
}
</script>

<style lang="scss" scoped>







.post{
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem;
    box-shadow: $box-shadow $border;
    &__container{
      display: flex;
      justify-content: space-between;
      
    }
  
}

.user{
  display: flex;
  &__profilPicture{
    border-radius: 50%;
  }
  &__infos{
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem;

  }
  &__fullName{
    font-weight: bold;
  }
  
}

.update{
  // color: grey;
  display: flex;
  flex-direction: column;
  position: relative;
  &__nav{
    position: absolute;
    left: -23rem;
    top: 2rem;
    box-shadow: $box-shadow $border;
    background-color: $border;
    padding: 1rem;
    line-height: 3rem;
    p{
      cursor: pointer;
    }
    
    i{
      margin-right: 0.3rem;
    }
  }
  // &__update{
  //   line-height: 2rem;
  //   i{
  //     margin-right: 0.2rem;
  //   }
  // }
}

.postText{
  margin: 1rem 0rem 0.5rem 0rem;

}

.postPicture{
    margin: 1rem 0rem;
    display: flex;
   
    justify-content: center;
    // &__img{
      
    // }
  }

  


.separation{
  height: 1px;
  background-color: $border;
  // width: 32rem;
  text-align: center;
  margin: 1rem 0rem;
  
}

</style>