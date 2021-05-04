<template>
  <h1>User</h1>
  <p>{{ userid }}</p>
</template>

<script>
export default {
  name: 'User',
  data(){
    return{
      name: 'lea',
      userid: this.$route.params.id
    }
  }
}
</script>
