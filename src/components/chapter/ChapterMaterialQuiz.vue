<template>
  <router-link v-if="quizID && url" :to="url">
    <div class="box mat">
      <div class="quiz">
        <h3>Abschlussquiz</h3>
        <p class="small">Stelle dein Wissen auf die Probe und absolviede das Abschlussquiz zum Kapitel.</p>
      </div>
      <MaterialBadge :materialInfo="materialInfo" linktext="Zum Quiz"/>
    </div>
  </router-link>
</template>
<script>
import MaterialBadge from "./MaterialBadge";
export default{
  name: 'ChapterMaterialQuiz',
  components: {MaterialBadge},
  props:{
    quizID: {
      type: Number,
      required: true
    }
  },
  computed: {
    url(){
      return this.quizID ? '/quiz/' + this.quizID : null
    },
    userID(){
      return this.$store.getters.getUserId || null;
    },
    materialInfo(){
      return {
        type: 'quiz',
        table: 'user_quiz',
        otherId: this.quizID,
        otherIdName: 'quiz_id',
        userId: this.userID
      }
    }
  }
}
</script>
<style lang="scss" scoped>
a{
  @include linkreset();
  div.box{
    @include flex(column,flex-start,space-between);
  }
}
</style>