<template>
  <div v-if="editorExercise" class="unit_editor_exercise">
    <h2 v-if="unitType === 'internal'">{{unitContent.title}}</h2>
    <h2 v-else>{{editorExercise.title}}</h2>
    <div v-if="unitContent?.theory && unitType === 'internal'" class="content gc" v-html="unitContent?.theory"></div>
    <div class="addon_leiste">
      <div v-if="hints" v-for="(hint, index) in hints" :key="index" class="hint" @click="showHint(hint)" :class="{'enabled':hintIndex===index }">
        <img src="/img/webicons/hint.svg" alt="Icon Hint" />
        <p class="code small">{{ index + 1 }}</p>
      </div>
      <div class="solution_toggle" @click="showSolution">
        <img src="/img/webicons/solution.svg" alt="Icon Lösung" />
      </div>
      <Solution v-if="solutionActive" :solution="solutions" :language="editorExercise.baselanguage" @close="closeSolution"/>
    </div>
    <Editor v-if="editorExercise" :editorExercise="editorExercise" />
  </div>
</template>
<script>
import axios from "axios";
import Editor from "./Editor";
import Solution from "./Solution";
export default{
  name: 'UnitEditorExercise',
  components: {Solution, Editor},
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
      editorExercise: null,
      hasHints: false,
      hintIndex: null,
      solutionActive: false
    }
  },
  computed: {
    hints(){
      return this.editorExercise.hints || null
    },
    solutions(){
      return this.editorExercise.code_end || null
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
          .then(() => {
            if(this.hints && this.hints?.length !== 0){
              this.hasHints = true
              this.hintIndex = 0
            }
          })
    },
    showHint(hint){
      alert(hint.hint_id.description);
      this.hintIndex += 1;
    },
    showSolution(){
      this.solutionActive = true
    },
    closeSolution(){
      this.solutionActive = false
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
div.unit_editor_exercise{
  h2{
    margin-bottom: $ga-inner;
  }
  div.content{
    margin-bottom: $ga-inner;
  }
  div.addon_leiste{
    position: absolute;
    width: calc( 100% - calc( #{$ga-around} * 2 ) );
    @include flex(row,center,flex-end);
    gap: 15px;
    div.hint,
    div.solution_toggle{
      z-index: 5;
      border: $bo-standard;
      background-color: $co-bg;
      margin-top: -30px;
      height: 60px;
      width: 60px;
      @include flex(row,center,center);
    }
    div.hint{
      pointer-events: none;
      img,p{
        opacity: 0.3;
      }
      &.enabled{
        cursor: pointer;
        pointer-events: all;
        img,p{
          opacity: 1;
        }
      }
      gap: 4px;
    }
    div.solution_toggle{
      cursor: pointer;
    }
  }
}
</style>