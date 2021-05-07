<template>
  <div class="course_box">
    <p>{{ course.title }}</p>
    <p><languageBox v-for="lang in course.languages_in_course" :languageID="lang"/> | {{ course.chapters.length }} Kapitel</p>
    <div v-html="course.description"></div>
  </div>
</template>
<script>
import languageBox from "./languageBox.vue";
export default{
  name: 'courseBox',
  components: {
    languageBox
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  }
}
</script>