<template>
  <div class="Home">
    <!-- composent header -->
    <Header></Header>
    <main>
      <!-- inmport composant formulaire de creation de post -->
      <create-post ></create-post>
      <!-- liste des publications, itération sur la liste de poste du store  -->
      <div class="postList">
        <!-- composants publications , props objet post et index  -->
        <Post  class="Post"
          v-for="(item,index) in this.postList"
          :key="item.post_id"
          :post="item"
          :index="index"
         
        ></Post>
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
         
        }
    },
    created(){
      //  requete API de la liste des publications via action fetcAllpost
      this.$store.dispatch('fetchAllPost');
    },
    computed:{
      // recuperation des données user et de la liste de post
      ...mapState(['currentUser','postList']),
    },
    methods:{
    },
    mounted(){
      // requete API du user via action fetchCurrentUser
      this.$store.dispatch('fetchCurrentUser');
    }
    
}
</script>

<style lang="scss" scoped>

// responsive
@mixin XS {
    @media (max-width: 300px) {
      @content;
    }
  }
@mixin S {
    @media (max-width: 430px) {
      @content;
    }
  }
@mixin M{
    @media (max-width: 620px) {
      @content;
    }
  }
  
@mixin L{
    @media (max-width: 715px) {
      @content;
    }
  }

// positionnement du header 
Header{
  margin-bottom: 2rem;
  position: sticky;
  top: 0px;
  z-index: 2;
  width: 100%;
}



main{
  z-index: 1;
  max-width: 70rem;
  margin: auto;
  @include L {
      max-width: 60rem;
    }
  @include M {
      max-width: 50rem;
    }
  @include S {
      max-width: 35rem;
    }
  @include XS {
      max-width: 25rem;
    }

}

// bloc liste de post
.postList{
  margin-top: 2.5rem;
  margin-bottom: 2rem;
  
}

.Post{
  margin-bottom: 2rem;
}

</style>