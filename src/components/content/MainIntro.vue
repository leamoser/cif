<template>
  <div class="intro" id="main">
    <div class="logo_small">{{ $store.state.appName }}</div>
    <h3 class="text_l">{{ title }}</h3>
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