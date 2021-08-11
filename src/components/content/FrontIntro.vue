<template>
  <div v-if="appName && appSlogan">
    <p class="logo_big">{{ appName }}</p>
    <p class="big">{{ appSlogan }}</p>
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
div{
  margin-bottom: $ga-around;
  p.logo_big{
    margin-bottom: 20px;
  }
  p.big{
    @include content();
  }
}
</style>