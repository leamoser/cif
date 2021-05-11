<template>
  <div class="more_infos" v-html="content">
  </div>
</template>
<script>
export default{
  name: 'ChapterMaterialMore',
  props:{
    content: {
      type: String,
      required: true
    }
  }
}
</script>