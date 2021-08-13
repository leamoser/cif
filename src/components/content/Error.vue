<template>
  <div class="error_container">
    <div class="errormessage">
      <div>
        <h3>Fehler</h3>
        <p>{{error_message}}</p>
      </div>
      <div>
        <button class="btn code small" @click="removeError">Okay!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  emits: ['remove'],
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
div.error_container{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 20;
  @include flex(column,center,center);
  div.errormessage{
    width: 50%;
    height: auto;
    background-color: $co-bg;
    border: $bo-standard;
    padding: $ga-inner;
    h3{
      margin-bottom: $ga-inner;
    }
    button{
      margin-top: $ga-inner;
      pointer-events: all;
      z-index: 21;
    }
  }
}
</style>