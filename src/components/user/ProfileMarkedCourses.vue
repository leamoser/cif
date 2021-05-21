<template>
  <TitleDesc :title="title" :description="description" />
  <div class="marked_courses" v-if="areUserInfosLoaded">
    <CourseBox v-if="courses" v-for="course in courses" :key="course?.course_id?.id" :course="course?.course_id" />
  </div>
</template>

<script>
import TitleDesc from "../content/TitleDesc";
import axios from "axios";
import CourseBox from "../course/CourseBox";
export default {
  name: 'ProfileMarkedCourses',
  components: {CourseBox, TitleDesc},
  computed: {
    areUserInfosLoaded(){
      return this.$store.getters.areUserInfosLoaded
    }
  },
  data(){
    return{
      title: 'Deine markierten Kurse',
      description: 'Deine markierten Kurse sind jene, die du mit einem Herz markiert hast. Sobald du das Herz entfernst, erscheint der Kurs hier nicht mehr.',
      courses: null,
    }
  },
  watch:{
    areUserInfosLoaded(val) {
      if(val) this.getMarkedCourses()
    }
  },
  methods:{
    async getMarkedCourses(){
      if(this.$store.getters.getUserMarkedCourseUser && this.$store.getters.getUserMarkedCourseUser.length !== 0){
        const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` }
        const filter_user = `filter[user_id][_eq]=${this.$store.getters.getUserId}`;
        const filter_courses = `filter[id][_in]=${this.$store.getters.getUserMarkedCourseUser.toString()}`;
        const fields = `fields=course_id.id,course_id.status,course_id.title,course_id.description,course_id.languages,course_id.chapter.chapter_id.id,course_id.chapter.chapter_id.status`;
        await axios.get(`${this.$store.getters.getApiBaseUrl}user_course?${filter_user}&${filter_courses}&${fields}`, {headers})
            .then(response => {
              this.courses = response.data.data;
            })
      }
    }
  },
  mounted() {
    if (this.areUserInfosLoaded) this.getMarkedCourses()
  }
}
</script>

<style lang="scss" scoped>
div.marked_courses{
  padding: $ga-inner $ga-around;
  @include grid(3);
}
</style>