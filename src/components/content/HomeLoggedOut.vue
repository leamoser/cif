<template>
  <div class="main">
    <div class="text">
      <p class="big">Deine Online-Lernplattform für die wichtigsten Frontend-Programmiersprachen.</p>
      <p class="big">Lege jetzt los!</p>
    </div>
    <div class="buttonbox">
      <router-link to="/login">
        <button class="btn"><p class="code small">einloggen</p></button>
      </router-link>
      <router-link to="/register">
        <button class="btn"><p class="code small">registrieren</p></button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeLoggedOut",
}
</script>

<style lang="scss" scoped>
div.main {
  div.text{
    margin-top: calc(#{$ga-around} * 4);
    &>p{
      @include content();
      margin-bottom: $ga-around;
    }
  }
  div.buttonbox{
    @include flex(row,center,flex-start);
    gap: 13px;
    &>*{
      display: block;
    }
  }

}

</style>