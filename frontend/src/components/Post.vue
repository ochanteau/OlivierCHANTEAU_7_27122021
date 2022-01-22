<template>
 
<div>
      <!-- component de mise à jour du post -->
      <update-post v-if="this.update"
        :post="post"
        :index="index" 
        :updatePost="updatePost" 
        :openUpdatePost="openUpdatePost">
      </update-post>
      <!-- affichage du post -->
      <div  class="post" >
        <div class=" post__container">
          <!-- partie avec les données du createur du post -->
          <div class="user">
              <img  class="user__profilPicture" height="50" width="50" :src="post.user_picture" alt="Image de profil ">
              <div  class="user__infos">
                <p  class="user__fullName">{{capitalize(post.user_prenom,post.user_nom)}} {{index}}</p>
                <p class="user__date">Le {{date(post.post_date)}} </p>
              </div>
          </div>
          <!-- partie pour initier la MAJ ou la suppression du post -->
          <div v-if="this.user_id==post.user_id||this.currentUser.droits_id==2" class="update">
            <i @click="openUpdatePost" class="fas fa-ellipsis-h"></i>
            <div class="update__nav" v-if="isOpenPost">
              <p @click="updatePost" v-if="this.user_id==post.user_id" class="update__update"><i class="far fa-edit"></i>Modifier la publication</p>
              <p @click="fetchDeletePost" class="update__delete"><i class="far fa-trash-alt"></i> Supprimer la publication</p>
            </div>
          </div>
        </div>
        <!-- partie avec le text du post -->
        <div class="postText">
            <p class="postText__p">{{post.post_text}}</p>
        </div>  
        <!-- partie avec la photo du post -->
        <div class="postPicture">
          <img class="postPicture__img" height="300" width="500" :src="post.post_picture">
        </div>

        <div class="separation"></div>

        <!-- like et affichage du nb de like ainsi que du nombre de commentaires -->
        <div class="numberContainer">
          <div  class="like" :class="{'like--check' : (this.checklike >=0) }">
            <span v-if="this.likeNumber>0" class="like__number">{{this.likeNumber}}</span> 
            <i  @click="this.toggleLike"  class="fas fa-thumbs-up like__i"></i>
          </div>
          <div class=" toggle">
            <span v-if="this.CommentNumber>0" class=" toggle__number">{{this.CommentNumber}}</span>
            <span @click="switchOpenCommentSection" class=" toggle__comment">Commentaires</span>
          </div>
        </div>
        <div class="separation"></div>
        
         
        <!--partie relative aux commentaires  -->
        <div v-if="openCommentSection" class="commentSection">
          <!-- liste des commentaires -->
          <div class="commentsList">
              <comment
              v-for="(item,index) in this.commentList"
              :key="item.comment_id"
              :comment="item"
              :index="index"
              :capitalize="capitalize(item.user_prenom,item.user_nom)"
              :fromNow="fromNow(item.comment_date)"
              :deleteComment="deleteComment"
              :updateComment="updateComment"

               ></comment>
          </div>  
          <div class="separation"></div>
          <!-- ajouter un commentaire -->
          <form>
            <div class="user user--center">
              <img  class="user__profilPicture " height="50" width="50" :src="this.currentUser.user_picture" alt="Image de profil ">
              <div  class="user__infos user__infos--comment">
                  <p class="user__fullName">{{this.fullName}}</p>
                  <textarea  v-model="commentText" aria-label="texte du commentaire" maxlength="100" class="user__comment" placeholder="Votre commentaire ?"  cols="30" rows="2"></textarea>
              </div>
              <i @click="fetchNewComment" class="fas fa-chevron-circle-right user__newComment"></i>
            </div>
            <p class="error" v-if="this.textValidation">Le texte ne doit pas contenir de caracteres speciaux</p>

          </form>  
        </div>
        
      </div> 
      
      
</div>
 
</template>


<script>
import { mapState } from 'vuex';
import comment from '../components/comment.vue'
import { mapGetters } from 'vuex';
import updatePost from '../components/UpdatePost.vue'
// import module Dayjs pour la gestion de l'affichage des dates 

import dayjs from 'dayjs'
// affichage en francais
require("dayjs/locale/fr");
// affichage de la durée depuis le dernier commentaire
const  relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);


// import axios
const axios = require('axios');
// ajout d'une URL de base aux requetes
const instance = axios.create({baseURL: 'http://localhost:3000/api'});

