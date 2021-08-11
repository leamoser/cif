<template>
  <router-link v-if="exerciseID && url" :to="url">
    <div class="editor_exercise">
      <h3>Abschlussübung</h3>
      <p class="small">Teste dein Wissen am Ende der Lektion.</p>
    </div>
    <MaterialBadge :materialInfo="materialInfo" linktext="zur Übung" />
  </router-link>
</template>
<script>
import MaterialBadge from "./MaterialBadge";
export default{
  name: 'ChapterMaterialEditor',
  components: {MaterialBadge},
  props:{
    exerciseID: {
      type: Number,
      required: true
    }
  },
  computed: {
    url(){
      return this.exerciseID ? '/editorexercise/' + this.exerciseID : null
    },
    userID(){
      return this.$store.getters.getUserId || null;
    },
    materialInfo(){
      return {
        type: 'editor_exercise',
        table: 'user_editor_exercise',
        otherId: this.exerciseID,
        otherIdName: 'editor_exercise_id',
        userId: this.userID
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>