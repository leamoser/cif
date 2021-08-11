<template>
  <div class="title_desc">
    <h2 v-if="title">{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
  </div>
</template>
<script>
export default{
  name: 'TitleDesc',
  props: {
    title: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    }
  }
}
</script>
<style lang="scss" scoped>
div{
  padding: $ga-around;
  p{
    @include content();
  }
}
</style>