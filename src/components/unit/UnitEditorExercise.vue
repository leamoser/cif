<template>
  <div class="unit_editor_exercise">
    <h2>{{unitContent.title}}</h2>
    <div v-if="unitContent.theory" class="content unit_theory" v-html="unitContent.theory"></div>
    <div class="editor" id="editor"><pre>{{editorExercise.code_start}}</pre></div>
  </div>
</template>
<script>
import axios from "axios";

export default{
  name: 'UnitEditorExercise',
  props: {
    unitContent: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      editorExercise: {}
    }
  },
  methods: {
    getEditorExerciseById(id){
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      const fields = '?fields[]=id,title,code_start,code_end,hints'
      axios.get(`${this.$store.state.apiBaseUrl}editor_exercise/${id}${fields}`, {headers})
          .then(response => {
            this.editorExercise = response.data.data
          })
    }
  },
  mounted() {
    this.getEditorExerciseById(this.unitContent.editor_exercise)
  }
}
</script>