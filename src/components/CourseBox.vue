<template>
  <router-link :to="courseUrl + course.id">
    <div class="course_box">
      <h3 class="title">{{ course.title }}</h3>
      <p class="infobar"><LanguageBox v-for="lang in course.languages_in_course" :languageID="lang"/> | {{ course.chapters.length }} Kapitel</p>
      <div class="content_description" v-html="course.description"></div>
      <div class="baseleiste">
        <mark>Component "getState" oder so</mark>
        <mark>Component "goAahead"</mark>
      </div>
    </div>
  </router-link>
</template>
<script>
import LanguageBox from "./LanguageBox.vue";
export default{
  name: 'courseBox',
  components: {
    LanguageBox
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      courseUrl: '/course/'
    }
  }
}
</script>