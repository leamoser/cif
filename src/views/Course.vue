<template>
  <section class="mainsection course" id="course" v-if="course">
    <MainIntro :title="course.title"/>
    <Backlink link-u-r-l="/" linktext="Zurück zur Startseite" />
    <div class="add_infos">
      <Infobar :course-i-d="course.id" :languages="course.languages" :chapter-count="allPublishedChapters.length" />
      <div class="content gc" v-html="course.description"></div>
    </div>
    <MarkCourse :course-i-d="course.id" />
    <TitleDesc :title="chapterTitle" />
    <ChapterList :chapters-i-ds="allPublishedChapters" />
  </section>
</template>

<script>
import axios from "axios"
import MainIntro from "../components/content/MainIntro.vue"
import Infobar from "../components/course/Infobar.vue"
import ChapterList from "../components/chapter/ChapterList.vue"
import TitleDesc from "../components/content/TitleDesc.vue"
import Backlink from "../components/content/Backlink";
import MarkCourse from "../components/course/MarkCourse";
export default {
  name: 'Course',
  components: {
    MarkCourse,
    Backlink,
    Infobar,
    MainIntro,
    ChapterList,
    TitleDesc
  },
  data() {
    return {
      courseID: this.$route.params.id || null,
      course: null,
      chapterTitle: 'Kapitel des Kurses'
    }
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
  },
  methods: {
    async getCourseById(id) {
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const filter = `fields=id,title,status,description,languages,chapter.chapter_id.status,chapter.chapter_id.id`;
      await axios.get(`${this.$store.getters.getApiBaseUrl}course/${id}?${filter}`, {headers})
          .then(response => {
            this.course = response.data.data
            this.$store.dispatch('changeActiveCourse', {id: this.courseID, title: this.course.title})
          })
    }
  },
  mounted() {
    this.getCourseById(this.courseID);
  }
}
</script>
<style lang="scss" scoped>
  div.add_infos{
    padding: 0 $ga-around $ga-around $ga-around;
  }
</style>