<template>
  <div class="external_exercise">
    <h3>Abschlussübung</h3>
    <p>Externe Übung ID: {{exerciseID}}</p>
  </div>
</template>
<script>
export default{
  name: 'ChapterMaterialExternal',
  props:{
    exerciseID: {
      type: Number,
      required: true
    }
  }
}
</script>