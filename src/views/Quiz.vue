<template>
  <MainIntro :title="title"/>
  <div class="backlink_ct">
    <Backlink linktext="Zurück&nbsp;zum&nbsp;Kapitel"/>
  </div>
  <div class="unit" v-if="quiz">
    <h2 v-if="quizName">{{ quizName }}</h2>
    <Question v-if="quizQuestions" v-for="(question, index) in quizQuestions" :key="index" :question="question"
              :indexNr="index" @answer-given="newSolve"/>
    <div class="btn-dbl" @click="markQuizSolved" v-if="lengthSolvedQuestions === numberOfQuestions">
      <p class="code small">Quiz abschliessen</p>
      <img class="right" src="/img/webicons/finish.svg" alt="Icon Abschliessen"/>
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
      quiz: null,
      solvedQuestions: [],
      lengthSolvedQuestions: 0
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
      return this.$store.getters.getUserId || null
    },
    numberOfQuestions(){
      return this.quiz.questions.length || null
    }
  },
  methods: {
    async getQuiz(id) {
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const fields = '?fields=id,title,questions.quiz_question_id.question,questions.quiz_question_id.image,questions.quiz_question_id.explanation,questions.quiz_question_id.answers.quiz_question_answer_id.*'
      await axios.get(`${this.$store.getters.getApiBaseUrl}quiz/${id}${fields}`, {headers})
          .then(response => {
            this.quiz = response.data.data;
          })
    },
    async markQuizSolved() {
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
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
    },
    newSolve(index){
      this.solvedQuestions.push(index)
      let set = new Set(this.solvedQuestions)
      this.lengthSolvedQuestions = set.size
    }
  },
  mounted() {
    this.getQuiz(this.quizID)
  }
}
</script>
<style lang="scss" scoped>
div.backlink_ct {
  padding: 0 $ga-around;
  @include flex(row,flex-start,flex-start);
}
div.unit {
  position: relative;
  overflow: hidden;
  border-top: $bo-standard;
  border-bottom: $bo-standard;
  padding: $ga-around;
  margin-top: $ga-around;
  h2 {
    margin-bottom: $ga-around;
  }
  div.btn-dbl {
    position: absolute;
    right: -1px;
    bottom: -1px;
    @include flex(row, center, flex-start);
    img {
      @include btnicon(0, 10px, 7px);
    }
  }
}
</style>
