<template>
  <router-link v-if="quizID && url" :to="url">
    <div class="quiz">
      <h3>Abschlussquiz</h3>
      <p class="small">Stelle dein Wissen auf die Probe und absolviede das Abschlussquiz zum Kapitel.</p>
    </div>
    <MaterialBadge linktext="Zum Quiz" />
  </router-link>
</template>
<script>
import MaterialBadge from "./MaterialBadge";
export default{
  name: 'ChapterMaterialQuiz',
  components: {MaterialBadge},
  props:{
    quizID: {
      type: Number,
      required: true
    }
  },
  computed: {
    url(){
      return this.quizID ? '/quiz/' + this.quizID : null
    }
  }
}
</script>
<style lang="scss" scoped>
a{
  @include linkreset;
  @include shadow_hover;
  h3{
    padding-bottom: $ga-inner;
  }
}
</style>