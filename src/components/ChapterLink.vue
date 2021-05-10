<template>
  <div class="chapter_link">
    <mark>ChapterLink {{chapterID}}</mark>
  </div>
</template>


<script>
import axios from "axios";

export default{
  name: 'ChapterLink',
  data(){
    return{
      chapter: {}
    }
  },
  props: {
    chapterID: {
      type: Number,
      required: true
    }
  },
  methods: {
    getChapterById(id){
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      axios.get(`${this.$store.state.apiBaseUrl}chapter/${id}`, {headers})
          .then(response => {
            this.chapterName = response.data.data
          })
    }
  },
  mounted() {
    this.getChapterById(this.chapterID);
  }
}
</script>