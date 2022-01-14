<template>
 
    

      <!-- affichage du corps du post -->
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
            <i @click="openUpdatePost" class="fas fa-ellipsis-h"></i>
            <div class="update__nav" v-if="isOpenPost">
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

        <!-- like et affichage du nb de like ainsi que du nombre de commentaires -->
        <div class="numberContainer">
          <div class="like" :class="{likeCheck:like}">
            <span class="like__number">5</span> 
            <i  class="fas fa-thumbs-up like__i"></i>
          </div>
          <div class=" toggle">
            <span class=" toggle__number">6</span>
            <span class=" toggle__comment">Commentaires</span>
          </div>
        </div>
        <div class="separation"></div>
        
          
        <!--partie relative aux commentaires  -->
        <div class="commentSection">
          <!-- liste des commentaires -->
          <div class="commentsList">
              <comment></comment>
              <comment></comment>
              <!-- <div class="comment">
                <div class="user user--center">
                  <img  class="user__profilPicture " height="50" width="50" :src="this.currentUser.user_picture" alt="Image de profil ">
                  <div  class="user__infos user__infos--comment">
                        <p  class="user__fullName">Prénom Nom</p>
                        <p  class="user__comment" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti unde ut nihil quas odio fuga iure amet. Consequuntur, quisquam quas.</p>
                  </div>
                  <div class="update">
                      <i @click="openUpdateComment" class="fas fa-ellipsis-h"></i>
                      <div class="update__nav" v-if="isOpenComment">
                        <p class="update__update"><i class="far fa-edit"></i>Modifier</p>
                        <p class="update__delete"><i class="far fa-trash-alt"></i>Supprimer</p>
                      </div>
                 </div>
                </div>
                <p class="user__date user__date--comment">le 14/01/2022</p>
              </div> -->

              <!-- <div class="comment">
                <div class="user user--center">
                  <img  class="user__profilPicture " height="50" width="50" :src="this.currentUser.user_picture" alt="Image de profil ">
                  <div  class="user__infos user__infos--comment">
                        <p  class="user__fullName">Prénom Nom</p>
                        <p  class="user__comment" >Lorem ipsum </p>
                  </div>
                  <div class="update">
                      <i @click="openUpdateComment" class="fas fa-ellipsis-h"></i>
                      <div class="update__nav" v-if="isOpenComment">
                        <p class="update__update"><i class="far fa-edit"></i>Modifier</p>
                        <p class="update__delete"><i class="far fa-trash-alt"></i>Supprimer</p>
                      </div>
                 </div>
                </div>
                <p class="user__date user__date--comment">le 14/01/2022</p>
              </div> -->
          </div>  
          <!-- ajouter un commentaire -->
          <form>
            <div class="user user--center">
              <img  class="user__profilPicture " height="50" width="50" :src="this.currentUser.user_picture" alt="Image de profil ">
              <div  class="user__infos user__infos--comment">
                  <p  class="user__fullName">Prénom Nom</p>
                  <textarea aria-label="texte du commentaire" maxlength="100" class="user__comment" placeholder="Votre commentaire ?"  cols="30" rows="2"></textarea>
              </div>
            </div>
          </form>  
        </div>
        
      </div> 
      
      

 
</template>


<script>
import { mapState } from 'vuex';
import comment from '../components/comment.vue'

export default {
    name:'UpdatePost',
    components : {comment} ,
    data: function(){
        return {
          previewPicture : null,
          isOpenPost:false,
          isOpenComment:false,
          like:false
        }
    },
    created(){
      console.log("created home")
    },
    computed:{
      ...mapState(['currentUser'])
    },
    methods:{
      openUpdatePost : function(){this.isOpenPost = !this.isOpenPost},
      openUpdateComment : function(){this.isOpenComment = !this.isOpenComment}
      // ...mapActions(['fetchCurrentUser'])
    }
    
}
</script>

<style lang="scss" scoped>

.post{
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem 1rem 3rem;
    box-shadow: $box-shadow $border;
    &__container{
      display: flex;
      justify-content: space-between;
      
    }
}

.user{
  display: flex;
  &--center{
      align-items: center;
    }
  &__profilPicture{
    border-radius: 50%;
    
  }
  &__infos{
    margin-left: 1rem;
    display: flex;
    
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem;
    &--comment{
      width: 85%;
      // height: ;
    }

  }
  &__fullName{
    font-weight: bold;
    padding: 0.5rem 0rem;
  }
  &__comment{
      width: 100%;
      // margin-left: 1.5rem;
      // border-radius: 2rem;
      background-color: $textarea  ;
      border: none;
      outline: none;
      padding: 1rem ;
      resize: none;
      border-radius: 1rem;
  }
  &__date{
    font-size: 1.4rem;
    // &--comment{
    //   font-size: 1.3rem;
    //   font-style: italic;
    //   margin-left: 7rem;
    // }
  }
}

.update{
  display: flex;
  flex-direction: column;
  position: relative;
  &__nav{
    position: absolute;
    left: -23rem;
    top: 2rem;
    box-shadow: $box-shadow $border;
    // background-color: $border;
    background-color: $primary;
    padding: 1rem;
    line-height: 3rem;
    p{
      cursor: pointer;
    }
    i{
      margin-right: 0.3rem;
    }
  }

}

.postText{
  margin: 1rem 0rem 0.5rem 0rem;

}

.postPicture{
    margin: 1rem 0rem;
    display: flex;
    justify-content: center;
    
}

.separation{
  height: 1px;
  background-color: $border;
  text-align: center;
  
  
}

.numberContainer{
  display: flex;
 
}

.like{
  flex-grow: 1;
  text-align: center;
  
  padding: 1rem 0rem;
  &Check{
    
    color: $secondary;
  }
  &__number{
    margin-right: 1rem;
  }
  &__i{
    cursor: pointer;
  }
}
.toggle{
  flex-grow: 1;
  text-align: center;
  padding: 1rem 0rem;
  
  &__number{
    margin-right: 0.5rem;
  }
  &__comment{
    text-decoration: underline;
    cursor: pointer;
  }
}


.comment{
  margin: 1rem 0rem;
}

</style>