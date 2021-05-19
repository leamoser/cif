<template>
  <div>
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Registrieren</router-link>
  </div>
</template>

<script>
export default{
  name: 'LoginRegsisterNav'
}
</script>

<style lang="scss" scoped>
  div{
    >*:not(*:last-of-type)::after{
      content: ' | ';
    }
  }
</style>