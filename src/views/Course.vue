<template>
  <section class="mainsection course" id="course">
    <MainIntro :title="course.title"/>
    <Infobar :course-i-d="course.id" :languages="course.languages" :chapter-count="allPublishedChapters.length" />
    <div class="content_description" v-html="course.description"></div>
    <TitleDesc :title="chapterTitle" />
    <ChapterList :chapters="allPublishedChapters" />
  </section>
</template>

<script>
import axios from "axios"
import MainIntro from "../components/content/MainIntro.vue"
import Infobar from "../components/course/Infobar.vue"
import ChapterList from "../components/chapter/ChapterList.vue"
import TitleDesc from "../components/content/TitleDesc.vue"
export default {
  name: 'Course',
  components: {
    Infobar,
    MainIntro,
    ChapterList,
    TitleDesc
  },
  data() {
    return {
      courseID: this.$route.params.id,
      course: {},
      chapterTitle: 'Kapitel des Kurses'
    }
  },
  methods: {
    getCourseById(id) {
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      const filter = `?fields=id,title,status,description,languages,chapter.chapter_id.status,chapter.chapter_id.id`;
      axios.get(`${this.$store.state.apiBaseUrl}course/${id}${filter}`, {headers})
          .then(response => {
            this.course = response.data.data
          })
    }
  },
  mounted() {
    this.getCourseById(this.courseID);
    this.$store.dispatch('changeActiveCourse', this.courseID)
  },
  computed: {
    allPublishedChapters(){
      let allPublishedChapters = []
      if(this.course != undefined){
        this.course?.chapter?.forEach(item => {
          if(item.chapter_id.status == 'published'){
            allPublishedChapters.push(item.chapter_id.id);
          }
        })
      }
      return allPublishedChapters
    }
  }
}
</script>