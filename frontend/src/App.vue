<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
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


// // RESET
// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }

// // GENERAL

// html {
//   font-size: 62.5%;
// }

// body {
//   font-family: $font-stack;
//   font-size: 1.6rem;
// }


// h1 {
//   font-family: $title;
// }

// ul {
//   list-style: none;
// }

// a {
//   color: black;
//   text-decoration: none;
// }

// img {
//   max-width: 100%;
// }

</style>
