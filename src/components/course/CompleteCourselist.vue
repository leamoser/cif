<template>
  <div class="course_list" v-if="courses">
      <CourseBox v-for="course in courses" :key="course.id" :course="course" />
  </div>
</template>

<script>
import CourseBox from "./CourseBox.vue"
export default{
  name: 'CompleteCourselist',
  components: {
    CourseBox
  },
  computed: {
    courses(){
      return this.$store.getters.getAllCourses || null;
    }
  },
  mounted() {
    this.$store.dispatch('getAllCourses');
  }
}
</script>

<style lang="scss" scoped>
div{
  @include grid(3);
  padding: 0 $ga-around $ga-around $ga-around;
}
</style>