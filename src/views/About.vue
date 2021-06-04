<template>
  <MainIntro :title="content" />
  <!--<section v-if="content" class="mainsection about contentpage" id="about">
    <div class="content gc" v-if="content[0].content" v-html="content[0].content"></div>
  </section>-->
</template>

<script>
import MainIntro from "../components/content/MainIntro.vue";
export default {
  name: 'About',
  components: {MainIntro},
  computed: {
    content(){
      return 'about-placeholder'
    }
  }
}
</script>