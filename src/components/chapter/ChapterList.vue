<template>
  <div class="chapter_list">
    <ChapterLink v-for="chapter in chaptersIDs" :chapter-i-d="chapter" />
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
    chaptersIDs: {
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
div.chapter_list{
  padding: 0 $ga-around;
}
</style>