<template>
  <span v-if="languageName" class="language">{{languageName}}</span>
</template>

<script>
import axios from "axios";
export default {
  name: 'LanguageBox',
  data(){
    return{
      languageName: null
    }
  },
  props: {
    languageComboID: {
      type: Number,
      required: true
    }
  },
  methods: {
    async getLanguageByComboId(id) {
      const headers = { "Authorization": `Bearer ${process.env.VUE_APP_API_TOKEN}` }
      const fields = 'fields[]=language_id.*'
      await axios.get(`${this.$store.getters.getApiBaseUrl}course_language/${id}?${fields}`, {headers})
          .then(response => {
            this.languageName = response.data.data.language_id.name
          })
    }
  },
  mounted() {
      this.getLanguageByComboId(this.languageComboID);
  }
}
</script>

<style lang="scss" scoped>
span:not(.language:last-of-type){
  &.language::after{
    content: ', ';
  }
}
</style>