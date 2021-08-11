<template>
  <div v-if="externalExercise" class="unit_external_exercise">
    <h2 v-if="unitType === 'internal'">{{unitContent?.title}}</h2>
    <h2 v-else>{{externalExercise.title}}</h2>
    <div v-if="unitContent?.theory" class="content gc" v-html="unitContent?.theory"></div>
    <h3>Übungsanleitung</h3>
    <div class="content gc" v-html="externalExercise?.instructions"></div>
    <DownloadExternalExercise :title="externalExercise?.title" :download="download" />
  </div>
</template>
<script>
import axios from "axios";
import DownloadExternalExercise from "./DownloadExternalExercise";
export default{
  name: 'UnitExternalExercise',
  components: {DownloadExternalExercise},
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
      externalExercise: null
    }
  },
  computed: {
    download(){
      return {
        file: this.externalExercise?.download,
        url: this.externalExercise?.download_url
      } || null
    }
  },
  methods: {
    getExternalExerciseById(id){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const fields = 'fields[]=id,download,instructions,title,download_url'
      axios.get(`${this.$store.getters.getApiBaseUrl}external_exercise/${id}?${fields}`, {headers})
          .then(response => {
            this.externalExercise = response.data.data
          })
    }
  },
  mounted() {
    if(this.unitType === 'internal'){
      this.getExternalExerciseById(this.unitContent.external_exercise)
    }else{
      this.getExternalExerciseById(this.exerciseID)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>