<template>
  <div>
    <img src="/img/webicons/computer_user.svg">
  </div>
</template>

<script>
export default {
  name: 'ProfileImage'
}
</script>

<style lang="scss" scoped>
div{
  @include flex(row,center,flex-end);
  img{
    max-width: 300px;
  }
}
</style>