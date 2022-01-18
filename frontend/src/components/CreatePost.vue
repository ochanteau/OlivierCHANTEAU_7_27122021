<template>
  
   
    
      <form role="form" class="form" >
        <div class="post">
          <img  class="post__profilPicture" height="50" width="50" :src="this.currentUser.user_picture" alt="Image de profil ">
          <textarea v-model="post_text" aria-label="texte du post" maxlength="200" class="post__input" placeholder="Que souhaitez vous partager ?"  cols="30" rows="3"></textarea>
        </div>
        <div v-if="this.previewPicture"  class="postPicture">
          <img class="postPicture__img" height="300" width="500" :src="this.previewPicture">
        </div>
        <div class="separation"></div>
        <div class="upload">
          <label class="upload__label" for="upload">Choisir une image <i class="fas fa-upload"></i></label>
          <input @change.prevent="uploadFile($event)" id="upload" class="upload__input" type="file">
          <button @click.prevent="fetchFile" class="upload__button">Publier <i class="fas fa-chevron-circle-right"></i></button>
        </div>
        <p class="error" v-if="this.missingFields">Une image et un texte sont obligatoires !</p>
        <p class="error" v-if="this.ErrorServer">Une erreur s'est produite</p>
        <p class="error" v-if="this.textValidation">Le texte ne doit pas contenir de caracteres speciaux</p>
        
      </form>
      

    
  
</template>


<script>

import { mapState } from 'vuex';

const axios = require('axios');
// ajout d'une URL de base aux requetes
const instance = axios.create({baseURL: 'http://localhost:3000/api/post'});

export default {
    name:'CreatePost',
    // components : {Header,Post},
    data: function(){
        return {
          previewPicture : null,
          postPicture:null,
          missingFields:false,
          ErrorServer:false,
          post_text:null,
        }
    },
    // props:
    //     ['profilPicture', 'postPicture']
    // ,
    created(){
      console.log("created publish post")
    },
    computed:{
       textValidation  () {
     const regexp = /[^a-zA-Z0-9.,!_@#\- ]/;
      if (regexp.test(this.post_text)) { return true}
      else {return false} 
    },
      
      ...mapState(['currentUser']),
    },
    methods:{
      uploadFile (e){
            const self = this;
            this.postPicture=e.target.files[0];
            console.log(this.postPicture);
            console.log(e.target.value)

            let reader = new FileReader();

            reader.onload = function (e) {
                // get loaded data and render thumbnail.
                self.previewPicture = e.target.result;
            
            };
            // read the image file as a data URL.
            reader.readAsDataURL(e.target.files[0]);
            console.log(e.target.files[0])
            
            
        },
      fetchFile(){
            this.MissingPicture=false;
            this.ErrorServer=false;
            const self=this;
            if( this.textValidation) {return null}
            else if (!this.postPicture || !this.post_text) {this.missingFields=true}
            else {
                let formData = new FormData();
                const image = this.postPicture;
                const post_text= JSON.stringify(this.post_text)
                formData.append("image",image);
                // formData.append("post",this.post_text);
               formData.append("post",post_text);

                console.log(post_text)
                instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
                instance.post('/', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function(res){
                        console.log(res.data);
                        const post ={...res.data,...self.currentUser};
                        console.log(post)
                        self.$store.commit("createPost", post);
                        self.post_text=null;
                        self.previewPicture=null;
                        self.missingFields=false;
                        self.ErrorServer=false;
                        
                    })
                    .catch(function(err){
                        self.ErrorServer=true;
                        console.log(err)
                        console.log(err.response.data)
                        })
              }
      }
      // ...mapActions(['fetchCurrentUser'])
    },
    mounted(){
      console.log("mounted publis post");
     
    }
    
}
</script>


<style lang="scss" scoped>




.form{
  // padding: 2rem 2rem 1rem 2rem;
  box-shadow: $box-shadow $border;
  padding: 2rem 3rem 1rem 3rem;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  
}

.post{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    // padding: 1.5rem 1rem;
    
    &__profilPicture{
      border-radius: 50%;
      

    }
    &__input{
      width: 80%;
      margin-left: 1.5rem;
      // border-radius: 2rem;
      background-color: $textarea  ;
      border: none;
      outline: none;
      padding: 1rem ;
      resize: none;
      border-radius: 1rem;
     
    }
  }

  .postPicture{
    margin: 1rem 0rem;
    display: flex;
   
    justify-content: center;
    // &__img{
      
    // }
  }

  .upload{
    display: flex;
    justify-content:space-around;
    margin: 0.5rem 0rem;
    &__label{
      padding: 1rem;
      box-shadow: $box-shadow $border;
      border-radius: 1rem;
      cursor: pointer;
    }
    &__input{
      display: none;
      
    }
    &__button{
      padding: 0rem 1rem;
      border-radius: 1rem;
      box-shadow: $box-shadow $border;
      border: none;
      cursor: pointer;
    }
  }


.separation{
  height: 1px;
  background-color: $border;
  // width: 32rem;
  text-align: center;
  margin: 1rem 0rem;
  
}
.error{
  text-align: center;
  color: red;

}

</style>