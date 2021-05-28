<template>
  <router-link v-if="exerciseID && url" :to="url">
    <div class="external_exercise">
      <h3>Abschlussübung</h3>
      <p class="small">Teste dein Wissen am Ende der Lektion.</p>
    </div>
    <MaterialBadge linktext="Zur Übung" />
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
    }
  }
}
</script>
<style lang="scss" scoped>
a{
  @include linkreset;
  @include shadow_hover;
  h3{
    padding-bottom: $ga-inner;
  }
}
</style>