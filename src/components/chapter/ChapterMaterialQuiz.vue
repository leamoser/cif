<template>
  <router-link :to="quizUrl + quizID">
    <div class="quiz">
      <h3>Abschlussquiz</h3>
      <p class="small">Quiz ID: {{quizID}}</p>
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