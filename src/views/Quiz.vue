<template>
  <MainIntro :title="title"/>
  <Backlink linktext="Zurück zum Kapitel"/>
  <div class="unit" v-if="quiz">
    <h2 v-if="quizName">{{ quizName }}</h2>
    <Question v-if="quizQuestions" v-for="(question, index) in quizQuestions" :key="index" :question="question"/>
    <div @click="markQuizSolved">
      <button class="finalize_quiz"><p class="code small">Quiz abschliessen</p></button>
    </div>
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
  data() {
    return {
      quizID: this.$route.params.id,
      quiz: null
    }
  },
  computed: {
    title() {
      return 'Abschlussquiz ' + this.$store.getters.getActiveChapterTitle || null
    },
    quizName() {
      return this.quiz.title || null
    },
    quizQuestions() {
      return this.quiz.questions || null
    },
    userID() {
      return this.$store.getters.getUserId || null;
    },
  },
  methods: {
    async getQuiz(id) {
      const headers = {"Authorization": `Bearer ${this.$store.getters.getApiToken}`};
      const fields = '?fields=id,title,questions.quiz_question_id.question,questions.quiz_question_id.image,questions.quiz_question_id.explanation,questions.quiz_question_id.answers.quiz_question_answer_id.*'
      await axios.get(`${this.$store.getters.getApiBaseUrl}quiz/${id}${fields}`, {headers})
          .then(response => {
            this.quiz = response.data.data;
          })
    },
    async markQuizSolved() {
      const headers = {"Authorization": `Bearer ${this.$store.getters.getApiToken}`};
      const content = {
        user_id: this.userID,
        quiz_id: this.quizID
      }
      await axios.post(`${this.$store.getters.getApiBaseUrl}user_quiz`, content, {headers})
          .then(response => {
            this.$store.dispatch('getUserInformationByUsername', localStorage.getItem('username'));
          })
          .then(() => {
            this.$router.go(-1)
          })
    }
  },
  mounted() {
    this.getQuiz(this.quizID)
  }
}
</script>

<style lang="scss" scoped>
</style>
