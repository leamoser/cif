<template>
  <MainIntro title="Abschlussübung" />
  <Backlink linktext="Zurück zum Kapitel" />
  <div class="unit">
    <UnitExternalExercise unit-type="external" :exercise-i-d="externalexerciseID" />
  </div>
</template>

<script>
import Backlink from "../components/content/Backlink.vue";
import MainIntro from "../components/content/MainIntro.vue";
import UnitExternalExercise from "../components/unit/UnitExternalExercise.vue";
export default {
  name: 'ExternalExercise',
  components: {UnitExternalExercise, MainIntro, Backlink},
  data(){
    return{
      externalexerciseID: this.$route.params.id
    }
  }
}
</script>
