<template>
  <div class="quiz">
    <h3>Abschlussquiz</h3>
    <p>Quiz ID: {{quizID}}</p>
  </div>
</template>
<script>
export default{
  name: 'ChapterMaterialQuiz',
  props:{
    quizID: {
      type: Number,
      required: true
    }
  }
}
</script>