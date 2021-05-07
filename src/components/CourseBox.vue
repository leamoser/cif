<template>
  <div class="course_box">
    <p>{{ course.title }}</p>
    <p><LanguageBox v-for="lang in course.languages_in_course" :languageID="lang"/> | {{ course.chapters.length }} Kapitel</p>
    <div v-html="course.description"></div>
  </div>
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
  }
}
</script>