<template>
  <section class="mainsection course" id="course">
    <MainIntro :title="course.title"/>
    <Infobar :course-i-d="course.id" :languages="course.languages" :chapter-count="chapterCount" />
    <div class="content_description" v-html="course.description"></div>
    <TitleDesc :title="chapterTitle" />
    <ChapterList :chapters="course.chapter" />
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
      axios.get(`${this.$store.state.apiBaseUrl}course/${id}`, {headers})
          .then(response => {
            this.course = response.data.data
          })
    }
  },
  mounted() {
    this.getCourseById(this.courseID);
  },
  computed: {
    chapterCount(){
      return this.course.chapter?.length || 0
    }
  }
}
</script>