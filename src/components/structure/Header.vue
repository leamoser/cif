<template>
  <UserHeader/>
  <header :class="{hidden: !showNav}">
    <div class="nav" @click="toggleNav" :class="{active: contentNavActive}" v-if="userIsLoggedIn">
      <div v-if="contentNavActive" class="nav_container">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
      <img v-if="!contentNavActive" src="/img/webicons/burger.svg" alt="Burger-Navigation Icon">
      <img v-else src="/img/webicons/burgeractive.svg" alt="Burger-Navigation Icon Aktiv">
    </div>
    <div class="user loggedout nav" v-if="!userIsLoggedIn" @click="toggleUser" :class="{active: userNavActive}">
      <div v-if="userNavActive" class="nav_container">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Registrieren</router-link>
      </div>
      <img src="/img/webicons/user.svg" alt="Icon User">
    </div>
    <div class="user loggedin usertoggle" v-if="userIsLoggedIn">
      <router-link to="/user">
        <img src="/img/webicons/user.svg" alt="Icon User">
        <p class="code small">{{ usernameRefreshed }}</p>
      </router-link>
      <router-link v-if="userIsLoggedIn" to="/" @click="logOutUser">
        <p class="code small">Logout</p>
      </router-link>
    </div>
  </header>
</template>
<script>
import UserHeader from "../user/UserHeader";
export default {
  name: 'Header',
  components: {UserHeader},
  data() {
    return {
      tagForRouter: 'li',
      contentNavActive: false,
      userNavActive: false,
      username: null,
      showNav: true,
      lastScrollPosition: 0
    }
  },
  computed: {
    usernameRefreshed() {
      return this.username || null
    },
    userIsLoggedIn(){
      return this.$store.state.userIsLoggedIn || null
    }
  },
  methods: {
    toggleNav() {
      this.contentNavActive = !this.contentNavActive;
      this.userNavActive = false;
    },
    toggleUser() {
      this.userNavActive = !this.userNavActive;
      this.contentNavActive = false;
    },
    logOutUser() {
      localStorage.clear();
      this.$store.dispatch('setUserInactive');
      this.$store.dispatch('clearUserInfo');
    },
    refreshUsername() {
      this.username = localStorage.getItem('username');
    },
    hideNav(){
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return true
      }
      this.showNav = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    }
  },
  mounted() {
    this.refreshUsername()
    window.addEventListener('scroll', this.hideNav)
  },
  updated() {
    this.refreshUsername()
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.hideNav)
  }
}
</script>
<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 5;
  top: 0;
  right: 0;
  @include flex(row, center, flex-end);
  transition: 0.5s;
  transform: translateY(0vh);
  &.hidden{
    transform: translateY(-20vh);
  }
  > * {
    cursor: pointer;
    height: 80px;
    width: auto;
    padding: 35px;
    border: $bo-standard;
  }
  div.nav {
    @include flex(row, center, flex-end);
    width: 102px;
    &.active{
      width: 100%;
      div.nav_container{
        padding-right: 100px;
        a{
          @include linkreset;
          font: $f-code-m;
          padding: 0 15px;
          @include basic_hover{
            text-decoration: underline;
          }
        }
      }
    }
    img {
      @include icon(0, $ic-m);
    }
    border-bottom-left-radius: 40px;
    margin-right: -1px;
    background-color: $co-akzent-light-50;
    .nav_container {
      background-color: $co-akzent-light-50;
    }
  }
  div.user {
    img {
      @include icon(0, $ic-s);
    }
    background-color: $co-akzent-light;
    .nav_container {
      background-color: $co-akzent-light;
    }
    &.usertoggle{
      @include flex(row, center, center);
      a{
        @include linkreset;
      }
      a:first-child{
        @include flex(row,center,center);
        p{
          @include basic_hover{
            text-decoration: underline;
          }
          margin-left: 15px;
        }
      }
      a:last-child p{
        background-color: $co-akzent-light-50;
        padding: $btn-small;
        border-radius: $btn-small-radius;
        border: $bo-standard;
        margin-left: 15px;
      }
    }
  }
}
</style>