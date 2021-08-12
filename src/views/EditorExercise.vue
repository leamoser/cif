<template>
  <MainIntro :title="title" />
  <Backlink linktext="Zurück&nbsp;zum&nbsp;Kapitel" />
  <div class="unit">
    <UnitEditorExercise v-if="editorexerciseID" unit-type="external" :exercise-i-d="editorexerciseID" />
    <div @click="markExerciseSolved">
      <button class="finalize_exercise"><p class="code small">Übung abschliessen</p></button>
    </div>
  </div>
</template>

<script>
import UnitEditorExercise from "../components/unit/UnitEditorExercise";
import Backlink from "../components/content/Backlink.vue";
import MainIntro from "../components/content/MainIntro.vue";
import axios from "axios";
export default {
  name: 'EditorExercise',
  components: {MainIntro, Backlink, UnitEditorExercise},
  computed:{
    title(){
      return 'Abschlussübung ' + this.$store.getters.getActiveChapterTitle || null
    },
    editorexerciseID(){
      return parseInt(this.$route.params.id) || null;
    },
    userID() {
      return this.$store.getters.getUserId || null;
    }
  },
  methods: {
    async markExerciseSolved() {
      const headers = {"Authorization": `Bearer ${this.$store.getters.getApiToken}`};
      const content = {
        user_id: this.userID,
        editor_exercise_id: this.editorexerciseID
      }
      await axios.post(`${this.$store.getters.getApiBaseUrl}user_editor_exercise`, content, {headers})
          .then(response => {
            this.$store.dispatch('getUserInformationByUsername', localStorage.getItem('username'));
          })
          .then(() => {
            this.$router.go(-1)
          })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>