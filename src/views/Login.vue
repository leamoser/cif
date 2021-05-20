<template>
  <MainIntro title="Login" />
  <TitleDesc :description="pageIntro" />
  <section class="mainsection">
    <div v-if="formValidation.note" class="msg" :class="{'success': formValidation.isValid}">
      <p class="code">{{formValidation.note}}</p>
    </div>
    <form @submit.prevent="logIn">
      <label for="username">Nutzername<span class="req">*</span></label>
      <input type="text" id="username" name="username" v-model="user.username"><br>
      <label for="password">Passwort<span class="req">*</span></label>
      <input type="password" id="password" name="password" v-model="user.password"><br>
      <button><p class="code">Login</p></button>
    </form>
    <LoginRegsisterNav />
  </section>
</template>

<script>
import MainIntro from "../components/content/MainIntro";
import bcrypt from "bcryptjs";
import LoginRegsisterNav from "../components/user/LoginRegisterNav";
import TitleDesc from "../components/content/TitleDesc";
export default {
  name: 'Login',
  components: {TitleDesc, LoginRegsisterNav, MainIntro},
  data(){
    return{
      user: {
        username: '',
        password: ''
      },
      formValidation: {
        isValid: false,
        note: ''
      },
      pageIntro: 'Du hast schon ein Profil? Logge dich hier ein.'
    }
  },
  methods: {
    logIn(){
      if(this.user.username && this.user.password){
        const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
        const filter = `filter[username][_eq]=${this.user.username}`;
        const fields = `fields=id,username,password,token`;
        this.$axios.get(`${this.$store.state.apiBaseUrl}user?${filter}&${fields}`, { headers })
            .then(response => {
              if(response.data.data.length === 1){ //User vorhanden
                bcrypt.compare(this.user.password, response.data.data[0].password).then((pw) => {
                  if(pw){
                    this.formValidation.isValid = true;
                    this.formValidation.note = 'Du hast dich eingeloggt :D'
                    this.$store.dispatch('setUserActive');
                    localStorage.setItem('username', response.data.data[0].username);
                    localStorage.setItem('token', response.data.data[0].token);
                    for (const key in this.user) {
                      this.user[key] = '';
                    }
                    this.$router.push('/')
                  }else{
                    this.formValidation.note = 'Passwort oder Username sind inkorrekt.'
                  }
                })
              }else{
                this.formValidation.note = 'Passwort oder Username sind inkorrekt.'
              }
            })
      }else{
        this.formValidation.note = 'Bitte fülle alle Felder aus'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  section{
    padding: $ga-around;
  }
</style>
