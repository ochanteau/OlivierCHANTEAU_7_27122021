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
  watch: { $route(to) {document.title = to.meta.title }
  }
    
}



</script>


<style lang="scss" >

$font-stack: "Roboto", sans-serif;
$title: "Shrikhand", sans-serif;
$primary: #9356dc;
$secondary: #ff79da;
$tertiary: #99e2d0;
$hint: #999;
$border: #ddd;
$localisation: #e4e0e0;
$background: #f2f2f2;
$background-light: white;
$proposition_text: rgb(102, 100, 100);
$shadow: 8px 8px 10px $border;
$shadow--menu: 2px 2px 4px $border;

// RESET
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

// GENERAL

html {
  font-size: 62.5%;
}

body {
  font-family: $font-stack;
  font-size: 1.6rem;
}


h1 {
  font-family: $title;
}

ul {
  list-style: none;
}

a {
  color: black;
  text-decoration: none;
}

img {
  max-width: 100%;
}

</style>
