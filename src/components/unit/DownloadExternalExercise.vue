<template>
  <a class="download_btn" v-if="download" :href="$store.state.apiAssetUrl + download" target="_blank" download>
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
  }
}

</style>


