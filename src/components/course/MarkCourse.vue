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
      courseActive: false
    }
  },
  methods: {
    checkIfCourseIsMarked(){
      this.courseActive = this.$store.state.userInfos.marked_course.indexOf(this.courseID) !== -1;
    },
    addCourseToList(){
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      const originalContent = this.$store.state.userInfos.marked_course;
      const content = {
        marked_course: [...originalContent,this.courseID]
      }
      this.$axios.patch(`${this.$store.state.apiBaseUrl}user/${this.$store.state.userInfos.id}`, content, {headers})
          .then(() => {
            this.$store.dispatch('getUserInformationByUsername', localStorage.getItem('username'));
            this.courseActive = true
          })
    },
    removeCourseFromList(){
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      const newContent = this.$store.state.userInfos.marked_course.filter((item) => {
          return item !== this.courseID;
      })
      const content = { marked_course: newContent }
      this.$axios.patch(`${this.$store.state.apiBaseUrl}user/${this.$store.state.userInfos.id}`, content, {headers})
          .then(() => {
            this.$store.dispatch('getUserInformationByUsername', localStorage.getItem('username'));
            this.courseActive = false
          })
    }
  },
  mounted() {
    this.checkIfCourseIsMarked()
  }
}
</script>
<style lang="scss" scoped>
div.mark_course{
  cursor: pointer;
  padding: 0 $ga-around;
  @include flex(row,center,flex-start);
  div.icon{
    width: 60px;
    height: 60px;
    @include flex(column,center,center);
    background-color: $co-akzent-light-50;
    border: $bo-standard;
    border-radius: 500px;
    img{
      transition: 0.5s;
      @include icon(0,$ic-m);
      &.active{
        opacity: 1;
      }
      &:hover{
        transform: scale(1.1);
      }
    }
  }
  p{
    margin-left: 20px;
  }
}
</style>