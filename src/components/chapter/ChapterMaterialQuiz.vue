<template>
  <div class="quiz">
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