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
      axios.get(`${this.$store.state.apiBaseUrl}course_language/${id}?fields[]=language_id.*`, {headers})
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

<style>
span.language:not(span.language:last-of-type)::after{
  content: ', ';
}
</style>