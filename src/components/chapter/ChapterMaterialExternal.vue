<template>
  <div class="external_exercise">
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