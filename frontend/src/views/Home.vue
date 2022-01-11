<template>
  <div class="about">
    <Header></Header>
    <h1>This is an about page</h1>

  </div>
</template>


<script>
import Header from '../components/Header'

export default {
    name:'home',
    components : {Header} ,
    created(){
      console.log("created home")
    },
    mounted(){
      console.log("mounted home")
    }
    
}
</script>

<style lang="scss" scoped>

</style>