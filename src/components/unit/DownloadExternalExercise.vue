<template>
  <a v-if="download" class="download_btn" :href="downloadlink" target="_blank" download>
    <div>
      <p class="code">{{ title }} - Übungsfiles downloaden</p>
      <img src="/img/webicons/download.svg" alt="Icon Download">
    </div>
  </a>
  <a class="download_btn" v-else :href="downloadURL" target="_blank" download>
    <div>
      <p class="code">{{ title }} - Übungsfiles downloaden</p>
      <img src="/img/webicons/download.svg" alt="Icon Download">
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
      type: String,
      required: true
    },
    downloadURL: {
      type: String,
      required: true
    }
  },
  computed: {
    downloadlink(){
      return this.$store.state.apiAssetUrl + this.download
    }
  }
}
</script>
<style lang="scss" scoped>
a{
  @include linkreset;
  div {
    margin: $ga-inner 0;
    @include flex(row, center, space-between);
    background-color: $co-akzent-light-50;
    padding: $btn-basic;
    border-radius: $btn-basic-radius;
    border: $bo-standard;
    @include content;
  }
}

</style>


