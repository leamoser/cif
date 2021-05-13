<template>
  <div class="unit_editor_exercise">
    {{unitContent}}
  </div>
</template>
<script>
export default{
  name: 'UnitEditorExercise',
  props: {
    unitContent: {
      type: Object,
      required: true
    }
  }
}
</script>