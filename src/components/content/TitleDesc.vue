<template>
  <div class="title_desc">
    <h2>{{title}}</h2>
    <p v-if="description">{{description}}</p>
  </div>
</template>
<script>
export default{
  name: 'MainIntro',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    }
  }
}
</script>