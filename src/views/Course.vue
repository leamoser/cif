<template>
  <section class="mainsection course" id="course" v-if="course">
    <MainIntro :title="course.title"/>
    <div class="add_infos">
      <Infobar :course-i-d="course.id" :languages="course.languages" :chapter-count="allPublishedChapters.length" />
      <div class="content gc" v-html="course.description"></div>
    </div>
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
      courseID: this.$route.params.id || null,
      course: null,
      chapterTitle: 'Kapitel des Kurses'
    }
  },
  methods: {
    async getCourseById(id) {
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      const filter = `?fields=id,title,status,description,languages,chapter.chapter_id.status,chapter.chapter_id.id`;
      await axios.get(`${this.$store.state.apiBaseUrl}course/${id}${filter}`, {headers})
          .then(response => {
            this.course = response.data.data
            this.$store.dispatch('changeActiveCourse', {id: this.courseID, title: this.course.title})
          })
    }
  },
  mounted() {
    this.getCourseById(this.courseID);
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
<style lang="scss" scoped>
  div.add_infos{
    padding: 0 $ga-around $ga-around $ga-around;
  }
</style>