<template>
  <div class="intro" id="main" v-if="appName && title">
    <p class="logo_small">
      <router-link to="/">{{appName}}</router-link>
    </p>
    <p class="big">{{title}}</p>
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
</style>