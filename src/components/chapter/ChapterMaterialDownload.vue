<template>
  <div class="downloads">
    <Download v-for="download in downloads" :download-combo-i-d="download" />
  </div>
</template>
<script>
import Download from "../content/Download.vue";
export default{
  name: 'ChapterMaterialDownload',
  components: {Download},
  props:{
    downloads: {
      type: Array,
      required: true
    }
  }
}
</script>