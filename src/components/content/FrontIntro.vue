<template>
  <div class="intro" id="front" v-if="appName && appSlogan">
    <p class="logo_big">{{appName}}</p>
    <p class="intro">{{appSlogan}}</p>
  </div>
</template>
<script>
export default{
  name: 'FrontIntro',
  computed: {
    appName(){
      return this.$store.getters.getAppName || null
    },
    appSlogan(){
      return this.$store.getters.getAppSlogan || null
    }
  }
}
</script>
<style lang="scss" scoped>
</style>