<template>
  <router-link v-if="exerciseID && url" :to="url">
    <div class="editor_exercise">
      <h3>Abschlussübung</h3>
      <p class="small">Teste dein Wissen am Ende der Lektion.</p>
    </div>
  </router-link>
</template>
<script>
export default{
  name: 'ChapterMaterialEditor',
  props:{
    exerciseID: {
      type: Number,
      required: true
    }
  },
  computed: {
    url(){
      return this.exerciseID ? '/editorexercise/' + this.exerciseID : null
    }
  }
}
</script>
<style lang="scss" scoped>
a{
  @include linkreset;
  h3{
    padding-bottom: $ga-inner;
  }
}
</style>