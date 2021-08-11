<template>
  <div class="finish_unit" @click="finalizeChapter" v-if="!chapterFinalized">
    <p class="code small">Kapitel abschliessen</p>
  </div>
  <div class="finish_unit" v-else>
    <router-link :to="backlink">
      <p class="code small">Zurück zur Übersicht</p>
    </router-link>
  </div>
</template>
<script>
import axios from "axios";
export default{
  name: 'FinalizeChapter',
  props: {
    chapterID: {
      type: Number,
      required: true
    },
    backlink: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      chapterFinalized: false,
      activeChapterComboID: null
    }
  },
  computed: {
    userID(){
      return this.$store.getters.getUserId || null;
    }
  },
  methods: {
    async isChapterFinalized(){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const filter_user = `filter[user_id][_eq]=${this.userID}`;
      const filter_chapter = `filter[chapter_id][_eq]=${this.chapterID}`;
      await axios.get(`${this.$store.getters.getApiBaseUrl}user_chapter?${filter_user}&${filter_chapter}`, {headers})
          .then(response => {
            const isFinalized = !!response.data.data.length;
            if(isFinalized){
              this.activeChapterComboID = response.data.data[0].id
            }else{
              this.activeChapterComboID = null
            }
            this.chapterFinalized = isFinalized;
          })
    },
    async finalizeChapter(){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const content = {
        user_id: this.userID,
        chapter_id: this.chapterID
      }
      await axios.post(`${this.$store.getters.getApiBaseUrl}user_chapter`, content, {headers})
          .then(response => {
            this.activeChapterComboID = response.data.data.id
            this.$store.dispatch('getUserInformationByUsername', localStorage.getItem('username'));
            this.setChapterFinalized();
            this.$router.push(this.backlink)
          })
    },
    setChapterFinalized(){
      this.chapterFinalized = true
    }
  },
  mounted() {
    this.isChapterFinalized()
  }
}
</script>
<style lang="scss" scoped>
</style>