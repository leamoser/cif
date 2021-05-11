<template>
  <router-link :to="chapterURL + chapter.id">
    <div class="chapter_link">
      <p>{{chapter.title}}</p>
    </div>
  </router-link>
</template>


<script>
import axios from "axios";

export default{
  name: 'ChapterLink',
  data(){
    return{
      chapter: {},
      chapterURL: '/chapter/'
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
      const filter = '?fields=id,title,more_infos,niveau,editor_exercise,external_exercise,quiz,downloads,units'
      axios.get(`${this.$store.state.apiBaseUrl}chapter/${id}${filter}`, {headers})
          .then(response => {
            this.chapter = response.data.data
          })
    }
  },
  mounted() {
    this.getChapterById(this.chapterID);
  }
}
</script>