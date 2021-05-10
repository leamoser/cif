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
    chapterComboID: {
      type: Number,
      required: true
    }
  },
  methods: {
    getChapterByComboId(id){
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      axios.get(`${this.$store.state.apiBaseUrl}course_chapter_1/${id}?fields[]=chapter_id.title,chapter_id.id,chapter_id.status`, {headers})
          .then(response => {
            this.chapter = response.data.data.chapter_id
          })
    }
  },
  mounted() {
    this.getChapterByComboId(this.chapterComboID);
  }
}
</script>