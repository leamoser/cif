<template>
  <MainIntro :title="title" />
  <Backlink linktext="Zurück&nbsp;zum&nbsp;Kapitel" />
  <div class="unit">
    <UnitExternalExercise v-if="externalexerciseID" unit-type="external" :exercise-i-d="externalexerciseID" />
    <div @click="markExerciseSolved">
      <button class="finalize_exercise"><p class="code small">Übung abschliessen</p></button>
    </div>
  </div>
</template>

<script>
import Backlink from "../components/content/Backlink.vue";
import MainIntro from "../components/content/MainIntro.vue";
import UnitExternalExercise from "../components/unit/UnitExternalExercise.vue";
import axios from "axios";
export default {
  name: 'ExternalExercise',
  components: {UnitExternalExercise, MainIntro, Backlink},
  computed:{
    title(){
      return 'Abschlussübung ' + this.$store.getters.getActiveChapterTitle || null
    },
    externalexerciseID(){
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
        external_exercise_id: this.externalexerciseID
      }
      await axios.post(`${this.$store.getters.getApiBaseUrl}user_external_exercise`, content, {headers})
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