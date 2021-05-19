<template>
  <div class="user_stats" v-if="user">
    <h2>Statistiken</h2>
    <p>Nutzer*in seit: {{userSince}}</p>
    <p>Absolvierte Lektionen: {{finishedLessons}}</p>
    <p>Fertige Kurse: to be defined</p>
    <p>Aktive Kurse: {{activeCourses}}</p>
  </div>
</template>

<script>
export default {
  name: 'ProfileUserStats',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    userSince(){
      return new Date(this.user.date_created).toLocaleDateString() || null
    },
    finishedLessons(){
      return this.user.solved_chapters.length || 0
    },
    activeCourses(){
      return this.user.marked_course.length || 0
    }
  }
}
</script>

<style lang="scss" scoped>
div.user_stats {
  border: $bo-standard;
  padding: $ga-inner;
  position: relative;
}
</style>