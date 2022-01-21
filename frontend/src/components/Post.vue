<template>
 
<div>
      <update-post v-if="this.update"
        :post="post"
        :index="index" 
        :updatePost="updatePost" 
        :openUpdatePost="openUpdatePost">
      </update-post>
      <!-- affichage du corps du post -->
      <div  class="post" >
        <div class=" post__container">
          <div class="user">
              <img  class="user__profilPicture" height="50" width="50" :src="post.user_picture" alt="Image de profil ">
              <div  class="user__infos">
                <p  class="user__fullName">{{capitalize(post.user_prenom,post.user_nom)}} {{index}}</p>
                <p class="user__date">Le {{date(post.post_date)}} </p>
              </div>
          </div>
          <div v-if="this.user_id==post.user_id||this.currentUser.droits_id==2" class="update">
            <i @click="openUpdatePost" class="fas fa-ellipsis-h"></i>
            <div class="update__nav" v-if="isOpenPost">
              <p @click="updatePost" v-if="this.user_id==post.user_id" class="update__update"><i class="far fa-edit"></i>Modifier la publication</p>
              <p @click="fetchDeletePost" class="update__delete"><i class="far fa-trash-alt"></i> Supprimer la publication</p>
            </div>
          </div>
        </div>
        <div class="postText">
            <p class="postText__p">{{post.post_text}}</p>
        </div>  
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
            <span class=" toggle__comment">Commentaires</span>
          </div>
        </div>
        <div class="separation"></div>
        
         
        <!--partie relative aux commentaires  -->
        <div class="commentSection">
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

               ></comment>
              <!-- <comment></comment> -->
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
import dayjs from 'dayjs'
require("dayjs/locale/fr");
const  relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);


import updatePost from '../components/UpdatePost.vue'
const axios = require('axios');
// ajout d'une URL de base aux requetes
const instance = axios.create({baseURL: 'http://localhost:3000/api'});

export default {
    name:'Post',
    components : {comment,updatePost} ,
    data: function(){
        return {
          previewPicture : null,
          isOpenPost:false,
          isOpenComment:false,
          update:false,
          likeList:[],
          commentList:[],
          commentText:null
        }
    },
    props:['post','index'],
    
    computed:{
      likeNumber(){return this.likeList.length},
      CommentNumber(){return this.commentList.length},
      checklike() {
        return  this.likeList.findIndex(el => el.user_id == this.user_id);
       
      },
      textValidation  () {
      const regexp = /[^a-zA-Z0-9.,!_@#\- ]/;
      if (regexp.test(this.commentText)) { return true}
      else {return false} 
    },
      ...mapState(['currentUser','user_id']),...mapGetters(['fullName'])
    },
    methods:{
      updatePost (){this.update=!this.update},
      openUpdatePost : function(){this.isOpenPost = !this.isOpenPost},
      openUpdateComment : function(){this.isOpenComment = !this.isOpenComment},
      capitalize(prenom,nom){
        return prenom[0].toUpperCase() + prenom.slice(1)+ " " + nom.toUpperCase()
      },
      date(date){
        return dayjs(date).format('DD/MM/YYYY')
      },
      fromNow(date){
        return dayjs(date).locale("fr").fromNow();
      },
      fetchDeletePost(){
        const post_id = this.post.post_id
        const post_index =this.index;
        const self= this;
        instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
        instance.delete(`/post/${post_id}`)
           .then(function(res){
              console.log(res.data);
              self.$store.commit("deletePost", post_index);                       
              })
            .catch(function(err){
              console.log(err)
              console.log(err.response.data)
              })                 
      },
      async getAllLike (){
        instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
        try{ 
              // const post_id = this.post.post_id
              const post_id = this.post.post_id

              console.log(post_id)
              // requete Get api pour recuperer la totalité des like pour le post
              const response = await instance.get(`/like/${post_id}`);
              console.log("response.dataget all like////////");
              console.log(response.data);
              this.likeList = response.data

        }
          catch(err) {
          console.log(err)
          // commit("logout")
        
          
          }
     },
      async toggleLike(){
       instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
       const post_id = this.post.post_id
       const index = this.checklike
       const self =this;
       if (index >=0) {
         instance.delete(`/like/${post_id}`)
           .then(function(res){
              console.log(res.data);
              self.likeList.splice(index,1);                    
              })
            .catch(function(err){
              console.log(err)
              console.log(err.response.data)
              })  

       }
       else{
         instance.post(`/like/${post_id}`)
            .then(function(res){
                console.log(res.data);
                self.likeList.push(res.data.like)  
                        
            })
            .catch(function(err){
              console.log(err)
              console.log(err.response.data)
            })
       }
    },
    async fetchListComment (){
      const post_id = this.post.post_id
      try{
        // requete Get api pour recuperer la totalité des commentaires relatifs au post
      instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
      const response = await instance.get(`/comment/${post_id}`);
      console.log("response.data liste de commentaires////////");
      console.log(response.data);
      this.commentList = response.data
      }
      catch(err) {
        console.log(err)
        // commit("logout")
       
        
      }
    },
    async fetchNewComment(){
      if (this.textValidation||!this.commentText||this.commentText==" ") {return null}
      else {
          instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
          const text = this.commentText
          const self= this;
          const post_id = this.post.post_id
          instance.post(`/comment/${post_id}`,{text})
                .then(function(res){
                    console.log(res.data);
                    const newComment = {...res.data,user_picture:self.currentUser.user_picture,user_prenom:self.currentUser.user_prenom,user_nom:self.currentUser.user_nom };
                    console.log(newComment)
                    self.commentList.push(newComment)
                    self.commentText=null; 
                            
                })
                .catch(function(err){
                  console.log(err)
                  console.log(err.response.data)
                })
      }
      
    },
    deleteComment(item){
      this.commentList.splice(item,1);
    }
      // ...mapActions(['fetchCurrentUser'])
    },
    created(){
     this.getAllLike();
     this.fetchListComment();
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
    font-style: italic;
    color: $hint;
    // &--comment{
    //   font-size: 1.3rem;
    //   font-style: italic;
    //   margin-left: 7rem;
    // }
  }
  &__newComment{
    position: absolute;
    bottom: 20px;
    right:-10px;
  }
  
}

.update{
  display: flex;
  flex-direction: column;
  position: relative;
  &__nav{
    position: absolute;
    left: -22rem;
    top: 1rem;
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
  // flex-grow: 1;
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