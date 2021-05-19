<template>
  <div class="user_info" v-if="user">
    <div class="edit_toggle">
      <img src="/img/webicons/edit.svg" alt="Icon Edit">
    </div>
    <h2>Du</h2>
    <p>Name: {{fullName}}</p>
    <p>Username: {{user.username}}</p>
    <p>Mail: {{user.email}}</p>
    <p>Passwort: *********</p>
  </div>
</template>

<script>
export default {
  name: 'ProfileUserInfo',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    fullName(){
      return `${this.user.firstname} ${this.user.lastname}`
    }
  }
}
</script>

<style lang="scss" scoped>
div.user_info{
  border: $bo-standard;
  padding: $ga-inner;
  position: relative;
  h2{
    margin-bottom: $ga-inner;
  }
  p:not(:last-of-type){
    margin-bottom: 10px;
  }
  div.edit_toggle{
    cursor: pointer;
    position: absolute;
    top: -1px;
    right: -1px;
    border: $bo-standard;
    background-color: $co-akzent-light-50;
    padding: $btn-big;
    border-bottom-left-radius: $btn_big-radius;
    img{
      @include icon(0,$ic-s)
    }
  }
}
</style>