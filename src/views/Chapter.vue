<template>
  <section class="mainsection chapter" id="chapter">
    <h1>{{chapter.title}}</h1>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: 'Chapter',
  data() {
    return {
      chapterID: this.$route.params.id,
      chapter: {}
    }
  },
  methods: {
    getChapterById(id) {
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      axios.get(`${this.$store.state.apiBaseUrl}chapter/${id}`, {headers})
          .then(response => {
            this.chapter = response.data.data
          })
    }
  },
  mounted() {
    this.getChapterById(this.chapterID);
  },
}
</script>