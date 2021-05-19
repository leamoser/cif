<template>
  <div v-if="isVisible"></div>
  <div v-if="$store.state.userIsLoggedIn" class="userstate"><p class="code small">{{welcomeUser}}</p></div>
</template>

<script>
export default{
  name: 'UserHeader',
  data(){
    return{
      isVisible: false
    }
  },
  computed: {
    welcomeUser(){
      return `Angemeldet als ${localStorage.getItem('username')}`
    }
  },
  methods: {
    checkIfUserIsLoggedIn(){
      if(localStorage.getItem('username') && localStorage.getItem('token')){
        this.$store.dispatch('setUserActive')
      }else{
        this.$store.dispatch('setUserInactive')
      }
    }
  },
  mounted() {
    this.checkIfUserIsLoggedIn()
  }
}
</script>

<style lang="scss" scoped>
div.userstate{
  padding: 10px;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
}
</style>