<template>
  <MainIntro title="Login" />
  <section class="mainsection">
    <form @submit.prevent="logIn">
      <label for="username">Nutzername:</label>
      <input type="text" id="username" name="username" v-model="user.username"><br>
      <label for="password">Passwort:</label>
      <input type="password" id="password" name="password" v-model="user.password"><br>
      <button><p class="code">Login</p></button>
    </form>
    <div class="msg" :class="{'success': formValidation.isValid}">
      <p class="code" v-if="formValidation.note">{{formValidation.note}}</p>
    </div>
  </section>
</template>

<script>
import MainIntro from "../components/content/MainIntro";
import bcrypt from "bcryptjs";
export default {
  name: 'Login',
  components: {MainIntro},
  data(){
    return{
      user: {
        username: '',
        password: ''
      },
      formValidation: {
        isValid: false,
        note: ''
      }
    }
  },
  methods: {
    logIn(){
      if(this.user.username && this.user.password){

        //User holen
        const headers = {
          "Authorization": `Bearer ${this.$store.state.apiToken}`
        };
        const filter = `?filter[username][_eq]=${this.user.username}`;
        const fields = `&fields=id,username,password,token`;
        this.$axios.get(`${this.$store.state.apiBaseUrl}user${filter}${fields}`, { headers })
            .then(response => {
              if(response.data.data.length === 1){ //User vorhanden
                bcrypt.compare(this.user.password, response.data.data[0].password).then((pw) => {
                  if(pw){
                    this.formValidation.isValid = true;
                    this.formValidation.note = 'Du hast dich eingeloggt :D'
                    for (const key in this.user) {
                      this.user[key] = '';
                    }
                  }else{
                    this.formValidation.note = 'Passwort oder Username sind inkorrekt.'
                  }
                })

              }else{ //User nicht vorhanden
                this.formValidation.note = 'Passwort oder Username sind inkorrekt.'
              }
            })
      }else{
        //Wenn nicht alles ausgefüllt
        this.formValidation.note = 'Bitte fülle alle Felder aus'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
