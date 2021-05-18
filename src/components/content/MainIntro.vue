<template>
  <div class="intro" id="main">
    <router-link to="/">
      <p class="logo_small">{{ $store.state.appName }}</p>
    </router-link>
    <p class="intro">{{ title }}</p>
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
  }
}
</script>
<style lang="scss" scoped>
  a{
    @include linkreset;
  }
  div{
    padding: $ga-around;
    padding-bottom: 0;
  }
</style>