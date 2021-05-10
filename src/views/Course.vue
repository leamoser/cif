<template>
  <section class="mainsection course" id="course">
    <MainIntro :title="course.title"/>
    <p class="infobar"><LanguageBox v-for="lang in course.languages_in_course" :languageID="lang"/> | {{ course.chapters?.length || 0 }} Kapitel</p>
    <div class="content_description" v-html="course.description"></div>
    <ChapterList :chapters="course.chapters" />
  </section>
</template>

<script>
import axios from "axios";
import MainIntro from "../components/MainIntro.vue";
import LanguageBox from "../components/LanguageBox.vue";
import ChapterList from "../components/ChapterList.vue";

export default {
  name: 'Course',
  components: {LanguageBox, MainIntro, ChapterList},
  data() {
    return {
      courseID: this.$route.params.id,
      course: {}
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
  }
}
</script>