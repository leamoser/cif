<template>
  <div class="backlink">
    <img src="/img/webicons/arrow.svg">
    <p class="code">
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
  div{
    cursor: pointer;
    @include flex(row,center,flex-start);
    margin: 15px $ga-around $ga-around $ga-around;
    p{
      a{
        @include linkreset;
      }
    }
    img{
      @include icon(180deg, $ic-m);
      margin-right: 10px;
    }
    @include basic_hover{
      transform: translateX(-10px);
    }
  }

</style>