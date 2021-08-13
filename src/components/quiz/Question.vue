<template>
  <div v-if="question" class="question_box">
    <div class="question" :class="{'evaluated': isCorrect !== undefined}">
      <h3>{{ indexNr + 1 }}. {{questionTitle}}</h3>
      <img v-if="imageLink" :src="imageLink" alt="Bild für Frage">
      <form v-if="answers" @submit.prevent="checkSolution">
        <Answer v-for="(answer,index) in answers" :key="index" :answer="answer" :question-slug="questionSlug" :indexNr="indexNr" />
        <button class="btn code small">Antwort prüfen</button>
      </form>
    </div>
    <div v-if="isCorrect !== undefined" class="explanation" :class="{'correct': isCorrect}">
      <h3>{{explanationIdentifier}}</h3>
      <p>{{questionExplanation}}</p>
    </div>
  </div>
  <Error v-if="errorActive" :error_message="errorMessage" @remove="removeError" />
</template>
<script>
import Answer from "./Answer";
import Error from "../content/Error";
export default{
  name: 'Question',
  components: {Error, Answer},
  emits: ['answerGiven'],
  props: {
    question: {
      type: Object,
      required: true
    },
    indexNr: {
      type: Number,
      required: true
    }
  },
  data(){
    return{
      isCorrect: undefined,
      errorActive: false,
      errorMessage: 'Bitte gib eine Antwortoption ein.'
    }
  },
  computed:{
    questionTitle(){
      return this.question.quiz_question_id.question || null
    },
    imageLink(){
      if(this.question.quiz_question_id.image){
        return this.$store.getters.getApiAssetUrl + this.question.quiz_question_id.image || null
      }else{
        return null
      }
    },
    questionExplanation(){
      return this.question.quiz_question_id.explanation || null
    },
    explanationIdentifier(){
      if(this.isCorrect){
        return 'Korrekt!'
      }else{
        return 'Leider falsch.'
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
      let checkedElement = document.querySelectorAll(search)
      if(checkedElement.length === 1){
        let index = checkedElement[0].dataset.index
        this.isCorrect = !!checkedElement[0].dataset.correct
        this.$emit('answerGiven', index)
      }else{
        this.errorActive = true
        this.$injection.disableScrolling();
      }
    },
    removeError(){
      this.errorActive = false
      this.$injection.enableScrolling();
    }
  }
}
</script>
<style lang="scss" scoped>
div.question_box{
  img{
    width: 100%;
  }
  @include grid(2);
  margin-bottom: $ga-around;
  div.question{
    border: $bo-standard;
    padding: $ga-inner;
    h3{
      margin-bottom: $ga-inner;
    }
    img{
      background-color: $co-font;
      max-height: 400px;
      object-fit: contain;
      margin-bottom: $ga-inner;
    }
  }
  div.explanation{
    @include flex(column,flex-start,center);
    border: $bo-standard;
    padding: $ga-inner;
    background-color: $co-neg;
    &.correct{
      background-color: $co-pos;
    }
  }
}
</style>