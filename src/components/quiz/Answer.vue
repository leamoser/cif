<template>
  <div v-if="answer" class="answer">
    <input type="radio" :id="answerSlug" :name="questionSlug" :value="answerSlug" :data-correct="isCorrect" :data-index="indexNr">
    <label :for="answerSlug" :data-correct="isCorrect">{{questionAnswer}}</label>
  </div>
</template>
<script>
export default{
  name: 'Answer',
  props: {
    answer: {
      type: Object,
      required: true
    },
    questionSlug: {
      type: String,
      required: true
    },
    indexNr: {
      type: Number,
      required: true
    }
  },
  computed: {
    questionAnswer(){
      return this.answer.quiz_question_answer_id.answer || null
    },
    answerSlug(){
      return this.$slugify.slugify(this.questionAnswer) + `_${this.indexNr}` || null
    },
    isCorrect(){
      return this.answer.quiz_question_answer_id.is_correct || null
    }
  }
}
</script>
<style lang="scss" scoped>
div.answer{
  margin-bottom: 7px;
  &:last-of-type{
    margin-bottom: $ga-inner;
  }
  label{
    margin-left: 4px;
  }
}
</style>