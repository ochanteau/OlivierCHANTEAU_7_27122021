<template>
  <div class="UpdatePost">
    
      <!-- <i class="far fa-window-close post__close"></i> -->
      <div @click="updatePost" class="overlay"></div>
      <form role="form" class="form" >
        <div class="post">
          <img  class="post__profilPicture" height="50" width="50" :src="post.user_picture" alt="Image de profil ">
          <textarea v-model="post_text"  aria-label="texte du post" maxlength="200" class="post__input"  cols="30" rows="3"></textarea>
          <i @click="updatePost" class="far fa-window-close post__close"></i>
        </div>
        <div  class="postPicture">
          <img v-if="this.preview"  class="postPicture__img" height="300" width="500" :src="this.preview">
          <img v-else class="postPicture__img" height="300" width="500" :src="post.post_picture">
        </div>
        <div class="separation"></div>
        <div class="upload">
          <label class="upload__label" for="update">Choisir une image <i class="fas fa-upload"></i></label>
          <input @change.prevent="upload($event)" id="update" class="upload__input" type="file">
          <button @click.prevent="fetchFile(index,post.post_id)" class="upload__button">Publier <i class="fas fa-chevron-circle-right"></i></button>
        </div>
        <p class="error" v-if="this.missingFields">Le texte est obligatoire !</p>
        <p class="error" v-if="this.ErrorServer">Une erreur s'est produite</p>
        <p class="error" v-if="this.textValidation">Le texte ne doit pas contenir de caracteres speciaux</p>
      </form>
      

  </div>
</template>


<script>
import { mapState } from 'vuex';


const axios = require('axios');
// ajout d'une URL de base aux requetes
const instance = axios.create({baseURL: 'http://localhost:3000/api/post'});

export default {
    name:'UpdatePost',
    props:['post','index','updatePost'],
    // components : {Header} ,
    data: function(){
        return {
          preview : null,
          post_text:this.post.post_text,
          postPicture:null,
          missingFields:false,
          ErrorServer:false,
        }
    },
    
    computed:{
      textValidation  () {
        const regexp = /[^a-zA-Z0-9.,!_@#\- ]/;
        if (regexp.test(this.post_text)) { return true}
        else {return false} 
      },
    ...mapState(['currentUser'])
    },
    methods:{
     upload (e){
            const self = this;
            this.postPicture=e.target.files[0];
            console.log(this.postPicture);
            console.log(e.target.value)

            let reader = new FileReader();

            reader.onload = function (e) {
                // get loaded data and render thumbnail.
                self.preview = e.target.result;
            
            };
            // read the image file as a data URL.
            reader.readAsDataURL(e.target.files[0]);
            console.log(e.target.files[0])
            
            
        },
      fetchFile(index,post_id){
            this.missingFields=false;
            this.ErrorServer=false;
            const self=this;
            if( this.textValidation) {return null}
            else if ( !this.post_text || this.post_text=="") {this.missingFields=true}
            else {

                if (this.postPicture) {
                    let formData = new FormData();
                    const image = this.postPicture;
                    const post_text= JSON.stringify(this.post_text)
                    formData.append("image",image);
                    // formData.append("post",this.post_text);
                    formData.append("post",post_text);

                    console.log(post_text)
                    instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
                  
                    instance.put(`/${post_id}`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
                        .then(function(res){
                            console.log(res.data);
                            const post = res.data;
                            console.log(post)
                            self.$store.commit("updatePost", post,index);
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

                else {
                    return
                }





                
              }
      }
    }
    
}
</script>

<style lang="scss" scoped>

Header{
  margin-bottom: 4rem;
}

.UpdatePost{
  max-width: 60rem;
  margin: auto;
  position: fixed;
  top: 20%;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  


  
}

.form{
  // padding: 2rem 2rem 1rem 2rem;
  box-shadow: $box-shadow $border;
  padding: 2rem 3rem 1rem 3rem;
  background-color: white;
  position: relative;
  z-index: 3;
  
  
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
    &__close{
      position: absolute;
      top: 10px;
      right: 10px;
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

.overlay{
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.error{
  text-align: center;
  color: red;

}
</style>