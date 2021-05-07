<template>
  <header>
    <div id="nav">
      <router-link to="/" :tag="tagForRouter">Home</router-link>
      <router-link to="/about" :tag="tagForRouter">About</router-link>
      <router-link to="/user/1" :tag="tagForRouter">User</router-link>
    </div>
    <p>Das ist der Header</p>
  </header>
</template>
<script>
export default{
  name: 'Header',
  data(){
    return{
      tagForRouter: 'li'
    }
  }
}
</script>
<style>
div#nav>*:not(*:last-of-type)::after{
  content: ' | ';
}
</style>