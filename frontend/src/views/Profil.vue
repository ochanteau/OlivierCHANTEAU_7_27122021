<template>
<div>
    
   <Header></Header>
   <div class="profil">
       <div class="userInfos">
            <div class="userInfos__img">
                <img height="200" width="200" :src="this.currentUser.user_picture" alt="Image de profil de user">
            </div>
            <div class="userInfos__infos">
                <!-- <p>{{toUpperCase(this.currentUser.user_prenom)}} {{toUpperCase(this.currentUser.user_nom)}}</p> -->
                <p>{{this.fullName}}</p>
                <p>{{this.currentUser.user_email}}</p>
            </div>
       </div>
       <div class="updatePicture">
           <label for="updatePicture__picture">Modifier votre photo de profil</label>
           <input @change.prevent="uploadFile($event)" id="profil__picture"  type="file" accept="image/png, image/jpeg,image/jpg">
           <button @click="fetchFile">Enregister</button>
       </div>
       <div class="profil__delete">
           <button>Supprimer mon compte</button>
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

Header{
    margin-bottom: 6rem;
}

.profil{
    max-width: 80rem;
    padding: 2rem 0rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: $box-shadow $primary;

    .userInfos{
    display: flex;
    flex-direction: column;
    align-items: center;
    
        &__img{
            margin-bottom: 2rem;
        }
        &__infos{
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 2rem;
        }
    }
    &__update{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}



</style>