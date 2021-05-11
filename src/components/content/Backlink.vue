<template>
  <p class="backlink"><a @click="$router.go(-1)">{{ linktext }}</a></p>
</template>
<script>
export default{
  name: 'Backlink',
  props: {
    linktext: {
      type: String,
      required: true
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