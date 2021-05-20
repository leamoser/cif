<template>
  <div class="text_big">
    <p class="giant">{{ text }}</p>
  </div>
</template>
<script>
export default{
  name: 'BigText',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
  div{
    background-color: $co-akzent-dark;
    margin: $ga-around;
    padding: 150px 250px;
    text-align: center;
    color: $co-bg;
    border-radius: 500px;
    border: $bo-standard;
    @include tablet-down{
      padding: 100px;
    }
    @include mobile-down{
      padding: 50px;
    }
  }
</style>