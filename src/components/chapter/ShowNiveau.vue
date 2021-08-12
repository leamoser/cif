<template>
  <div v-if="niveauID" class="niveau" :data-niveau="niveauID">
    <div id="one"></div>
    <div id="two"></div>
    <div id="three"></div>
    <div id="four"></div>
  </div>
</template>
<script>
export default{
  name: 'ShowNiveau',
  props: {
    niveauID: {
      type: Number,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
div.niveau{
  width: 32px;
  height: 20px;
  @include flex(row,flex-end,space-between);
  *{
    width: 5px;
    background-color: $co-font;
    &:nth-child(1){
      height: 5px;
    }
    &:nth-child(2){
      height: 10px;
    }
    &:nth-child(3){
      height: 15px;
    }
    &:nth-child(4){
      height: 20px;
    }
  }
  &[data-niveau='1'] *{
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      opacity: 0.3;
    }
  }
  &[data-niveau='2'] *{
    &:nth-child(3),
    &:nth-child(4) {
      opacity: 0.3;
    }
  }
  &[data-niveau='3'] *{
    &:nth-child(4) {
      opacity: 0.3;
    }
  }
}
</style>