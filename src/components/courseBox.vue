<template>
  <div class="course_box">
    <p>{{ course.title }}</p>
    <p><span v-for="lang in course.languages_in_course">{{ lang }},</span> | {{ course.chapters.length }} Kapitel</p>
    <div v-html="course.description"></div>
    <pre>{{ course }}</pre>
  </div>
</template>
<script>
export default{
  name: 'courseBox',

  props: {
    course: {
      type: Object,
      required: true
    }
  },

  methods: {
    doStuff(){
      console.log('Geladen');
    }
  }

}
</script>