<template>
  <UserHeader />
  <header>
    <div class="nav" @click="toggleNav"  :class="{active: contentNavActive}">
      <img v-if="!contentNavActive" src="/img/webicons/burger.svg" alt="Burger-Navigation Icon">
      <img v-else src="/img/webicons/burgeractive.svg" alt="Burger-Navigation Icon Aktiv">
      <div v-if="contentNavActive" class="nav_container">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <div class="user" @click="toggleUser" :class="{active: userNavActive}">
      <img src="/img/webicons/user.svg" alt="Icon User">
      <p class="code small" v-if="$store.state.userIsLoggedIn">{{usernameRefreshed}}</p>
      <div v-if="userNavActive" class="nav_container">
        <router-link v-if="!$store.state.userIsLoggedIn" to="/login">Login</router-link>
        <router-link v-if="!$store.state.userIsLoggedIn" to="/register">Registrieren</router-link>
        <router-link v-if="$store.state.userIsLoggedIn" to="/" @click="logOutUser">Logout</router-link>
        <router-link v-if="$store.state.userIsLoggedIn" to="/user">Profil</router-link>
      </div>
    </div>
  </header>
</template>
<script>
import UserHeader from "../user/UserHeader";
export default{
  name: 'Header',
  components: {UserHeader},
  data(){
    return{
      tagForRouter: 'li',
      contentNavActive: false,
      userNavActive: false,
      username: null
    }
  },
  computed: {
    usernameRefreshed(){
      return this.username || null
    }
  },
  methods: {
    toggleNav(){
      this.contentNavActive = !this.contentNavActive;
      this.userNavActive = false;

    },
    toggleUser(){
      this.userNavActive = !this.userNavActive;
      this.contentNavActive = false;
    },
    logOutUser(){
      localStorage.clear();
      this.$store.dispatch('setUserInactive');
    },
    refreshUsername(){
      this.username = localStorage.getItem('username');
    }
  },
  mounted() {
    this.refreshUsername()
  },
  updated(){
    this.refreshUsername()
  }
}
</script>
<style lang="scss" scoped>
header{
  position: fixed;
  z-index: 5;
  top: 0;
  right: 0;
  @include flex(row,center,flex-end);
  >*{
    cursor: pointer;
    height: 80px;
    width: auto;
    padding: 35px;
    @include flex(row,center,center);
    border: $bo-standard;
  }
  div.nav{
    img{
      @include icon(0,$ic-m);
    }
    border-bottom-left-radius: 40px;
    margin-right: -1px;
    background-color: $co-akzent-light-50;
    .nav_container{
      background-color: $co-akzent-light-50;
    }
  }
  div.user{
    img{
      @include icon(0,$ic-s);
    }
    p{
      margin-left: 10px;
    }
    background-color: $co-akzent-light;
    .nav_container{
      background-color: $co-akzent-light;
    }
  }
  div.nav_container{
    position: fixed;
    top: -1px;
    left: -1px;
    padding: 29px 35px;
    text-align: right;
    border: $bo-standard;
    min-width: 60%;
    border-bottom-right-radius: 40px;
    >*{
      font: $f-code-m;
      color: inherit;
      text-decoration: none;
      &:not(:last-of-type){
        margin-right: 20px;
      }
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>