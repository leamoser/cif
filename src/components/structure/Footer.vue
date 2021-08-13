<template>
  <footer v-if="appClaim">
    <div class="footer_nav">
      <p><router-link to="/impressum">Impressum</router-link></p>
      <p><router-link to="/about">About</router-link></p>
    </div>
    <p>{{appClaim}}</p>
  </footer>
</template>
<script>
export default{
  name: 'Footer',
  computed: {
    appClaim(){
      return this.$store.getters.getAppClaim || null
    }
  }
}
</script>
<style lang="scss" scoped>
footer{
  @include flex(row,center,space-between);
  padding: $ga-around;
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  background: rgb(255,255,255);
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
  div.footer_nav{
    p a{
      @include linkreset();
    }
    @include flex(row,center,flex-start);
    gap: 15px;
  }
}
</style>