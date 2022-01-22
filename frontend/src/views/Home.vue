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

// positionnement du header 
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

// bloc liste de post
.postList{
  margin-top: 3rem;
  margin-bottom: 2rem;
  .post{
  margin-bottom: 2rem;
  }
}

</style>