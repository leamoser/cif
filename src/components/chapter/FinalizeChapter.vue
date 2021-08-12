<template>
  <div class="btn-dbl finish_unit finish" @click="finalizeChapter" v-if="!chapterFinalized">
    <p class="code small">Kapitel abschliessen</p>
    <img class="right" src="/img/webicons/finish.svg" alt="Icon Finish" />
  </div>
  <div class="btn-dbl finish_unit back" v-else>
      <p class="code small"><router-link :to="backlink">Zurück zur Übersicht</router-link></p>
      <img class="right" src="/img/webicons/home.svg" alt="Back Icon" />
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
div.finish_unit{
  position: absolute;
  right: -2px;
}
div.finish{
  img{
    @include btnicon(0,9px,8px);
  }
}
div.back{
  a{
    @include linkreset();
  }
  img{
    @include btnicon(0,8px,8px);
  }
}
</style>