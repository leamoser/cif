<template>
  <div class="unit_external_exercise">
    <h2>{{unitContent.title}}</h2>
    <div v-if="unitContent.theory" class="content unit_theory" v-html="unitContent.theory"></div>
    <div class="content" v-html="externalExercise.instructions"></div>
    <div class="download">
      <p>{{externalExercise.title}}</p>
      <a class="download_btn" v-if="externalExercise.download" :href="$store.state.apiAssetUrl + externalExercise.download" target="_blank" download>
        <button>
          <span>Download</span><span>-></span>
        </button>
      </a>
      <a class="download_btn" v-else :href="externalExercise.download_url" target="_blank" download>
        <button>
          <span>Download</span><span>-></span>
        </button>
      </a>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default{
  name: 'UnitExternalExercise',
  props: {
    unitContent: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      externalExercise: {}
    }
  },
  methods: {
    getExternalExerciseById(id){
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      const fields = '?fields[]=id,download,instructions,title,download_url'
      axios.get(`${this.$store.state.apiBaseUrl}external_exercise/${id}${fields}`, {headers})
          .then(response => {
            //console.log(response)
            this.externalExercise = response.data.data
          })
    }
  },
  mounted() {
    this.getExternalExerciseById(this.unitContent.external_exercise)
  }
}
</script>