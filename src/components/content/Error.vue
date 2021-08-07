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
  div.errormessage{
    bottom: 0px;
    left: 0px;
    position: fixed;
    width: 100vw;
    padding: $ga-inner;
    z-index: 2;
    background-color: $co-bg;
    border-top: $bo-standard;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    button{
      background-color: $co-akzent-light-50;
      border: $bo-standard;
      padding: $btn-small;
      border-radius: $btn-small-radius;
    }
  }
</style>