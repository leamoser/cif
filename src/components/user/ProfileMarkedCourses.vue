<template>
  <TitleDesc :title="title" :description="description" />
  <div class="marked_courses">
    [tbd]
  </div>
</template>

<script>
import TitleDesc from "../content/TitleDesc";
export default {
  name: 'ProfileMarkedCourses',
  components: {TitleDesc},
  data(){
    return{
      title: 'Deine markierten Kurse',
      description: 'Deine markierten Kurse sind jene, die du mit einem Herz markiert hast. Sobald du das Herz entfernst, erscheint der Kurs hier nicht mehr.'
    }
  }
}
</script>

<style lang="scss" scoped>
div{
  padding: $ga-inner $ga-around;
}
</style>