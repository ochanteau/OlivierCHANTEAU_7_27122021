<template>
<div>
    
   <Header></Header>
   <div role="main" class="profil">
       <div class="userInfos">
            <div class="userInfos__img">                
                <img height="200" width="200" :src="this.currentUser.user_picture" alt="Image de profil de user">
            </div>
            <div class="userInfos__infos">
                <h2  class="userInfos__fullName">{{this.fullName}}</h2>
               
                <h3  class="userInfos__email">{{this.currentUser.user_email}}</h3>
            </div>
       </div>
       <div class="updatePicture">
           <label class="updatePicture__label" for="profil__picture">Modifier votre photo de profil</label>
           <input class="updatePicture__input" @change.prevent="uploadFile($event)" id="profil__picture"  type="file" accept="image/png, image/jpeg,image/jpg">
           <button class="updatePicture__button" @click="fetchFile">Enregister</button>
       </div>
       <div class="delete">
           <button class="delete__button">Supprimer mon compte</button>
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
import { mapGetters } from 'vuex'

// import axios pour requete API 
const axios = require('axios');
// ajout d'une URL de base aux requetes
const instance = axios.create({baseURL: 'http://localhost:3000/api/auth'});
// configuration du token dans le header
instance.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem('token')}`

export default {
    name:'profil',
    components : {Header} ,
    data: function (){
            return {
        profilPicture:null,
        MissingPicture:false,
        ErrorServer:false,
        }
    },
    computed:{
    ...mapState(['currentUser']),...mapGetters(['fullName'])
    },
    mounted(){
        this.$store.dispatch('fetchCurrentUser')
    },
    
    methods:{
        uploadFile (e){
            this.profilPicture=e.target.files[0];
            console.log(this.profilPicture)
            
            
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
                instance.put('/picture', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function(res){
                        console.log(res.data);
                        self.$store.commit("updateUserPicture", res.data);
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
    box-shadow: $box-shadow $primary;
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
           
    
            &::after{
                content: "";
                width: 25rem;
                border-bottom: 2px solid $secondary;
                position: absolute;
                left: 0;
                top: 5rem;
                
                

            }
        }
}

.updatePicture{
        margin: 1rem 0rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size : 2.5rem;
        position: relative;
        &__label{
           padding-bottom: 0.5rem;
           @include S{
            text-align: center;
            }
           
        }
        &__button{
            font-size: 2rem;
            padding: 0.5rem 1rem;
            margin-top: 1rem;
            border : solid $secondary 1px;
            border-radius: 2rem;
            background-color: $primary;
            &::after{
                content: "";
                width: 32rem;
                border-bottom: 2px solid $secondary;
                position: absolute;
                left: 0;
                top: 12rem;
                @include S{
                top: 15rem;
                width: 30rem;
                }
                

            }
        }
        
}

.error{
    color: red;
}

.delete{
    margin: 3rem 0rem 3rem 0rem;
    
    &__button{
        font-size: 2.5rem;
        padding: 1rem;
        border-radius: 2rem;
        background-color: $primary;
        border : solid $secondary 1px;
    }
}

</style>