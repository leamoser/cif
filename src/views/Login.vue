<template>
  <section class="formcontainer">
    <MainIntro title="Login"/>
    <TitleDesc :description="pageIntro"/>
    <div v-if="formValidation.note" class="msg" :class="{'success': formValidation.isValid}">
      <p class="code">{{ formValidation.note }}</p>
    </div>
    <div v-if="error" class="msg">
      <p class="code">{{ error }}</p>
    </div>
    <form @submit.prevent="handleForm" class="user_form">
      <label for="username">Nutzername<span class="req">*</span></label>
      <input type="text" id="username" name="username" v-model="user.username"><br>
      <label for="password">Passwort<span class="req">*</span></label>
      <input type="password" id="password" name="password" v-model="user.password"><br>
      <button class="btn code small">Login</button>
    </form>
    <div id="imagecontainer"><img src="/img/webicons/computer_user.svg"/></div>
    <LoginRegsisterNav/>
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
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      formValidation: {
        isValid: false,
        note: ''
      },
      error: "",
      pageIntro: 'Du hast schon ein Profil? Logge dich hier ein.'
    }
  },
  methods: {
    handleForm() {
      this.resetErrors();
      const valid = this.validateFormInpus();
      if (valid) this.logIn();
      else this.error = 'Bitte fülle alle Felder aus'
    },
    resetErrors() {
      this.error = ""
    },
    validateFormInpus() {
      const validUsername = !!this.user.username
      const validPasswort = !!this.user.password
      return validUsername && validPasswort
    },
    async logIn() {
      const headers = {"Authorization": `Bearer ${this.$store.getters.getApiToken}`};
      const filter = `filter[username][_eq]=${this.user.username}`;
      const fields = `fields=id,username,password,token`;
      await this.$axios.get(`${this.$store.getters.getApiBaseUrl}user?${filter}&${fields}`, {headers})
          .then(response => {
            if (response.data.data.length === 1) { //User vorhanden
              bcrypt.compare(this.user.password, response.data.data[0].password).then((pw) => {
                if (pw) {
                  this.formValidation.isValid = true;
                  this.formValidation.note = 'Du hast dich eingeloggt :D'
                  this.$store.dispatch('setUserActive');
                  localStorage.setItem('username', response.data.data[0].username);
                  localStorage.setItem('token', response.data.data[0].token);
                  localStorage.setItem('userid', response.data.data[0].id)
                  for (const key in this.user) {
                    this.user[key] = '';
                  }
                  this.$router.push('/')
                } else {
                  this.formValidation.note = 'Passwort oder Username sind inkorrekt.'
                }
              })
            } else {
              this.formValidation.note = 'Passwort oder Username sind inkorrekt.'
            }
          })

    }
  }
}
</script>

<style lang="scss" scoped>
section.formcontainer {
  position: relative;
  min-height: 89vh;

  form {
    margin: $ga-around;
    @include content();
  }

  div#imagecontainer {
    height: 100%;
    width: 30%;
    position: fixed;
    right: $ga-around;
    top: 0;
    @include flex(column, center, center);
  }
}
</style>
