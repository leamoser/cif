<template>
  <MainIntro v-if="content" :title="content?.title" />
  <section v-if="content" class="mainsection about contentpage" id="about">
    <div class="content gc" v-html="content.content"></div>
  </section>
</template>

<script>
import MainIntro from "../components/content/MainIntro.vue";
export default {
  name: 'About',
  components: {MainIntro},
  computed: {
    content(){
      return this.$store.getters.getContentPage || null
    }
  },
  mounted() {
    this.$store.dispatch('getSingleItem', 'about')
  }
}
</script>