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
    margin-top: $ga-top-s;
    padding: $ga-around;
    @include flex(row,center,space-between);
    div.footer_nav{
      @include flex(row,center,flex-start);
      *{
        @include linkreset;
        @include basic_hover{
          text-decoration: underline;
        }
        &:not(:last-of-type){
          margin-right: 30px;
        }
      }
    }
  }
</style>