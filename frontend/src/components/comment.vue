<template>
    <div class="comment">
        <div class="user user--comment">
            <img  class="user__profilPicture " height="50" width="50" :src="this.comment.user_picture" alt="Image de profil ">
            <div  class="user__infos ">
                <p  class="user__fullName">{{capitalize}}</p>
                <p  class="user__comment" >{{this.comment.comment_text}} </p>
            </div>
            <div v-if="this.user_id==comment.user_id||this.currentUser.droits_id==2" class="update ">
                <i @click="openUpdateComment" class="fas fa-ellipsis-h update__i"></i>
                <div class="update__nav" v-if="isOpenComment">
                    <p v-if="this.user_id==comment.user_id" class="update__update"><i class="far fa-edit"></i>Modifier</p>
                    <p @click=" fetchDeletePost" class="update__delete"><i class="far fa-trash-alt"></i>Supprimer</p>
                </div>
            </div>
        </div>
        <p class="user__date ">{{fromNow}}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
const axios = require('axios');
// ajout d'une URL de base aux requetes
const instance = axios.create({baseURL: 'http://localhost:3000/api'});



export default {
   name:'comment',
    // components : {Header} ,
    data: function(){
        return {
          
        
          isOpenComment:false,
         
        }
    },
    props:['comment','index','capitalize','fromNow','deleteComment'],
    created(){
      console.log("created comment")
    },
    computed:{
      ...mapState(['currentUser','user_id'])
    },
    methods:{
      
      openUpdateComment : function(){this.isOpenComment = !this.isOpenComment},
      fetchDeletePost(){
        const comment_id = this.comment.comment_id
        const comment_index =this.index;
        const self= this;
        instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
        instance.delete(`/comment/${comment_id}`)
           .then(function(res){
              console.log(res.data);
              self.deleteComment(comment_index); 
              self.isOpenComment= false;                    
              })
            .catch(function(err){
              console.log(err)
              console.log(err.response.data)
              })                 
      },
      // ...mapActions(['fetchCurrentUser'])
    }
    
}

</script>

<style lang="scss" scoped>



.user{
  display: flex;
  align-items: center;
    // &--comment{
    //     align-items: flex-start;
    // }
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
    
      font-size: 1.3rem;
      font-style: italic;
      margin-left: 7rem;
   
  }
}

.update{
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 3rem;
//   &__i{
//       vertical-align: top;
//   }
  &__nav{
    position: absolute;
    left: -10rem;
    // right: -10rem;
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

</style>