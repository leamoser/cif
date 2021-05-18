<template>
    <a class="download_btn" v-if="download" :href="$store.state.apiAssetUrl + download" target="_blank" download>
      <div>
        <p class="code">{{title}} - Übungsfiles downloaden</p>
      </div>
    </a>
    <a class="download_btn" v-else :href="downloadURL" target="_blank" download>
      <div>
        <p class="code">{{title}} - Übungsfiles downloaden</p>
      </div>
    </a>
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
      type: String,
      required: true
    },
    downloadURL: {
      type: String,
      required: true
    }
  },
}
</script>


