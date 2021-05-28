<template>
  <div class="badge_leiste">
    <div class="more">
      <p class="code small">{{linktext}}</p>
      <img src="/img/webicons/go_light.svg" alt="Icon Weiter" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MaterialBadge',
  props: {
    linktext: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
div.badge_leiste{
  position: absolute;
  bottom: $ga-inner;
  right: $ga-inner;
  padding-top: $ga-inner;
  @include flex(row,center,flex-end);
  div.more{
    @include flex(row,center,flex-end);
    img{
      transition: 0.5s;
      margin-left: 15px;
    }
  }
  @include basic_hover{
    div.more img{
      margin-left: 5px;
    }
  }
}
</style>