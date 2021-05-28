<template>
  <MainIntro :title="content[0].title" />
  <section v-if="content" class="mainsection about contentpage" id="about">
    <div class="content gc" v-if="content[0].content" v-html="content[0].content"></div>
  </section>
</template>

<script>
import MainIntro from "../components/content/MainIntro.vue";
export default {
  name: 'About',
  components: {MainIntro},
  computed: {
    content(){
      return this.$store.getters.getContentPageByPageslug('about') || null
    }
  }
}
</script>
