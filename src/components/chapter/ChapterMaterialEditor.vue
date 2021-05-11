<template>
  <div class="editor_exercise">
    <p>Editor-Übung ID: {{exerciseID}}</p>
  </div>
</template>
<script>
export default{
  name: 'ChapterMaterialEditor',
  props:{
    exerciseID: {
      type: Number,
      required: true
    }
  }
}
</script>