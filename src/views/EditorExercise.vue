<template>
  <MainIntro :title="title" />
  <div class="backlink_ct">
    <Backlink linktext="Zurück&nbsp;zum&nbsp;Kapitel" />
  </div>
  <div class="unit">
    <UnitEditorExercise v-if="editorexerciseID" unit-type="external" :exercise-i-d="editorexerciseID" />
    <div class="btn-dbl" @click="markExerciseSolved">
      <p class="code small">Übung abschliessen</p>
      <img class="right" src="/img/webicons/finish.svg" alt="Icon Abschliessen"/>
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
div.backlink_ct {
  padding: 0 $ga-around;
}
div.unit {
  position: relative;
  overflow: hidden;
  border-top: $bo-standard;
  border-bottom: $bo-standard;
  padding: $ga-around;
  margin-top: $ga-around;
  min-height: 70vh;
  h2 {
    margin-bottom: $ga-around;
  }
  div.btn-dbl {
    position: absolute;
    right: -1px;
    bottom: -1px;
    @include flex(row, center, flex-start);
    img {
      @include btnicon(0, 10px, 7px);
    }
  }
}
</style>