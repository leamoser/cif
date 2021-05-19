<template>
  <div v-if="isVisible"></div>
</template>

<script>
export default{
  name: 'UserHeader',
  data(){
    return{
      isVisible: false,
      username: null
    }
  },
  computed: {
    welcomeUser(){
      return `Angemeldet als ${this.username}`
    },
    userIsLoggedIn(){
      return this.$store.state.userIsLoggedIn;
    }
  },
  methods: {
    checkIfUserIsLoggedIn(){
      this.username = localStorage.getItem('username');
      if(localStorage.getItem('username') && localStorage.getItem('token')){
        this.$store.dispatch('setUserActive')
      }else{
        this.$store.dispatch('setUserInactive')
      }
    }
  },
  mounted() {
    this.checkIfUserIsLoggedIn()
  },
  updated() {
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