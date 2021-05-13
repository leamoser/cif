<template>
  <h2>{{unitContent.title}}</h2>
  <div class="unit_theory content" v-html="unitContent.theory"></div>
</template>
<script>
export default{
  name: 'UnitTheory',
  props: {
    unitContent: {
      type: Object,
      required: true
    }
  }
}
</script>