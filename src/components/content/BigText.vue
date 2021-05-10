<template>
  <div class="text_big">
    {{ text }}
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