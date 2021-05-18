<template>
  <router-link :to="externalexerciseUrl + exerciseID">
    <div class="external_exercise">
      <h3>Abschlussübung</h3>
      <p class="small">Teste dein Wissen am Ende der Lektion.</p>
    </div>
  </router-link>
</template>
<script>
export default{
  name: 'ChapterMaterialExternal',
  props:{
    exerciseID: {
      type: Number,
      required: true
    }
  },
  data(){
    return{
      externalexerciseUrl: '/externalexercise/'
    }
  }
}
</script>
<style lang="scss" scoped>
a{
  @include linkreset;
  h3{
    padding-bottom: $ga-inner;
  }
}
</style>