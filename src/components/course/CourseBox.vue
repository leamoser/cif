<template>
  <router-link :to="courseUrl + course.id">
    <div class="course_box">
      <h3 class="title">{{ course.title }}</h3>
      <Infobar :languages="course.languages" :chapter-count="chapterCount" />
      <div class="content_description" v-html="course.description"></div>
    </div>
  </router-link>
</template>
<script>
import Infobar from "./Infobar.vue";
export default{
  name: 'courseBox',
  components: {
    Infobar
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      courseUrl: '/course/'
    }
  },
  computed: {
    chapterCount(){
      let publishedChapters = []
      this.course.chapter.forEach(details => {
        if(details.chapter_id.status === 'published'){
          publishedChapters.push(details.chapter_id.id)
        }
      })
      return publishedChapters.length || 0
    }
  }
}
</script>