<template>
  <div class="user_info" v-if="user">
    <div class="user_info_view" v-if="!profileEditMode">
      <h2>Das bist du</h2>
      <p>Name: {{fullName}}</p>
      <p>Username: {{user.username}}</p>
      <p>Mail: {{user.email}}</p>
      <p>Passwort: *********</p>
    </div>
    <div class="btn-dbl" @click="makeProfileEditable" v-if="!profileEditMode">
      <p class="code small">Profil bearbeiten</p>
      <img class="right" src="/img/webicons/edit.svg" alt="Icon Edit">
    </div>
    <div class="user_info_edit" v-if="profileEditMode">
      <h2>Du</h2>
      <form class="user_form" @submit.prevent="editProfile">
        <label for="new_firstname">Vorname</label>
        <input type="text" id="new_firstname" name="new_firstname" v-model="newUser.firstname"><br>
        <label for="new_lastname">Nachname</label>
        <input type="text" id="new_lastname" name="new_lastname" v-model="newUser.lastname"><br>
        <label for="new_email">Mail</label>
        <input type="email" id="new_email" name="new_email" v-model="newUser.email"><br>
        <label for="new_password">Neues Passwort (optional)</label>
        <input type="password" id="new_password" name="new_password" v-model="newUser.password"><br>
        <button class="btn"><p class="code small">Profil speichern</p></button>
      </form>
    </div>
  </div>
</template>
<script>
import bcrypt from "bcryptjs";
export default {
  name: 'ProfileUserInfo',
  data(){
    return{
      profileEditMode: false
    }
  },
  computed: {
    user(){
      return this.$store.getters.getUserInfos || null
    },
    fullName(){
      return `${this.user.firstname} ${this.user.lastname}`
    },
    name(){
      return this.user.name
    },
    newUser(){
      return{
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        password: null
      }
    }
  },
  methods: {
    makeProfileEditable(){
      this.profileEditMode = true
    },
    async editProfile(){
      this.profileEditMode = false
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const contents = {
        firstname: this.newUser.firstname,
        lastname: this.newUser.lastname,
        email: this.newUser.email
      }
      if(this.newUser.password){
        contents.password = bcrypt.hashSync(this.newUser.password,8);
      }
      await this.$axios.patch(`${this.$store.getters.getApiBaseUrl}user/${this.user.id}`, contents, {headers})
          .then(() => {
            this.$store.dispatch('getUserInformationByUsername', this.user.username);
          })
    }
  }
}
</script>
<style lang="scss" scoped>
div.user_info{
  @include flex(column,flex-start,center);
  div.user_info_view{
    p{
      margin-top: 5px;
    }
  }
  div.btn-dbl{
    margin-top: $ga-inner;
    &>img{
      @include btnicon(0,10px,4px)
    }
  }
}
</style>