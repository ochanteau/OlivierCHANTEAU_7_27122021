<template>
<div>
    
   <Header></Header>
 
</div>
</template>

<script>
import Header from '../components/Header'

export default {
    name:'profil',
    components : {Header} ,
    mounted(){
        this.$store.dispatch('fetchCurrentUser')
    }
    
}
</script>

<style lang="scss" scoped>

</style>