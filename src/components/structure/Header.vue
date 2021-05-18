<template>
  <UserHeader />
  <header>
    <div class="nav" @click="toggleNav">
      <img src="/img/webicons/burger.svg" alt="Burger-Navigation Icon">
      <div v-if="contentNavActive" class="nav_container">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/user/1">User</router-link>
      </div>
    </div>
    <div class="user" @click="toggleUser">
      <img src="/img/webicons/user.svg" alt="Icon User">
      <div v-if="userNavActive" class="nav_container">
        <router-link to="/">Home (nachher User)</router-link>
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
      userNavActive: false
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
    }
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
    width: 80px;
    @include flex(column,center,center);
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
    background-color: $co-akzent-light;
    .nav_container{
      background-color: $co-akzent-light;
    }
  }
  div.nav_container{
    position: fixed;
    bottom: 0;
    right: 0;
    width: 90vw;
    height: calc(90vh - 80px);
    padding: $ga-around;
    text-align: right;
    border: $bo-standard;
    border-top-left-radius: 100px;
    >*{
      display: block;
      font: $f-code-m;
      color: inherit;
      text-decoration: none;
      &:not(:last-of-type){
        margin-bottom: 5px;
      }
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>