<template>
  <div v-if="question" class="question_box">
    <div class="question" :class="{'evaluated': isCorrect !== undefined}">
      <h3>{{questionTitle}}</h3>
      <img v-if="imageLink" :src="imageLink" alt="Bild für Frage">
      <form v-if="answers" @submit.prevent="checkSolution">
        <Answer v-for="(answer,index) in answers" :key="index" :answer="answer" :question-slug="questionSlug" />
        <button><p class="code">Antwort prüfen</p></button>
      </form>
    </div>
    <div v-if="isCorrect !== undefined" class="explanation" :class="{'correct': isCorrect}">
      <h3>{{explanationIdentifier}}</h3>
      <p>{{questionExplanation}}</p>
    </div>
  </div>
</template>

<script>
import Answer from "./Answer";
export default{
  name: 'Question',
  components: {Answer},
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      isCorrect: undefined
    }
  },
  computed:{
    questionTitle(){
      return this.question.quiz_question_id.question
    },
    imageLink(){
      if(this.question.quiz_question_id.image){
        return this.$store.state.apiAssetUrl + this.question.quiz_question_id.image || null
      }else{
        return null
      }
    },
    questionExplanation(){
      return this.question.quiz_question_id.explanation || null
    },
    explanationIdentifier(){
      if(this.isCorrect){
        return 'korrekt'
      }else{
        return 'leider falsch'
      }
    },
    answers(){
      return this.question.quiz_question_id.answers || null
    },
    questionSlug(){
      let slug = this.$slugify.slugify(this.questionTitle);
      if (slug.length > 30) {
        return slug.substring(0, 29);
      }else{
        return slug
      }
    }
  },
  methods: {
    checkSolution(){
      let search = `input[name='${this.questionSlug}']:checked`
      let checkedElement = document.querySelectorAll(search);
      if(checkedElement.length === 1){
        this.isCorrect = !!checkedElement[0].dataset.correct;
      }else{
        alert('figg di gang weg');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  div.question_box{
    @include grid(2);
    &:not(:last-of-type){
      margin-bottom: $ga-inner;
    }
    img{
      max-width: 100%;
    }
    div.question{
      border: $bo-standard;
      padding: $ga-inner;
    }
    div.explanation{
      border: $bo-standard;
      padding: $ga-inner;
      border-radius: 500px;
      @include flex(column,center,center);
      text-align: center;
      background-color: $co-neg;
      &.correct{
        background-color: $co-pos;
      }
    }
  }
</style>