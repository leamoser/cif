<template>
  <div class="user_stats" v-if="user">
    <h2>Statistiken</h2>
    <p>Nutzer*in seit: {{userSince}}</p>
    <p>Absolvierte Lektionen: {{finishedLessons}}</p>
    <p>Markierte Kurse: {{activeCourses}}</p>
  </div>
</template>

<script>
export default {
  name: 'ProfileUserStats',
  computed: {
    user(){
      return this.$store.getters.getUserInfos || null
    },
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
</style>