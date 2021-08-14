<template>
  <div class="maincontainer">
    <router-link to="/login">
      <div class="btn-dbl login">
        <p class="code small">Du hast schon ein Profil? Hier zum Login.</p>
        <img class="right" src="/img/webicons/key.svg" alt="Icon Einloggen" />
      </div>
    </router-link>
    <router-link to="/register">
      <div class="btn-dbl register">
        <p class="code small">Du hast noch kein Profil? Hier zum Registrieren.</p>
        <img class="right" src="/img/webicons/edit.svg" alt="Icon Einloggen"/>
      </div>
    </router-link>
  </div>
</template>

<script>
export default{
  name: 'LoginRegsisterNav'
}
</script>

<style lang="scss" scoped>
div.maincontainer{
  padding: 0 $ga-around;
  margin-bottom: $ga-around;
  &>a{
    @include linkreset();
    &.router-link-active{
      display: none;
    }
  }
  a{
    display: inline-block;
    div.btn-dbl{
      width: auto;
      @include flex(row,center,flex-start);
      &.login{
        img{
          @include btnicon(0,9px,14px);
        }
      }
      &.register{
        img{
          @include btnicon(0,10px,4px)
        }
      }
    }
  }
}

</style>