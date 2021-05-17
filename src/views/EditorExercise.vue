<template>
  <MainIntro title="Abschlussübung" />
  <Backlink linktext="Zurück zum Kapitel" />
  <div class="unit">
    <UnitEditorExercise unit-type="external" :exercise-i-d="editorexerciseID" />
  </div>
</template>

<script>
import UnitEditorExercise from "../components/unit/UnitEditorExercise";
import Backlink from "../components/content/Backlink.vue";
import MainIntro from "../components/content/MainIntro.vue";
export default {
  name: 'EditorExercise',
  components: {MainIntro, Backlink, UnitEditorExercise},
  data(){
    return{
      editorexerciseID: this.$route.params.id
    }
  }
}
</script>
