<template>
  <TitleDesc :title="title" :description="description" />
  <div class="marked_courses">
    {{ marked_courses }}
  </div>
</template>

<script>
import TitleDesc from "../content/TitleDesc";
export default {
  name: 'ProfileMarkedCourses',
  components: {TitleDesc},
  props:{
    marked_courses:{
      type: Array,
      required: true
    }
  },
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