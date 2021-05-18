<template>
  <div v-if="download" class="download">
    <p class="small">{{download.file_title}}</p>
    <a class="download_btn" v-if="hasFile" :href="$store.state.apiAssetUrl + download.file" target="_blank" download>
      <div>
        <p class="code">Download</p>
      </div>
    </a>
    <a class="download_btn" v-else :href="download.file_url" target="_blank" download>
      <div>
        <p class="code">Download</p>
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