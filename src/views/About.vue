<template>
  <MainIntro v-if="content" :title="content?.title" />
  <section v-if="content" class="mainsection about contentpage" id="about">
    <div class="content gc" v-html="content.content"></div>
    <div v-if="image" class="imgagecontainer">
      <img :src="image" alt="Seitenbild" />
    </div>
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
    },
    image(){
      if(this.content.mainimage){
        return this.$store.getters.getApiAssetUrl + this.content.mainimage
      }else {
        return false
      }
    },
  },
  mounted() {
    this.$store.dispatch('getSingleItem', 'about')
  }
}
</script>