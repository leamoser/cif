<template>
  <router-link :to="quizUrl + quizID">
    <div class="quiz">
      <h3>Abschlussquiz</h3>
      <p class="small">Stelle dein Wissen auf die Probe und absolviede das Abschlussquiz zum Kapitel.</p>
    </div>
  </router-link>
</template>
<script>
export default{
  name: 'ChapterMaterialQuiz',
  props:{
    quizID: {
      type: Number,
      required: true
    }
  },
  data(){
    return{
      quizUrl: '/quiz/'
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