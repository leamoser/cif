<template>
  <p class="backlink">
    <router-link v-if="linkURL" :to="linkURL">{{ linktext }}</router-link>
    <a v-else @click="$router.go(-1)">{{ linktext }}</a>
  </p>
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
<style>
  p.backlink:hover{
    cursor: pointer;
  }
  p.backlink::before{
    content: '<-';
  }
</style>