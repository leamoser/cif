<template>
  <router-link v-if="course" :to="courseLink">
    <div class="course_box">
      <h3 class="title">{{ course.title }}</h3>
      <Infobar :languages="course.languages" :chapter-count="chapterCount" />
      <div class="content-small gc" v-html="course.description"></div>
      <CourseBadge v-if="chapterDetailsLoaded" :chapter-details="chapterDetails" />
    </div>
  </router-link>
</template>
<script>
import Infobar from "./Infobar.vue";
import axios from "axios";
import CourseBadge from "./CourseBadge";
export default{
  name: 'courseBox',
  components: {
    CourseBadge,
    Infobar
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      courseUrl: '/course/',
      solvedChapters: null,
      solvedChapterCount: null
    }
  },
  computed: {
    courseLink(){
      return this.course.id ? this.courseUrl + this.course.id : null
    },
    chapterIDs(){
      let allChapters = [];
      this.course.chapter.forEach(details => {
        if(details?.chapter_id?.status === 'published') {
          allChapters.push(details.chapter_id.id)
        }
      })
      return allChapters
    },
    chapterCount(){
      return this.chapterIDs.length || null
    },
    chapterDetails(){
      return {
        solvedChapters: this.solvedChapters,
        solvedChapterCount: this.solvedChapterCount,
        chapterCount: this.chapterCount,
        chapterIDs: this.chapterIDs
      }
    },
    chapterDetailsLoaded(){
      let states = [];
      Object.values(this.chapterDetails).forEach(val => {
        states.push(val);
      })
      if(states.includes(null)){
        return false
      }else{
        return true
      }
    }
  },
  methods: {
    async getFinishedChapters(){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const filter_user = `filter[user_id][_eq]=${this.$store.getters.getUserId}`;
      const filter_chapter = `filter[chapter_id][_in]=${this.chapterIDs.toString()}`
      const fields = `fields=chapter_id`;
      await axios.get(`${this.$store.getters.getApiBaseUrl}user_chapter?${filter_user}&${filter_chapter}&${fields}`, {headers})
          .then(response => {
            if(response.data.data.length === 0){
              this.solvedChapters = []
              this.solvedChapterCount = 0
            }else{
              this.solvedChapters = response.data.data
              this.solvedChapterCount = response.data.data.length
            }
          })
    }
  },
  mounted() {
    this.getFinishedChapters();
  }
}
</script>
<style lang="scss" scoped>
  a{
    @include linkreset;
  }
  div.course_box{
    background-color: $co-font;
    height: auto;
    padding: $ga-inner;
    color: $co-bg;
  }
</style>