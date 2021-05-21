<template>
  <div class="intro" id="main" v-if="appName && title">
    <router-link to="/">
      <p class="logo_small">{{appName}}</p>
    </router-link>
    <p class="intro">{{title}}</p>
  </div>
</template>
<script>
export default{
  name: 'MainIntro',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    appName(){
      return this.$store.getters.getAppName || null
    }
  }
}
</script>
<style lang="scss" scoped>
  a{
    @include linkreset;
    @include basic_hover{
      color: $co-akzent-light;
    }
  }
  div{
    padding: $ga-around;
    padding-bottom: 0;
  }
</style>