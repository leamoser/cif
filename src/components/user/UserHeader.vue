<template>
  <div v-if="isVisible"></div>
  <!--<pre>{{$store.state}}</pre>-->
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
    userIsLoggedIn(){
      return this.$store.getters.isUserLoggedIn;
    }
  },
  watch: {
    $route() {
      this.checkIfUserIsLoggedIn();
      this.getUserInformations();
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
    },
    getUserInformations(){
      if(localStorage.getItem('username') && localStorage.getItem('token')) {
        this.$store.dispatch('getUserInformationByUsername', localStorage.getItem('username'));
      }else{
        this.$store.dispatch('clearUserInfo');
      }
    }
  },
  mounted() {
    this.checkIfUserIsLoggedIn();
    this.getUserInformations();
    this.$store.dispatch('getSettings');
  }
}
</script>

<style lang="scss" scoped>
</style>