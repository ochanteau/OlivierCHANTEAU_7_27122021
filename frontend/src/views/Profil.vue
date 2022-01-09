<template>
<div>
    
   <Header></Header>
   <div>
       <div>
           <input @change.prevent="uploadFile($event)"  type="file" accept="image/png, image/jpeg,image/jpg">
           <button @click="fetchFile">Enregister</button>
       </div>
   </div>
 
</div>
</template>

<script>
import Header from '../components/Header';
import { mapState } from 'vuex';

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
        profilPicture:null
        }
    },
    mounted(){
        this.$store.dispatch('fetchCurrentUser')
    },
    computed:{
    ...mapState(['currentUser'])
    },
    methods:{
        uploadFile (e){
            this.profilPicture=e.target.files[0];
            console.log(this.profilPicture)
            
        },
        fetchFile(){
            if (!this.profilPicture) {return}
            else {
            let formData = new FormData();
            const image = this.profilPicture;
            formData.append("image",image);
            instance.put('/picture', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
            })
            .then(function(){

            }

            )
            .catch()
            }

        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>