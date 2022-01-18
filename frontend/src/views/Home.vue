<template>
  <div class="Home">
    <Header></Header>
    <main>
      <create-post ></create-post>
      <!-- <form role="form" class="form" >
        <div class="post">
          <img  class="post__profilPicture" height="50" width="50" :src="this.currentUser.user_picture" alt="Image de profil ">
          <textarea aria-label="texte du post" maxlength="200" class="post__input" placeholder="Que souhaitez vous partager ?"  cols="30" rows="3"></textarea>
        </div>
        <div v-if="this.previewPicture"  class="postPicture">
          <img class="postPicture__img" height="300" width="500" :src="this.currentUser.user_picture">
        </div>
        <div class="separation"></div>
        <div class="upload">
          <label class="upload__label" for="upload">Choisir une image <i class="fas fa-upload"></i></label>
          <input id="upload" class="upload__input" type="file">
          <button class="upload__button">Publier <i class="fas fa-chevron-circle-right"></i></button>
        </div>
      </form> -->
      
<!-- :capitalize="item.user_prenom+' '+item.user_nom" -->
 <!-- :capitalize="capitalize(item.user_prenom,item.user_nom)" -->

      <div class="postList">
        <!-- <post class="post"></post> -->
        <post  class="post"
          v-for="(item,index) in this.postList"
          :key="item.post_id"
          :post="item"
          :index="index"
         
        ></post>
      </div>
    </main>
  </div>
</template>


<script>
import Header from '../components/Header'
import { mapState } from 'vuex';
import Post from '../components/Post.vue'
import createPost from '../components/CreatePost.vue'


export default {
    name:'home',
    components : {Header,Post,createPost},
    data: function(){
        return {
          previewPicture : null,
          update:false,
        }
    },
    created(){
      console.log("created home")
      this.$store.dispatch('fetchAllPost');
    },
    computed:{
      ...mapState(['currentUser','postList'])
    },
    methods:{
      // deletePost(index,post_id){
        
      // }
      // ...mapActions(['fetchCurrentUser'])
    },
    mounted(){
      console.log("mounted home");
      this.$store.dispatch('fetchCurrentUser');
    }
    
}
</script>

<style lang="scss" scoped>

Header{
  margin-bottom: 4rem;
  position: sticky;
  top: 0px;
  z-index: 2;
  width: 100%;
}

main{
  z-index: 1;
  max-width: 60rem;
  margin: auto;
}

// post{
//   margin-bottom: 2rem;
// }

// .form{
//   // padding: 2rem 2rem 1rem 2rem;
//   box-shadow: $box-shadow $border;
//   padding: 2rem 3rem 1rem 3rem;
//   // display: flex;
//   // flex-direction: column;
//   // align-items: center;
  
// }

// .post{
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
//     // padding: 1.5rem 1rem;
    
//     &__profilPicture{
//       border-radius: 50%;
      

//     }
//     &__input{
//       width: 80%;
//       margin-left: 1.5rem;
//       // border-radius: 2rem;
//       background-color: $textarea  ;
//       border: none;
//       outline: none;
//       padding: 1rem ;
//       resize: none;
     
//     }
//   }

//   .postPicture{
//     margin: 1rem 0rem;
//     display: flex;
   
//     justify-content: center;
//     // &__img{
      
//     // }
//   }

//   .upload{
//     display: flex;
//     justify-content:space-around;
//     margin: 0.5rem 0rem;
//     &__label{
//       padding: 1rem;
//       cursor: pointer;
//     }
//     &__input{
//       display: none;
//     }
//     &__button{
//       padding: 0rem 1rem;
//       border-radius: 1rem;
//       border-color: $border;
//       cursor: pointer;
//     }
//   }


// .separation{
//   height: 1px;
//   background-color: $border;
//   // width: 32rem;
//   text-align: center;
//   margin: 1rem 0rem;
  
// }

.postList{
  margin-top: 3rem;
  margin-bottom: 2rem;
  .post{
  margin-bottom: 2rem;
  }
}

</style>