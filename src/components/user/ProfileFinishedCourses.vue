<template>
  <TitleDesc :title="title" :description="description" />
  <div class="finished_courses">
    [tbd]
  </div>
</template>

<script>
import TitleDesc from "../content/TitleDesc";
export default {
  name: 'ProfileFinishedCourses',
  components: {TitleDesc},
  data(){
    return{
      title: 'Deine abgeschlossenen Kurse',
      description: 'Abgeschlossen sind Kurse, in denen du alle Lektionen gelöst hast.'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>