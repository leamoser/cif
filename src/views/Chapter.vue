<template>
  <section v-if="chapter" class="mainsection chapter" id="chapter">
    <MainIntro :title="chapter.title" />
    <Backlink v-if="backlink" :link-u-r-l="backlink" linktext="Zurück zur Kursübersicht" />
    <Unit :chapter-i-d="chapterID" :backlink="backlink" />
    <div class="material_container">
      <TitleDesc :title="material_title" />
      <div class="material">
        <ChapterMaterialDownload v-if="hasDownloads" :downloads="chapter.downloads" />
        <ChapterMaterialMore v-if="hasMoreInfos" :content="chapter.more_infos" />
        <ChapterMaterialEditor v-if="hasEditorExercise" :exercise-i-d="chapter.editor_exercise" />
        <ChapterMaterialExternal v-if="hasExternalExercise" :exercise-i-d="chapter.external_exercise"/>
        <ChapterMaterialQuiz v-if="hasQuiz" :quiz-i-d="chapter.quiz"/>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import MainIntro from "../components/content/MainIntro.vue";
import TitleDesc from "../components/content/TitleDesc.vue";
import ChapterMaterialDownload from "../components/chapter/ChapterMaterialDownload.vue";
import ChapterMaterialMore from "../components/chapter/ChapterMaterialMore.vue";
import ChapterMaterialEditor from "../components/chapter/ChapterMaterialEditor.vue";
import ChapterMaterialExternal from "../components/chapter/ChapterMaterialExternal.vue";
import ChapterMaterialQuiz from "../components/chapter/ChapterMaterialQuiz.vue";
import Backlink from "../components/content/Backlink.vue";
import Unit from "../components/unit/Unit.vue";
export default {
  name: 'Chapter',
  components: {
    Unit,
    Backlink,
    ChapterMaterialQuiz,
    ChapterMaterialExternal,
    ChapterMaterialEditor,
    ChapterMaterialMore,
    ChapterMaterialDownload,
    MainIntro,
    TitleDesc
  },
  data() {
    return {
      chapterID: parseInt(this.$route.params.id) || null,
      chapter: null
    }
  },
  computed: {
    material_title(){
      return `Zusatzmaterial "${this.chapter.title}"` || null
    },
    hasDownloads(){
      return this.chapter.downloads != 0
    },
    hasMoreInfos(){
      return this.chapter.more_infos || null
    },
    hasEditorExercise(){
      return this.chapter.editor_exercise || null
    },
    hasExternalExercise(){
      return this.chapter.external_exercise || null
    },
    hasQuiz(){
      return this.chapter.quiz || null
    },
    unitLength(){
      return this.chapter.units.length
    },
    backlink(){
      let id = this.$store.getters.getActiveCourseId
      if(id && id !== 89999999){
        return '/course/' + id
      } else {
        return false
      }
    }
  },
  methods: {
    async getChapterById(id) {
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const fields = 'fields=id,title,more_infos,niveau,editor_exercise,external_exercise,quiz,downloads,units.id'
      await axios.get(`${this.$store.getters.getApiBaseUrl}chapter/${id}?${fields}`, {headers})
          .then(response => {
            this.chapter = response.data.data;
            this.$store.dispatch('changeActiveChapter', {id: this.chapterID, title: this.chapter.title})
          })
    }
  },
  mounted() {
    this.getChapterById(this.chapterID);
  },
}
</script>
<style lang="scss" scoped>

</style>