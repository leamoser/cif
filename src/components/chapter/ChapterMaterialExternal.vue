<template>
  <router-link :to="externalexerciseUrl + exerciseID">
    <div class="external_exercise">
      <h3>Abschlussübung</h3>
      <p>Externe Übung ID: {{exerciseID}}</p>
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