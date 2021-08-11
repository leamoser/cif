<template>
  <router-link v-if="chapter" :to="{path: chapterURL + chapterID, query: {up: 1}}">
    <div class="chapter_link" :class="{done: chapterFinalized}">
      <ShowNiveau :niveau-i-d="chapter.niveau" />
      <div v-if="chapterFinalized" class="badge"><p class="code">done</p></div>
      <p class="code">{{chapter.title}}</p>
      <img src="/img/webicons/go_dark.svg" alt="Icon weiter">
    </div>
  </router-link>
</template>
<script>
import ShowNiveau from "./ShowNiveau";
export default{
  name: 'ChapterLink',
  components: {ShowNiveau},
  data(){
    return{
      chapter: null,
      chapterURL: '/chapter/',
      chapterFinalized: false,
      activeChapterComboID: null
    }
  },
  props: {
    chapterID: {
      type: Number,
      required: true
    }
  },
  methods: {
    async getChapterById(id){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const filter = 'fields=id,title,more_infos,niveau,editor_exercise,external_exercise,quiz,downloads,units'
      await this.$axios.get(`${this.$store.getters.getApiBaseUrl}chapter/${id}?${filter}`, {headers})
          .then(response => {
            this.chapter = response.data.data
          })
    },
    async checkifChapterIsSolved(){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const filter_user = `filter[user_id][_eq]=${this.$store.getters.getUserId}`;
      const filter_chapter = `filter[chapter_id][_eq]=${this.chapterID}`;
      await this.$axios.get(`${this.$store.getters.getApiBaseUrl}user_chapter?${filter_user}&${filter_chapter}`, {headers})
          .then(response => {
            const isFinalized = !!response.data.data.length;
            if(isFinalized){
              this.activeChapterComboID = response.data.data[0].id
            }else{
              this.activeChapterComboID = null
            }
            this.chapterFinalized = isFinalized;
          })
    }
  },
  mounted() {
    this.getChapterById(this.chapterID);
    this.checkifChapterIsSolved()
  }
}
</script>
<style lang="scss" scoped>
</style>