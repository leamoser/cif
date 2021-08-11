<template>
  <div v-if="appName && title">
    <router-link to="/"><p class="logo_small">{{ appName }}</p></router-link>
    <p class="big">{{ title }}</p>
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
  div{
    padding: $ga-around;
    a{
      @include linkreset();
    }
  }
</style>