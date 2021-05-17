<template>
  <div v-if="editorExercise" class="unit_editor_exercise">
    <h2 v-if="unitType === 'internal'">{{unitContent.title}}</h2>
    <h2 v-else>{{editorExercise.title}}</h2>
    <div v-if="unitContent?.theory || unitType === 'internal'" class="content unit_theory" v-html="unitContent?.theory"></div>
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
      required: false
    },
    exerciseID: {
      type: Number,
      required: false
    },
    unitType: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      editorExercise: null
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
    if(this.unitType === 'internal'){
      this.getEditorExerciseById(this.unitContent.editor_exercise)
    }else{
      this.getEditorExerciseById(this.exerciseID)
    }
  }
}
</script>