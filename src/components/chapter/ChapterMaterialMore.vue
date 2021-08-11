<template>
  <div class="more_infos">
    <h3>Zusätzliche Infos</h3>
    <div class="content-small gc" v-html="content">
    </div>
  </div>

</template>
<script>
export default{
  name: 'ChapterMaterialMore',
  props:{
    content: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>