<template>
  <div class="btn-dbl">
    <img class="left" src="/img/webicons/go_dark.svg">
    <p class="code small">
      <router-link v-if="linkURL" :to="linkURL">{{ linktext }}</router-link>
      <a v-else @click="backlink">{{ linktext }}</a>
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
  },
  computed: {
    backlink(){
      return this.$router.go(-1) || null
    }
  }
}
</script>
<style lang="scss" scoped>
div.btn-dbl{
  img{
    @include btnicon(180deg,14px,7px);
  }
  a{
    @include linkreset();
  }
}
</style>