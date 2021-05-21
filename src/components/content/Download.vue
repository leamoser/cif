<template>
  <div v-if="download" class="download">
    <p class="small">{{download.file_title}}</p>
    <a class="download_btn" v-if="hasFile" :href="downloadLink" target="_blank" download>
      <div>
        <p class="code">Download</p>
        <img src="/img/webicons/download.svg" alt="Icon Download">
      </div>
    </a>
    <a class="download_btn" v-else :href="download.file_url" target="_blank" download>
      <div>
        <p class="code">Download</p>
        <img src="/img/webicons/download.svg" alt="Icon Download">
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
    margin-bottom: 10px;
    a{
      @include linkreset;
    }
    div{
      margin: 5px 0;
      @include flex(row,center,space-between);
      background-color: $co-akzent-light-50;
      padding: $btn-basic;
      border-radius: $btn-basic-radius;
      border: $bo-standard;
      p{
        color: $co-font;
      }
    }
  }
</style>