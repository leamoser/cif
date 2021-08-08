<template>
  <div v-if="editorExercise" class="unit_editor_exercise">
    <h2 v-if="unitType === 'internal'">{{unitContent.title}}</h2>
    <h2 v-else>{{editorExercise.title}}</h2>
    <div v-if="unitContent?.theory || unitType === 'internal'" class="content gc" v-html="unitContent?.theory"></div>
    <Editor v-if="editorExercise" :editorExercise="editorExercise" />
  </div>
</template>
<script>
import axios from "axios";
import Editor from "./Editor";
export default{
  name: 'UnitEditorExercise',
  components: {Editor},
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
    async getEditorExerciseById(id){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const fields = 'fields[]=id,title,code_start,code_end,hints.hint_id.description,baselanguage,output'
      await axios.get(`${this.$store.getters.getApiBaseUrl}editor_exercise/${id}?${fields}`, {headers})
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
<style lang="scss" scoped>
h2{
  margin-bottom: $ga-top-s;
}
</style>