<template>
  <UserHeader/>
  <header>
    <div class="burgercontainer">
      <router-link class="useranzeige" v-if="userIsLoggedIn" to="/user">
        <button class=" btn small code">logged in as {{ usernameRefreshed }}</button>
      </router-link>
      <div @click="toggleNav">
        <img alt="burger" v-if="!navActive" src="/img/webicons/burger.svg">
        <img alt="burger" v-if="navActive" src="/img/webicons/burgeractive.svg">
      </div>
    </div>
    <div class="navigationcontainer" :class="{'inactive':!navActive}">
      <img alt="icon menu" src="/img/webicons/computer_menu.svg">
      <nav>
        <router-link v-if="userIsLoggedIn" to="/user"><p class="code big">Dein Profil</p></router-link>
        <router-link to="/"><p class="code big">Home</p></router-link>
        <router-link to="/about"><p class="code big">About</p></router-link>
        <router-link to="/impressum"><p class="code big">Impressum</p></router-link>
      </nav>
      <div class="buttonbox">
        <router-link v-if="!userIsLoggedIn" to="/login">
          <button class="btn code small">einloggen</button>
        </router-link>
        <router-link v-if="!userIsLoggedIn" to="/register">
          <button class="btn code small">registrieren</button>
        </router-link>
        <router-link v-if="userIsLoggedIn" to="/" @click="logOutUser">
          <button class="btn code small">Logout</button>
        </router-link>
      </div>
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
      navActive: false,
      username: null
    }
  },
  computed: {
    usernameRefreshed() {
      return this.username || null
    },
    userIsLoggedIn() {
      return this.$store.state.userIsLoggedIn || null
    }
  },
  methods: {
    toggleNav() {
      this.navActive = this.navActive === false;
    },
    logOutUser() {
      localStorage.clear();
      this.$store.dispatch('setUserInactive');
      this.$store.dispatch('clearUserInfo');
    },
    refreshUsername() {
      this.username = localStorage.getItem('username');
    }
  },
  updated() {
    this.refreshUsername()
  },
  watch: {
    $route(from, to) {
      document.title = from.meta.title || this.$store.getters.getAppName
      this.navActive = false
      console.log('route changed')
    }
  }
}
</script>
<style lang="scss" scoped>
header {
  position: absolute;
  right: $ga-around;
  top: calc(#{$ga-around} + 10px);

  div.burgercontainer {
    z-index: 5;
    @include flex(row, center, flex-end);
    gap: 10px;

    img {
      z-index: 20;
      cursor: pointer;
      position: relative;
      @include icon(0, 50px);
    }

    .useranzeige {
      background-color: $co-bg;
      z-index: 20;
    }
  }

  div.navigationcontainer {
    position: fixed;
    z-index: 4;
    width: 80vw;
    height: 100vh;
    top: 0;
    right: 0;
    @include flex(column, center, center);

    img {
      max-width: 250px;
    }

    nav {
      margin: $ga-around 0;
      @include flex(row, center, center);
      gap: 60px;

      a {
        @include linkreset();
      }
    }

    div.buttonbox {
      @include flex(row, center, center);
      gap: 15px;

      & > * {
        display: block;
      }
    }

    border-left: $bo-standard;
    background-color: $co-akzent;
    transition: 0.5s;
    transform: translateX(0vw);

    &.inactive {
      transform: translateX(100vw);
    }
  }

}
</style>