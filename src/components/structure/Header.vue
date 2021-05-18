<template>
  <header>
    <div id="nav">
      <router-link to="/" :tag="tagForRouter">Home</router-link>
      <router-link to="/about" :tag="tagForRouter">About</router-link>
      <router-link to="/user/1" :tag="tagForRouter">User</router-link>
    </div>
<!--
    <pre>{{$store.state.activeCourse}}</pre>
    <pre>{{$store.state.activeChapter}}</pre>
-->
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
<style lang="scss" scoped>
div#nav>*:not(*:last-of-type)::after{
  content: ' | ';
}
header{
  display: none;
}
</style>