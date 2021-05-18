<template>
  <MainIntro :title="title" />
  <Backlink linktext="Zurück zum Kapitel" />
  <div class="unit" v-if="quiz">
    <h2>{{quiz.quiz_name}}</h2>
    <Question v-for="(question, index) in quiz.questions" :key="index" :question="question" />
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
      return 'Abschlussquiz ' + this.$store.state.activeChapter.title || null
    }
  },
  methods: {
    getQuiz(id){
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      const fields = '?fields=id, quiz_name,questions.quiz_question_id.question,questions.quiz_question_id.image,questions.quiz_question_id.explanation,questions.quiz_question_id.answers.quiz_question_answer_id.*'
      axios.get(`${this.$store.state.apiBaseUrl}quiz/${id}${fields}`, {headers})
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
