<template>
  <h2>{{unitContent.title}}</h2>
  <div class="content gc" v-html="unitContent.theory"></div>
</template>
<script>
export default{
  name: 'UnitTheory',
  props: {
    unitContent: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
  h2{
    margin-bottom: $ga-top-s;
  }
</style>