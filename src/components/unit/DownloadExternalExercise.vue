<template>
  <div class="download">
    <p>{{title}}</p>
    <a class="download_btn" v-if="download" :href="$store.state.apiAssetUrl + download" target="_blank" download>
      <button>
        <span>Download</span><span>-></span>
      </button>
    </a>
    <a class="download_btn" v-else :href="downloadURL" target="_blank" download>
      <button>
        <span>Download</span><span>-></span>
      </button>
    </a>
  </div>
</template>
<script>
export default{
  name: 'DownloadExternalExercise',
  props: {
    title: {
      type: String,
      required: true
    },
    download: {
      type: Number,
      required: true
    },
    downloadURL: {
      type: String,
      required: true
    }
  },
}
</script>


