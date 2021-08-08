<template>
  <mark>EDITOR</mark>
</template>

<script>
export default {
  name: "Editor",
  data(){
    return{
      codeEdited: null,
      toggle: null,
    }
  },
  props: {
    editorExercise: {
      type: Object,
      required: true
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style scoped>

</style>