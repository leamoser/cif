<template>
  <div class="intro" id="front">
    <div class="logo_big">{{ $store.state.appName }}</div>
    <p class="text_l">{{ $store.state.appSlogan }}</p>
  </div>
</template>
<script>
export default{
  name: 'FrontIntro'
}
</script>