<template>
  <div @click="scrollDown">
    <p class="code small">{{ title }}</p>
    <img alt="Arrow Down" src="/img/webicons/go_dark.svg" />
  </div>

</template>

<script>
export default {
  name: "ScrollInfo",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    scrollDown(){
      window.scrollBy(0,700);
    }
  }
}
</script>

<style lang="scss" scoped>
div{
  position: absolute;
  bottom: 0;
  width: 100%;
  @include flex(column,center,center);
  p{
    cursor: pointer;
  }
  img{
    cursor: pointer;
    margin-top: 5px;
    margin-bottom: -9px;
    @include icon(90deg,20px);
  }
}
</style>