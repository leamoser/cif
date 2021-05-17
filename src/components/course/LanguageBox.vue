<template>
  <span class="language">{{ languageName }}</span>
</template>

<script>
import axios from "axios";
export default {
  name: 'LanguageBox',
  data(){
    return{
      languageName: '...'
    }
  },
  props: {
    languageComboID: {
      type: Number,
      required: true
    }
  },
  methods: {
    getLanguageByComboId(id) {
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      const fields = '?fields[]=language_id.*'
      axios.get(`${this.$store.state.apiBaseUrl}course_language/${id}${fields}`, {headers})
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