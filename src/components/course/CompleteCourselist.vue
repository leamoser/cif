<template>
  <div class="course_list">
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
      return this.$store.state.allCourses
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