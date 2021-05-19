<template>
  <MainIntro title="Registrieren" />
  <section class="mainsection">
    <TitleDesc :description="pageIntro" />
      <form @submit.prevent="registerUser">
        <label for="firstname">Vorname:</label>
        <input type="text" id="firstname" name="firstname" v-model="user.firstname"><br>
        <label for="lastname">Nachname:</label>
        <input type="text" id="lastname" name="lastname" v-model="user.lastname"><br>
        <label for="username">Nutzername:</label>
        <input type="text" id="username" name="username" v-model="user.username"><br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" v-model="user.email"><br>
        <label for="password">Passwort:</label>
        <input type="password" id="password" name="password" v-model="user.password"><br>
        <button><p class="code">Registrieren</p></button>
      </form>
    <div class="msg" :class="{'success': formValidation.isValid}">
      <p class="code" v-if="formValidation.note">{{formValidation.note}}</p>
    </div>
  </section>
</template>

<script>
import MainIntro from "../components/content/MainIntro";
import TitleDesc from "../components/content/TitleDesc";
import bcrypt from "bcryptjs";
export default {
  name: 'Register',
  components: {TitleDesc, MainIntro},
  data(){
    return{
      pageIntro: 'Hier kannst du dich für CIF* registerieren. Mit einem Konto stehen dir alle Möglichkeiten zur Verfügung.',
      user: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
      },
      formValidation: {
        isValid: false,
        note: ''
      }
    }
  },
  methods:{
    registerUser(){
      if(this.user.username && this.user.lastname && this.user.username && this.user.email && this.user.password){
        this.user.password = bcrypt.hashSync(this.user.password,8);
        const headers = {
          "Authorization": `Bearer ${this.$store.state.apiToken}`
        };
        this.$axios.post(`${this.$store.state.apiBaseUrl}user`, this.user, { headers })
            .then(response => {
              for (const key in this.user) {
                this.user[key] = '';
              }
              this.formValidation.isValid = true
              this.formValidation.note = 'Du hast dich erfolgreich registriert :) Geh zur Login-Page und melde dich an.'
            })
      }else{
        this.formValidation.note = 'Bitte fülle alle Felder aus. '
      }
    }
  }
}
</script>
