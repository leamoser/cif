<template>
  <header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/user/1">User</router-link>
    </div>
    <p>Das ist der Header</p>
  </header>
</template>
<script>
export default{
  name: 'Header'
}
</script>