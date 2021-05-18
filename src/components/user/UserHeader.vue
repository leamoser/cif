<template>
  <div v-if="isVisible"></div>
</template>

<script>
export default{
  name: 'UserHeader',
  data(){
    return{
      isVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>