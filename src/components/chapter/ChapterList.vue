<template>
  <div class="chapter_list">
    <ChapterLink v-for="chapter in chapters" :chapter-i-d="chapter" />
  </div>
</template>

<script>
import ChapterLink from "./ChapterLink.vue";
export default{
  name: 'ChapterList',
  components: {
    ChapterLink
  },
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
<style lang="scss" scoped>
  div{
    padding: 0 $ga-around;
  }
</style>