export default {
    name:'Post',
    components : {comment,updatePost} ,
    data: function(){
        return {
          // photo qui vient d etre chargé
          previewPicture : null,
          // ouverture du menu de Maj du post
          isOpenPost:false,
          // ouverture du composant de update POST
          update:false,
          // liste de like
          likeList:[],
          // liste de commentaire
          commentList:[],
          // texte du commentaire
          commentText:null,
          // ouverture de la section commentaire
          openCommentSection:false
        }
    },
    props:['post','index'],
    
    computed:{
      // nombre de like pour un post 
      likeNumber(){return this.likeList.length},
      // nombre de commentaire pour un post
      CommentNumber(){return this.commentList.length},
      // verification si l'utilisateur a liker la publication
      checklike() {
        return  this.likeList.findIndex(el => el.user_id == this.user_id);
      },
      // verification du texte saisi par l'utilisateur
      textValidation  () {
      const regexp = /[^a-zA-Z0-9.,!_@#\- ]/;
      if (regexp.test(this.commentText)) { return true}
      else {return false} 
    },
      ...mapState(['currentUser','user_id']),...mapGetters(['fullName'])
    },
    methods:{
      // ouverture de la section commentaire
      switchOpenCommentSection() {
        this.openCommentSection = !this.openCommentSection
      },
      // ouverture du composant de MAJ du post
      updatePost (){this.update=!this.update},
      // ouverture du menu de MAJ du post
      openUpdatePost : function(){this.isOpenPost = !this.isOpenPost},
      // mise en majuscule nom prenom
      capitalize(prenom,nom){
        return prenom[0].toUpperCase() + prenom.slice(1)+ " " + nom.toUpperCase()
      },
      // formatage de la date de creation de la publication
      date(date){
        return dayjs(date).format('DD/MM/YYYY')
      },
      // formatage de la date du commentaire
      fromNow(date){
        return dayjs(date).locale("fr").fromNow();
      },
      // appel API pour supprimer un post 
      fetchDeletePost(){
        const post_id = this.post.post_id
        // recuperation de l'index du post dans la liste de post du store
        const post_index =this.index;
        const self= this;
        instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
        instance.delete(`/post/${post_id}`)
           .then(function(res){
              console.log(res.data);
              // MAJ du store 
              self.$store.commit("deletePost", post_index);                       
              })
            .catch(function(err){
              console.log(err)
              console.log(err.response.data)
              })                 
      },
      // appel API pour recuperer la liste de like
      async getAllLike (){
        instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
        try{ 
              const post_id = this.post.post_id
              // requete Get api pour recuperer la totalité des like pour le post
              const response = await instance.get(`/like/${post_id}`);
              // Maj de la liste dans les datas du composant 
              this.likeList = response.data

        }
          catch(err) {
          console.log(err)
       
          
          }
     },
    //  appel API pour enregistrer ou supprimer un like
      async toggleLike(){
       instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
       const post_id = this.post.post_id
      //  verification si l utilisateur a liker le post
       const index = this.checklike
       const self =this;
      //  si a deja liker le post
       if (index >=0) {
        //  requete pour supprimer le like en BDD
         instance.delete(`/like/${post_id}`)
           .then(function(){
              // MAJ de la liste dans les datas du composant
              self.likeList.splice(index,1);                    
              })
            .catch(function(err){
              console.log(err)
              console.log(err.response.data)
              })  

       }
      //  si il n a pas encore liker
       else{
        //  requete pour creer un like 
         instance.post(`/like/${post_id}`)
            .then(function(res){
                // MAJ de la liste dans les datas du composant
                self.likeList.push(res.data.like)  
                        
            })
            .catch(function(err){
              console.log(err)
              console.log(err.response.data)
            })
       }
    },
    // appel API pour recuperer la liste des commentaires
    async fetchListComment (){
      const post_id = this.post.post_id
      try{
        // requete Get api pour recuperer la totalité des commentaires relatifs au post
      instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
      const response = await instance.get(`/comment/${post_id}`);
      // MAJ de la liste dans les datas du composant
      this.commentList = response.data
      }
      catch(err) {
        console.log(err)      
        
      }
    },
  // appel API pour creer un nouveau commentaire
    async fetchNewComment(){
      if (this.textValidation||!this.commentText||this.commentText==" ") {return null}
      else {
          instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
          const text = this.commentText
          const self= this;
          const post_id = this.post.post_id
          // requete  pour creer le post en BDD
          instance.post(`/comment/${post_id}`,{text})
                .then(function(res){
                    // creation objet commentaire avec le retour API
                    const newComment = {...res.data,user_picture:self.currentUser.user_picture,user_prenom:self.currentUser.user_prenom,user_nom:self.currentUser.user_nom };
                    // MAJ de la liste dans les datas du composant
                    self.commentList.push(newComment)
                    self.commentText=null; 
                            
                })
                .catch(function(err){
                  console.log(err)
                  console.log(err.response.data)
                })
      }
      
    },
    // suppression d'un commentaire dans les datas du composant
    deleteComment(index){
      this.commentList.splice(index,1);
    },
    // MAJ d'un commentaire dans les datas du composant
    updateComment(index,data){
      this.commentList[index] = {...this.commentList[index], ...data}
    }
    },
    // appel des fonctions de recuperation des likes et des commentaires dans le hook created
    created(){
     this.getAllLike();
     this.fetchListComment();
    }
    
}
</script>

<style lang="scss" scoped>


// bloc post
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
// partie avec les données du createur du post 
.user{
  display: flex;
  position: relative;
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
    }

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
  }
  &__date{
    font-size: 1.4rem;
    font-style: italic;
    color: $hint;
  }
  &__newComment{
    position: absolute;
    bottom: 20px;
    right:-10px;
  }
  
}

// partie pour initier la MAJ ou la suppression du post
.update{
  display: flex;
  flex-direction: column;
  position: relative;
  &__nav{
    position: absolute;
    left: -22rem;
    top: 1rem;
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

// partie avec le text du post
.postText{
  margin: 1rem 0rem 0.5rem 0rem;

}

// partie avec la photo du post 
.postPicture{
    margin: 1rem 0rem;
    display: flex;
    justify-content: center;
    
}

// div de separation
.separation{
  height: 1px;
  background-color: $border;
  text-align: center;
  
  
}

//  affichage du nb de like ainsi que du nombre de commentaires

.numberContainer{
  display: flex;
 
}

.like{
  // flex-grow: 1;
  flex: 1;
  text-align: center;
  
  padding: 1rem 0rem;
  &--check{
    color: $secondary;
    background-color: $primary;
    }
  &Check{
    
    color: $secondary;
  }
  &__number{
    margin-right: 1rem;
  }
  &__i{
    cursor: pointer;
    font-size: 2rem;
  }
  
}
.toggle{
  flex : 1;
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

.error{
  text-align: center;
  color: red;

}

</style>