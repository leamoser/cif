<template>
  <section class="mainsection chapter" id="chapter">
    <MainIntro :title="chapter.title" />
    <div class="units">
      <mark>Units</mark>
    </div>
    <div class="material_container">
      <TitleDesc :title="material_title" />
      <div class="material">
        <ChapterMaterialDownload v-if="hasDownloads" />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import MainIntro from "../components/content/MainIntro.vue";
import TitleDesc from "../components/content/TitleDesc.vue";
import ChapterMaterialDownload from "../components/chapter/ChapterMaterialDownload.vue";
export default {
  name: 'Chapter',
  components: {
    ChapterMaterialDownload,
    MainIntro,
    TitleDesc
  },
  data() {
    return {
      chapterID: this.$route.params.id,
      chapter: {}
    }
  },
  computed: {
    material_title(){
      return `Zusatzmaterial "${this.chapter.title}"`
    },
    hasDownloads(){
      return this.chapter.downloads != 0
    }
  },
  methods: {
    getChapterById(id) {
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      axios.get(`${this.$store.state.apiBaseUrl}chapter/${id}`, {headers})
          .then(response => {
            this.chapter = response.data.data
          })
    }
  },
  mounted() {
    this.getChapterById(this.chapterID);
  },
}
</script>