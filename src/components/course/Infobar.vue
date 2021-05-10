<template>
  <p class="infobar"><LanguageBox v-for="lang in languages" :language-combo-i-d="lang"/> | {{chapterCount}} Kapitel</p>
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