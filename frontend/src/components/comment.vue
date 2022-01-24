<template>
    
    <div class="comment">
      <!-- container  -->
        <div class="user user--comment">
            <!-- bloc avec les infos du commentaire -->
            <img  class="user__profilPicture " height="50" width="50" :src="this.comment.user_picture" alt="Image de profil ">
            <div  class="user__infos ">
                <p  class="user__fullName">{{capitalize}}</p>
                <p v-if="!updateIsOpen"  class="user__comment" >{{this.comment.comment_text}} </p>
                <textarea v-if="updateIsOpen"  v-model="newComment" aria-label="texte du commentaire" maxlength="150" class="user__comment" placeholder="Votre commentaire ?"  cols="30" rows="2"></textarea>
                <i v-if="updateIsOpen" @click="fetchUpdateComment" class="fas fa-chevron-circle-right user__newComment"></i>
            </div>
            <!-- bloc update du commentaire -->
            <div v-if="this.user_id==comment.user_id||this.currentUser.droits_id==2" class="update ">
                <i tabindex="0" role="button" aria-label="ouvrir le menu de modification de la publication" @click="openUpdateComment" class="fas fa-ellipsis-h update__i"></i>
                <div class="update__nav" v-if="openUpdate">
                    <p @click="switchUpdateIsOpen" v-if="this.user_id==comment.user_id" class="update__update"><i class="far fa-edit"></i>Modifier</p>
                    <p @click=" fetchDeletePost" class="update__delete"><i class="far fa-trash-alt"></i>Supprimer</p>
                </div>
            </div>
        </div>
        <!-- erreur -->
        <p class="error" v-if="this.textValidation">Le texte ne doit pas contenir de caracteres speciaux</p>
        <!-- date du commentaire -->
        <p class="user__date ">{{fromNow}}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';

// import librairie axios
const axios = require('axios');
// ajout d'une URL de base aux requetes
const instance = axios.create({baseURL: 'http://localhost:3000/api'});



export default {
   name:'comment',
    data: function(){
        return {
          // texte du commenaire Maj
          newComment:this.comment.comment_text,
          // variable d'ouverture de la modification du commentaire 
          updateIsOpen:false,
          // variable d'ouverture du menu de modification du commentaire
          openUpdate:false,
         
        }
    },
    props:['comment','index','capitalize','fromNow','deleteComment','updateComment'],
    computed:{
      // validation du texte du commentaire
      textValidation  () {
      const regexp = /[$^*<>``]/;
        if (regexp.test(this.newComment)) { return true}
        else {return false} 
    },
      ...mapState(['currentUser','user_id'])
    },
    methods:{
      // passage au mode modification du commentaire
      switchUpdateIsOpen(){
        this.updateIsOpen=!this.updateIsOpen;
        this.openUpdate =false;
      },
      // ouverture du menu de modification du commentaire
      openUpdateComment : function(){this.openUpdate = !this.openUpdate},
      // suppression du post , maj serveur et component 
      fetchDeletePost(){
        // recuperation de l id du commentaire 
        const comment_id = this.comment.comment_id
        // recuperation de l index du commentaire dans la liste du component
        const comment_index =this.index;
        const self= this;
        // requete de suppression au serveur 
        instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
        instance.delete(`/comment/${comment_id}`)
           .then(function(){
              // MAJ des datas du component
              self.deleteComment(comment_index); 
              self.openUpdate= false;                    
              })
            .catch(function(err){
              console.log(err)
              console.log(err.response.data)
              })                 
      },
      // requet de MAJ du commentaire en BDD et maj des datas du component
      async fetchUpdateComment(){
        if (this.textValidation||!this.newComment||this.newComment==" ") {return null}
        else {
            instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
            const text = this.newComment
            const index =this.index
            const self= this;
            const comment_id = this.comment.comment_id
            // Maj de la BDD
            instance.put(`/comment/${comment_id}`,{text})
                  .then(function(res){
                      // maj du component 
                      self.updateComment(index,res.data);
                      self.updateIsOpen=false;
                      self.openUpdate=false;
                              
                  })
                  .catch(function(err){
                    console.log(err)
                    console.log(err.response.data)
                  })
        }
      },
    }  
}

</script>

<style lang="scss" scoped>



.user{
  display: flex;
  align-items: center;
  position: relative;
  // bloc avec les infos du commentaire
  &__profilPicture{
    border-radius: 50%;
  }
  &__infos{
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem;
    width: 85%;
  }

  &__fullName{
    font-weight: bold;
    padding: 0.5rem 0rem;
  }
  &__comment{
      width: 100%;
      background-color: $textarea  ;
      border: none;
      outline: none;
      padding: 1rem ;
      resize: none;
      border-radius: 1rem;
      word-wrap: break-word;
      
  }
  &__date{
    font-size: 1.4rem;
    font-size: 1.3rem;
    font-style: italic;
     margin-left: 7rem;
   
  }
  &__newComment{
    position: absolute;
    bottom: 20px;
    right:-10px;
  }
}

//  bloc update du commentaire
.update{
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 3rem;
  &__nav{
    position: absolute;
    left: -10rem;
    top: 2rem;
    box-shadow: $box-shadow $border;
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

.error{
  text-align: center;
  color: red;

}
</style>