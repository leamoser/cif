<template>
  <footer v-if="appClaim">
    <p>Evtl. Footernavi</p>
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
  }
</style>