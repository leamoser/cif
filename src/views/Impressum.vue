<template>
  <MainIntro :title="content" />
  <!--<section v-if="content" class="mainsection impressum contentpage" id="impressum">
    <div class="content gc" v-if="content[0].content" v-html="content[0].content"></div>
  </section>-->
</template>

<script>
import MainIntro from "../components/content/MainIntro.vue";
export default {
  name: 'Impressum',
  components: {MainIntro},
  computed: {
    content(){
      return 'impressum placeholder'
    }
  }
}
</script>