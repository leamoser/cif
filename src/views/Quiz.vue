<template>
  <MainIntro :title="'Abschlussquiz ' + $store.state.activeChapter.title" />
  <Backlink linktext="Zurück zum Kapitel" />
  <div class="unit">
    <h2>Quiz {{quizID}}</h2>
    <div>
      <pre>{{quiz}}</pre>
    </div>
  </div>
</template>

<script>
import Backlink from "../components/content/Backlink.vue";
import MainIntro from "../components/content/MainIntro.vue";
import axios from "axios";
export default {
  name: 'ExternalExercise',
  components: {MainIntro, Backlink},
  data(){
    return{
      quizID: this.$route.params.id,
      quiz: {}
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
    padding: $ga-top-l $ga-around;
    position: relative;
    border-top: $bo-standard;
    border-bottom: $bo-standard;
    min-height: 90vh;
    overflow: hidden;
  }
</style>
