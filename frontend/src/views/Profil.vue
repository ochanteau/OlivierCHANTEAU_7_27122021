<template>
<div>
    
   <Header></Header>
   <div role="main" class="profil">
       <div class="userInfos">
            <div class="userInfos__img">                
                <img v-if="!previewPicture" height="200" width="200" :src="this.currentUser.user_picture" alt="Image de profil">
                <img v-if="previewPicture" height="200" width="200" :src="this.previewPicture" alt="image de profil">

            </div>
            <div class="userInfos__infos">
                <h2  class="userInfos__fullName">{{this.fullName}}</h2>
               
                <h3  class="userInfos__email">{{this.currentUser.user_email}}</h3>
            </div>
       </div>
       <div class="separation" ></div>
       <div class="updatePicture">
           <label class="updatePicture__label" for="profil__picture">Modifier votre photo  <i class="fas fa-upload"></i> </label>
           <input class="updatePicture__input" @change.prevent="uploadFile($event)" id="profil__picture"  type="file" accept="image/png, image/jpeg,image/jpg">
           <button class="updatePicture__button" @click="fetchFile">Enregister  </button>
           <p v-if="this.updateSucces" class="updatePicture__message">Votre photo de profil a bien été modifiée !</p>
       </div>
       <div class="separation" ></div>
       <div class="delete">
           <button v-if="!deleteConfirmation" @click="deleteAccount" class="delete__button">Supprimer mon compte</button>
           <p class="delete__message" v-if="deleteConfirmation">Votre compte a bien été supprimé ! </p>
       </div>
       <div class="error">
            <p v-if="MissingPicture" class="error_missingPicture">Vous n'avez pas selectionner d'image !</p>
            <p v-if="ErrorServer" class="error_ErrorServer">Une erreur s'est produite ! Essayez de nouveau</p>
        </div>
   </div>

 
</div>
</template>

<script>
import Header from '../components/Header';
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';


// import axios pour requete API 
const axios = require('axios');
// ajout d'une URL de base aux requetes
const instance = axios.create({baseURL: 'http://localhost:3000/api/auth'});


export default {
    name:'profil',
    components : {Header} ,
    data: function (){
            return {
        profilPicture:null,
        MissingPicture:false,
        ErrorServer:false,
        deleteConfirmation:false,
        previewPicture : null,
        updateSucces:false
        }
    },
    computed:{
    ...mapState(['currentUser','token']),...mapGetters(['fullName'])
    },
    created(){
        console.log("created page profil")
    },
    mounted(){
        this.$store.dispatch('fetchCurrentUser')
        console.log("fetchcurrentUser")
    },
    
    methods:{
        uploadFile (e){
            const self = this;
            this.profilPicture=e.target.files[0];
            console.log(this.profilPicture);
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
            if (!this.profilPicture) {this.MissingPicture=true}
            else {
                let formData = new FormData();
                const image = this.profilPicture;
                formData.append("image",image);
                instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
                instance.put('/picture', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function(res){
                        console.log(res.data);
                        self.$store.commit("updateUserPicture", res.data);
                        self.updateSucces=true;
                    })
                    .catch(function(err){
                        self.ErrorServer=true;
                        console.log(err)
                        })
            }

        },
        deleteAccount(){
            const self = this;
            // demande de confirmation suppression de compte
            if ( window.confirm('Vous souhaitez vraiment supprimer votre compte?') 
            && window.confirm('Cette action entrainera la suppression de tout votre contenu et de vos participations au contenu des autres utisateurs')) 
            {
                instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
                instance.delete('/delete')
                    .then(function(res){
                        console.log(res);
                        // affichage confirmation suppression de compte
                        self.deleteConfirmation= true;
                        // appel logout apres 1seconde
                        setTimeout(() => {
                            self.$store.commit('logout')
                        }, 1000);
                        
                    })
                    .catch(function(err){
                        this.ErrorServer=true;
                        console.log(err)
                        })
            }

        }
    }
    
}
</script>

<style lang="scss" scoped>

// responsive
@mixin S {
    @media (max-width: 430px) {
      @content;
    }
  }
  
@mixin M {
    @media (max-width: 830px) {
      @content;
    }
  }

Header{
    margin-bottom: 4rem;
}

.profil{
    max-width: 80rem;
    padding: 3rem 0rem 1rem 0rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: $box-shadow $border;
    @include M {
      max-width: 40rem;
    }
    @include S{
      padding: 3rem 0rem 0rem 0rem;
    //   margin: 2rem auto;
      max-width: 30rem;
    }

}

.userInfos{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: blue;
    
        &__img{
            margin-bottom: 2rem;
        }
        &__infos{
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 2rem;
        }
        &__fullName{
            font-size: 2.5rem;
        }
        
        &__email{
            padding: 0.5rem 0rem;
            position: relative;
            font-size: 2.5rem;
            font-weight: normal;
           
    
            // &::after{
            //     content: "";
            //     width: 25rem;
            //     border-bottom: 2px solid $secondary;
            //     position: absolute;
            //     left: 0;
            //     top: 5rem;
                
                

            // }
        }
}

.updatePicture{
        margin: 0.5rem 0rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size : 2rem;
        position: relative;
        padding: 0.5rem 0rem;
        &__label{
           padding-bottom: 0.5rem;
           cursor: pointer;
           @include S{
            text-align: center;
            }
           
        }
        &__button{
            font-size: 2rem;
            padding: 0.5rem 1rem;
            margin-top: 1rem;
            // border : solid $secondary 1px;
            // border : none;
            border-radius: 1rem;
            // background-color: $border;
            border-color: $border;
            cursor: pointer;
          
            
        }
        &__input{
            display: none;
        }
        &__message{
            font-size: 1.6rem;
            padding-top: 0.7rem;
            color: red;
        }
        
}

.separation{
    height: 1px;
    background-color:grey;
    width: 32rem;
    text-align: center;
    @include S{
        width: 30rem;
    }
}

.error{
    color: red;
}

.delete{
    margin: 3rem 0rem 2rem 0rem;
    
    &__button{
        font-size: 2rem;
        padding: 1rem;
        border-radius: 1rem;
        // background-color: $border;
        // border : solid $secondary 1px;
        border-radius: 1rem;
        // background-color: $border;
        border-color: $border;
        cursor: pointer;
    }
    &__message{
        font-size: 2rem;
        color: red;
    }
}

</style>