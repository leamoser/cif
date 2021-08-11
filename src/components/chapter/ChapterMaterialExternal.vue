<template>
  <router-link v-if="exerciseID && url" :to="url">
    <div class="external_exercise">
      <h3>Abschlussübung</h3>
      <p class="small">Teste dein Wissen am Ende der Lektion.</p>
    </div>
    <MaterialBadge :materialInfo="materialInfo" linktext="Zur Übung" />
  </router-link>
</template>
<script>
import MaterialBadge from "./MaterialBadge";
export default{
  name: 'ChapterMaterialExternal',
  components: {MaterialBadge},
  props:{
    exerciseID: {
      type: Number,
      required: true
    }
  },
  computed: {
    url(){
      return this.exerciseID ? '/externalexercise/' + this.exerciseID : null
    },
    userID(){
      return this.$store.getters.getUserId || null;
    },
    materialInfo(){
      return {
        type: 'external_exercise',
        table: 'user_external_exercise',
        otherId: this.exerciseID,
        otherIdName: 'external_exercise_id',
        userId: this.userID
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>