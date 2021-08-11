<template>
  <p class="code small"><LanguageBox v-for="lang in languages" :language-combo-i-d="lang"/> | {{chapterCount}} Kapitel</p>
</template>
<script>
import LanguageBox from "./LanguageBox.vue";
export default{
  name: 'Infobar',
  components: {
    LanguageBox
  },
  props: {
    languages: {
      type: Array,
      required: true
    },
    chapterCount: {
      type: Number,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
p{
  margin-top: 3px;
}
</style>