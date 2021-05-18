<template>
  <router-link :to="editorexerciseUrl + exerciseID">
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
  data(){
    return{
      editorexerciseUrl: '/editorexercise/'
    }
  }
}
</script>