<template>
  <div class="mark_course" v-if="!courseActive" @click="addCourseToList">
    <div class="icon">
      <img src="/img/webicons/heartEmpty.svg" alt="Icon Kurs Markieren">
    </div>
    <p class="code">Kurs für dich markieren</p>
  </div>
  <div class="mark_course" v-else @click="removeCourseFromList">
    <div class="icon">
      <img src="/img/webicons/heart.svg" alt="Icon Kurs Markieren">
    </div>
    <p class="code">Kurs aus Merkliste entfernen</p>
  </div>
</template>
<script>
export default{
  name: 'MarkCourse',
  props: {
    courseID: {
      type: Number,
      required: true
    }
  },
  data(){
    return{
      courseActive: false,
      activeCourseComboID: null
    }
  },
  computed: {
    userID(){
      return this.$store.getters.getUserId || null;
    }
  },
  methods: {
    async isCourseMarked(){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const filter_user = `filter[user_id][_eq]=${this.userID}`;
      const filter_course = `filter[course_id][_eq]=${this.courseID}`;
      await this.$axios.get(`${this.$store.getters.getApiBaseUrl}user_course?${filter_user}&${filter_course}`, {headers})
          .then(response => {
            const isMarked = !!response.data.data.length;
            if(isMarked){
              this.activeCourseComboID = response.data.data[0].id
            }else{
              this.activeCourseComboID = null
            }
            this.courseActive = isMarked;
          })
    },
    async addCourseToList(){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const content = {
        user_id: this.userID,
        course_id: this.courseID
      }
      await this.$axios.post(`${this.$store.getters.getApiBaseUrl}user_course`, content, {headers})
          .then(response => {
            this.activeCourseComboID = response.data.data.id
            this.$store.dispatch('getUserInformationByUsername', localStorage.getItem('username'));
            this.setCourseActive();
          })
    },
    async removeCourseFromList(){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      await this.$axios.delete(`${this.$store.getters.getApiBaseUrl}user_course/${this?.activeCourseComboID}`, {headers})
      .then(() => {
        this.activeCourseComboID = null
        this.$store.dispatch('getUserInformationByUsername', localStorage.getItem('username'));
        this.setCourseInactive();
      })
    },
    setCourseActive(){
      this.courseActive = true
    },
    setCourseInactive(){
      this.courseActive = false
    }
  },
  mounted() {
    this.isCourseMarked()
  }
}
</script>
<style lang="scss" scoped>
</style>