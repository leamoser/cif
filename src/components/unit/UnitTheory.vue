<template>
  <h2 v-if="unitContent">{{unitContent.title}}</h2>
  <div v-if="unitContent" class="content gc" v-html="unitContent.theory"></div>
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
</style>