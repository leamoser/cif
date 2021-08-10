<template>
  <a class="btn" href="https://www.lea-moser.ch">
    <p class="code small">weiter</p>
    <img src="/img/webicons/arrow.svg" alt="Icon für nebis" />
  </a>
</template>

<script>
export default {
  name: "HomeLoggedOut",
}
</script>

<style lang="scss" scoped>
 a.btn{
   @include linkreset();
   @include button();
   img{
     @include icon(0, $ic-s)
   }
 }
</style>