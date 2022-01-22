<template>
  <router-view/>
</template>

<script>


export default {
  name:'app',
  // affichage du titre de la page en fonction du meta.title de la route visité
  watch: { $route(to) {document.title = to.meta.title }
  }
    
}



</script>


<style lang="scss" >
// la mise en page général et les variables sont importés dans le vue.config.js

</style>
