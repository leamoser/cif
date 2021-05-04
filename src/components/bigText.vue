<template>
  <div class="text_big">
    {{ text }}
  </div>
</template>
<script>
export default{
  name: 'bigText',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>