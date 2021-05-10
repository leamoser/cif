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
    languageID: {
      type: Number,
      required: true
    }
  },
  methods: {
    getLanguageById(id) {
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      axios.get(`${this.$store.state.apiBaseUrl}languages/${id}`, {headers})
          .then(response => {
            this.languageName = response.data.data.language_name
          })
    }
  },
  mounted() {
      this.getLanguageById(this.languageID);
  }
}
</script>

<style>
span.language:not(span.language:last-of-type)::after{
  content: ', ';
}
</style>