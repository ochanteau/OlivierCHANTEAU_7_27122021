<template>
<div>
    <!-- import du composant header -->
   <Header></Header>
   <div role="main" class="profil">
       <!-- bloc avec les infos de l'utilisateur -->
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
       <!-- bloc de MAJ de la photo de profil -->
       <div class="updatePicture">
           <label class="updatePicture__label" for="profil__picture">Modifier votre photo  <i class="far fa-edit"></i> </label>
           <input class="updatePicture__input" @change.prevent="uploadFile($event)" id="profil__picture"  type="file" accept="image/png, image/jpeg,image/jpg">
           <button class="updatePicture__button" @click="fetchFile">Enregistrer  </button>
           <p v-if="this.updateSucces" class="updatePicture__message">Votre photo de profil a bien été modifiée !</p>
       </div>
       <div class="separation" ></div>
       <!-- bloc de supression du compte -->
       <div class="delete">
           <button v-if="!deleteConfirmation" @click="deleteAccount" class="delete__button">Supprimer votre compte</button>
           <p class="delete__message" v-if="deleteConfirmation">Votre compte a bien été supprimé ! </p>
       </div>
       <!-- bloc d'erreur -->
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
    mounted(){
        this.$store.dispatch('fetchCurrentUser')
    },
    methods:{
        // methode de recup de la nouvelle photo
        uploadFile (e){
            const self = this;
            this.profilPicture=e.target.files[0];
            let reader = new FileReader();
            reader.onload = function (e) {
                // get loaded data and render thumbnail.
                self.previewPicture = e.target.result;
            };
            // read the image file as a data URL.
            reader.readAsDataURL(e.target.files[0]);         
        },
        // envoie de la nouvelle photo au serveur et MAJ BDD
        fetchFile(){
            this.MissingPicture=false;
            this.ErrorServer=false;
            const self=this;
            if (!this.profilPicture) {this.MissingPicture=true}
            else {
                // nouvelle objet formData
                let formData = new FormData();
                const image = this.profilPicture;
                formData.append("image",image);
                // recuperation du token dans le localstorage et parametrage du header
                instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
                // requete serveur de la nouvelle photo 
                instance.put('/picture', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function(res){
                        // appel de la mutation pour MAJ l url de la photo de profil dans le store
                        self.$store.commit("updateUserPicture", res.data);
                        // affichage message de confirmation 
                        self.updateSucces=true;
                    })
                    .catch(function(err){
                        self.ErrorServer=true;
                        console.log(err)
                        })
            }

        },
        // methode de supression du compte
        deleteAccount(){
            const self = this;
            // demande de confirmation suppression de compte
            if ( window.confirm('Vous souhaitez vraiment supprimer votre compte?') 
            && window.confirm('Cette action entrainera la suppression de tout votre contenu et de vos participations au contenu des autres utisateurs')) 
            {
                // requete de suppression du compte en BDD
                instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`;
                instance.delete('/delete')
                    .then(function(){
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
// bloc container
.profil{
    max-width: 70rem;
    padding: 3rem 0rem 1rem 0rem;
    margin: 2rem auto;
    border-radius: 5rem;
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

// bloc avec les infos de l'utilisateur 
.userInfos{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $secondary;
    
        &__img{
            margin-bottom: 2rem;
            img{
                object-fit: contain;
            }
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
           
        }
}

// bloc de MAJ de la photo de profil
.updatePicture{
        margin: 0.5rem 0rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size : 2rem;
        position: relative;
        padding: 0.5rem 0rem;
        &__label{
           padding: 1rem 1rem;
           box-shadow: $box-shadow $border;
           border-radius: 1rem;
           cursor: pointer;
           @include S{
            text-align: center;
            }
           
        }
        &__button{
            font-size: 2rem;
            padding: 0.5rem 1rem;
            margin-top: 1.5rem;
            border-radius: 1rem;
            border :none;
            box-shadow: $box-shadow $border;
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

// bloc de separation
.separation{
    height: 1px;
    background-color:grey;
    width: 32rem;
    text-align: center;
    @include S{
        width: 30rem;
    }
}

// bloc d'erreur
.error{
    color: red;
}

// bloc de supression du compte
.delete{
    margin: 3rem 0rem 2rem 0rem;
    
    &__button{
        font-size: 2rem;
        padding: 1rem;
        border-radius: 1rem;
        // background-color: $border;
        // border : solid $secondary 1px;
        
        // background-color: $border;
        border:none;
        box-shadow: $box-shadow $border;
        cursor: pointer;
    }
    &__message{
        font-size: 2rem;
        color: red;
    }
}

</style>