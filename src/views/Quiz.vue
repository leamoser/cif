<template>
  <MainIntro :title="title" />
  <Backlink linktext="Zurück zum Kapitel" />
  <div class="unit" v-if="quiz">
    <h2 v-if="quizName">{{quizName}}</h2>
    <Question v-if="quizQuestions" v-for="(question, index) in quizQuestions" :key="index" :question="question" />
  </div>
</template>

<script>
import Backlink from "../components/content/Backlink.vue";
import MainIntro from "../components/content/MainIntro.vue";
import axios from "axios";
import Question from "../components/quiz/Question";
export default {
  name: 'Quiz',
  components: {Question, MainIntro, Backlink},
  data(){
    return{
      quizID: this.$route.params.id,
      quiz: null
    }
  },
  computed: {
    title(){
      return 'Abschlussquiz ' + this.$store.getters.getActiveChapterTitle || null
    },
    quizName(){
      return this.quiz.quiz_name || null
    },
    quizQuestions(){
      return this.quiz.questions || null
    }
  },
  methods: {
    async getQuiz(id){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const fields = '?fields=id, quiz_name,questions.quiz_question_id.question,questions.quiz_question_id.image,questions.quiz_question_id.explanation,questions.quiz_question_id.answers.quiz_question_answer_id.*'
      await axios.get(`${this.$store.getters.getApiBaseUrl}quiz/${id}${fields}`, {headers})
          .then(response => {
            this.quiz = response.data.data;
          })
    }
  },
  mounted() {
    this.getQuiz(this.quizID)
  }
}
</script>

<style lang="scss" scoped>
  div.unit{
    h2{
      margin-bottom: $ga-top-s;
    }
    padding: $ga-top-l $ga-around;
    position: relative;
    border-top: $bo-standard;
    border-bottom: $bo-standard;
    min-height: 90vh;
    overflow: hidden;
  }
</style>
