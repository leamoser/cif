<template>
  <TitleDesc :title="title" :description="description" />
  <div class="marked_courses" v-if="areUserInfosLoaded">
    <CourseBox v-for="course in courses" :key="course.id" :course="course" />
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
      if(this.$store.getters.getUserMarkedCourses && this.$store.getters.getUserMarkedCourses.length !== 0){
        const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
        const filter = `filter[id][_in]=${this.$store.getters.getUserMarkedCourses}`;
        axios.get(`${this.$store.state.apiBaseUrl}course?${filter}`, {headers})
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