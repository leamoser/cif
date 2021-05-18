<template>
  <div class="backlink">
    <img src="/img/webicons/arrow.svg">
    <p class="code">
      <router-link v-if="linkURL" :to="linkURL">{{ linktext }}</router-link>
      <a v-else @click="$router.go(-1)">{{ linktext }}</a>
    </p>
  </div>
</template>
<script>
export default{
  name: 'Backlink',
  props: {
    linktext: {
      type: String,
      required: true
    },
    linkURL: {
      type: String,
      required: false
    }
  }
}
</script>
<style lang="scss" scoped>
  div{
    cursor: pointer;
    @include flex(row,center,flex-start)
  }
  p{
    a{
      text-decoration: none;
      color: $co-font;
    }
  }
  img{
    @include icon(180deg, $ic-m);
    margin-right: 10px;
  }
</style>