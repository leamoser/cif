<template>
  <div>
    <router-link to="/login"><p class="code">Du hast schon ein Profil? Dann kannst du dich hier einloggen.</p></router-link>
    <router-link to="/register"><p class="code">Du hast noch kein Profil? Hier zum Registrieren.</p></router-link>
  </div>
</template>

<script>
export default{
  name: 'LoginRegsisterNav'
}
</script>

<style lang="scss" scoped>
  div{
    margin-top: $ga-around;
    p{
      display: inline;
    }
    >a{
      @include linkreset;
      &:hover{
        text-decoration: underline;
      }
      &.router-link-active{
        display: none;
      }
    }
  }
</style>