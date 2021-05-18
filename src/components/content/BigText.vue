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