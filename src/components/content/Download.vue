<template>
  <div v-if="download" class="download">
    <p class="small">{{download.file_title}}</p>
    <a v-if="hasFile" :href="downloadLink" target="_blank" download>
      <div class="btn-dbl">
        <p class="code small">Download</p>
        <img class="right" src="/img/webicons/download.svg" alt="Icon Download">
      </div>
    </a>
    <a v-else :href="download.file_url" target="_blank" download>
      <div class="btn-dbl">
        <p class="code small">Download</p>
        <img class="right" src="/img/webicons/download.svg" alt="Icon Download">
      </div>
    </a>
  </div>
</template>
<script>
import axios from "axios";
export default{
  name: 'Download',
  data(){
    return {
      download: null
    }
  },
  props: {
    downloadComboID: {
      type: Number,
      required: true
    }
  },
  computed:{
    hasFile(){
      return this.download.file || null
    },
    downloadLink(){
      return this.$store.getters.getApiAssetUrl + this.download.file || null
    }
  },
  methods: {
    getDownloadInfos(id){
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      const fields = '?fields=id,download_id.*'
      axios.get(`${this.$store.state.apiBaseUrl}chapter_download/${id}${fields}`, {headers})
          .then(response => {
            this.download = response.data.data.download_id
          })
    }
  },
  mounted() {
    this.getDownloadInfos(this.downloadComboID)
  }
}
</script>
<style lang="scss" scoped>
div.download{
  a{
    @include linkreset();
    @include flex(row,center,flex-start);
    div.btn-dbl{
      margin: 10px 0 20px 0;
      img{
        @include btnicon(0,8px,7px);
      }
    }
  }

}

</style>