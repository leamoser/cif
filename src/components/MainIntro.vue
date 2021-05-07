<template>
  <div class="intro" id="main">
    <div class="logo_small">{{ $store.state.appName }}</div>
    <p class="text_l">{{ title }}</p>
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