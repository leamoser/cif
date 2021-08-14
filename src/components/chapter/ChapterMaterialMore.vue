<template>
  <div class="box mat materialmore nohover">
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
<style lang="scss">
div.materialmore{
  a{
    @include basic_underline();
  }
}
</style>