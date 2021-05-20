<template>
  <TitleDesc :title="title" :description="description" />
  <div class="active_courses" v-if="areUserInfosLoaded">
    {{solvedChapters}}
  </div>
</template>

<script>
import TitleDesc from "../content/TitleDesc";
import axios from "axios";
export default {
  name: 'ProfileActiveCourses',
  components: {TitleDesc},
  computed: {
    areUserInfosLoaded(){
      return this.$store.getters.areUserInfosLoaded
    },
    solvedChapters(){
      return this.$store.getters.getUserSolvedChapterUser
    }
  },
  data(){
    return{
      title: 'Deine aktiven Kurse',
      description: 'Ein kurs wird als aktiv gekennzeichnet, sobald du mindestens eine Lektion gelöst hast.'
    }
  },
  watch:{
    areUserInfosLoaded(val) {
      if(val) this.getMarkedCourses()
    }
  },
  methods: {
    async getActiveCourses(){
      console.log(this.solvedChapters)
    }
  },
  mounted() {
    if (this.areUserInfosLoaded) this.getActiveCourses()
  }
}
</script>

<style lang="scss" scoped>
div{
  padding: $ga-inner $ga-around;
  div.active_courses{
    @include grid(3);
  }
}
</style>