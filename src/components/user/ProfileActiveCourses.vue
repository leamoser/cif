<template>
  <TitleDesc :title="title" :description="description" />
  <div class="active_courses">
    [tbd]
  </div>
</template>

<script>
import TitleDesc from "../content/TitleDesc";
export default {
  name: 'ProfileActiveCourses',
  components: {TitleDesc},
  data(){
    return{
      title: 'Deine aktiven Kurse',
      description: 'Ein kurs wird als aktiv gekennzeichnet, sobald du mindestens eine Lektion gelöst hast.'
    }
  }
}
</script>

<style lang="scss" scoped>
div{
  padding: $ga-inner $ga-around;
}
</style>