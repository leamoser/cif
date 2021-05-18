<template>
  <div class="intro" id="front">
    <p class="logo_big">{{ $store.state.appName }}</p>
    <p class="intro">{{ $store.state.appSlogan }}</p>
  </div>
</template>
<script>
export default{
  name: 'FrontIntro'
}
</script>
<style lang="scss" scoped>
  div{
    padding: $ga-around;
  }
</style>