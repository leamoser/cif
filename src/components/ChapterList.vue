<template>
  <div class="chapter_list">
    <h2>{{ title }}</h2>
    <ChapterLink v-for="chapter in chapters" :chapterID="chapter" />
  </div>
</template>


<script>
import ChapterLink from "./ChapterLink.vue";

export default{
  name: 'ChapterList',
  components: {ChapterLink},
  props: {
    chapters: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      title: 'Kapitel des Kurses',
    }
  },
}
</script>