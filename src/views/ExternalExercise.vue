<template>
  <MainIntro :title="title" />
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
  },
  computed:{
    title(){
      return 'Abschlussübung ' + this.$store.state.activeChapter.title || null
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