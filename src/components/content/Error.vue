<template>
  <div class="errormessage">
    <div>
      <h3>Fehler</h3>
      <p>{{error_message}}</p>
    </div>
    <div>
      <button @click="removeError"><p class="code">Okay!</p></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: {
    error_message: {
      type: String,
      required: true
    }
  },
  methods: {
    removeError(){
      this.$emit('remove')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>