<template>
  <a v-if="download.file" class="download_btn" :href="downloadlink" target="_blank" download>

    <div class="btn-dbl">
      <p class="code small">{{ title }} - Übungsfiles downloaden</p>
      <img class="right" src="/img/webicons/download.svg" alt="Icon Download">
    </div>

  </a>

  <a class="download_btn" v-else :href="download.url" target="_blank" download>

    <div class="btn-dbl">
      <p class="code small">{{ title }} - Übungsfiles downloaden</p>
      <img class="right" src="/img/webicons/download.svg" alt="Icon Download">
    </div>

  </a>
</template>
<script>
export default {
  name: 'DownloadExternalExercise',
  props: {
    title: {
      type: String,
      required: true
    },
    download: {
      type: Object,
      required: true
    }
  },
  computed: {
    downloadlink(){
      return this.$store.getters.getApiAssetUrl + this.download.file
    }
  }
}
</script>
<style lang="scss" scoped>
a{
  @include linkreset();
  div.btn-dbl{
   @include flex(row,center,flex-start);
    img{
      @include btnicon(0,8px,7px);
    }
  }
}
</style>


