<template>

<div class="solution">
  <h2>Lösungen</h2>
  <div id="editor_solution">{{solution}}</div>
  <button class="btn code small" @click="closeSolution">Schliessen</button>
</div>
</template>

<script>
import ace from 'ace-builds';
ace.config.set(
    "basePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/")
export default {
  name: "Solution",
  emits: ['close'],
  props: {
    solution: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    }
  },
  methods: {
    initEditor() {
      this.editor = ace.edit('editor_solution')
      this.editor.setTheme('ace/theme/nord_dark')
      this.editor.session.setMode(`ace/mode/${this.language}`)
      this.editor.session.setUseWrapMode(true)
      this.editor.setReadOnly(true);
    },
    closeSolution(){
      this.$emit('close');
    }
  },
  mounted() {
    this.initEditor();
  }
}
</script>

<style lang="scss" scoped>
div.solution{
  position: fixed;
  z-index: 25;
  width: 60%;
  height: 100%;
  top: 0;
  right: 0;
  border-left: $bo-standard;
  padding: $ga-inner;
  @include flex(column,flex-start,center);
  gap: $ga-inner;
  background-color: $co-bg;
  div#editor_solution{
    margin-bottom: $ga-around 0;
    height: 400px;
    width: 100%;
    font: $f-code-s;
  }
}
</style>