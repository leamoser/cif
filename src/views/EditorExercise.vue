<template>
  <MainIntro :title="title" />
  <Backlink linktext="Zurück zum Kapitel" />
  <div class="unit">
    <UnitEditorExercise v-if="editorexerciseID" unit-type="external" :exercise-i-d="editorexerciseID" />
  </div>
</template>

<script>
import UnitEditorExercise from "../components/unit/UnitEditorExercise";
import Backlink from "../components/content/Backlink.vue";
import MainIntro from "../components/content/MainIntro.vue";
export default {
  name: 'EditorExercise',
  components: {MainIntro, Backlink, UnitEditorExercise},
  computed:{
    title(){
      return 'Abschlussübung ' + this.$store.getters.getActiveChapterTitle || null
    },
    editorexerciseID(){
      return parseInt(this.$route.params.id) || null;
    }
  }
}
</script>
<style lang="scss" scoped>
div.unit{
  padding: $ga-top-l $ga-around;
  position: relative;
  border-top: $bo-standard;
  border-bottom: $bo-standard;
  min-height: 90vh;
  overflow: hidden;
}
</style>