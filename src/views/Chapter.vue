<template>
  <section class="mainsection chapter" id="chapter">
    <MainIntro :title="chapter.title" />
    <Backlink linktext="Zurück zur Kursübersicht" />
    <div class="units">
      <mark>Units</mark>
    </div>
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
export default {
  name: 'Chapter',
  components: {
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
    },
    hasMoreInfos(){
      return this.chapter.more_infos
    },
    hasEditorExercise(){
      return this.chapter.editor_exercise != null
    },
    hasExternalExercise(){
      return this.chapter.external_exercise != null
    },
    hasQuiz(){
      return this.chapter.quiz != null
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