<template>
  <section class="formcontainer">
    <MainIntro title="Registrieren"/>
    <TitleDesc :description="pageIntro"/>
    <div class="errors msg" v-if="hasErrors">
      <p v-if="errors.invalidFields">Du hast ungültige Felder.</p>
      <p v-if="errors.errorSubmit">Das Formular konnte nicht abgeschickt werden.</p>
      <p v-if="errors.missingFields">Du hast nicht alle Felder ausgefüllt.</p>
    </div>
    <form v-if="!formSubmitted" @submit.prevent="handleForm" class="user_form">
      <div v-for="input in userForm" :key="input.name">
        <label :for="input.name">{{ input.placeholder }}<span :class="input.req">*</span></label>
        <input :type="input.type" :id="input.name" name="firstname"
               v-model="input.value">
      </div>
      <button class="btn code small">Registrieren</button>
    </form>
    <div v-else class="msg success">
      <p>Du hast dich erfolgreich registriert. Melde dich jetzt auf der Login-Seite an.</p>
    </div>
    <div id="imagecontainer"><img src="/img/webicons/computer_user.svg"/></div>
    <LoginRegsisterNav/>
  </section>
</template>
<script>
import MainIntro from "../components/content/MainIntro";
import TitleDesc from "../components/content/TitleDesc";
import bcrypt from "bcryptjs";
import LoginRegsisterNav from "../components/user/LoginRegisterNav";
export default {
  name: 'Register',
  components: {LoginRegsisterNav, TitleDesc, MainIntro},
  data() {
    return {
      formSubmitted: false,
      pageIntro: 'Hier kannst du dich für CIF* registerieren. Mit einem Konto stehen dir alle Möglichkeiten zur Verfügung.',
      userForm: [
        {
          name: 'firstname',
          placeholder: "Vorname",
          value: '',
          type: 'text',
          req: true,
          invalid: false
        },
        {
          name: 'lastname',
          placeholder: "Nachname",
          value: '',
          type: 'text',
          req: true,
          invalid: false
        },
        {
          name: 'username',
          placeholder: "Username",
          value: '',
          type: 'text',
          req: true,
          invalid: false
        },
        {
          name: 'email',
          placeholder: "E-Mail",
          value: '',
          type: 'email',
          req: true,
          invalid: false
        },
        {
          name: 'password',
          placeholder: "Passwort",
          value: '',
          type: 'password',
          req: true,
          invalid: false
        },
      ],
      formValidation: {
        isValid: false,
        note: ''
      },
      hasErrors: false,
      errors: {
        invalidFields: false,
        missingFields: false,
        errorSubmit: false
      }
    }
  },
  methods: {
    handleForm() {
      this.resetErrors();
      this.validateFormData(this.userForm)
      const invalid = Object.values(this.errors).some(item => item)
      if (!invalid) this.registerUser();
      else this.hasErrors = true
    },
    resetErrors() {
      this.hasErrors = false
      this.errors = {
        invalidFields: false,
        missingFields: false,
        errorSubmit: false
      }
      for (const value of Object.values(this.userForm)) {
        if (value.invalid) value.invalid = false
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validateFormData(data) {
      data.forEach(it => {
        if (it.type === 'email') {
          const valid = this.validateEmail(it.value) || it.req === false
          if (!valid) {
            it.invalid = true
            this.errors.invalidFields = true
          }
        } else if (it.req && it.value === '') {
          it.invalid = true
          this.errors.missingFields = true
        }
      })
    },
    getUserData() {
      const pw = this.userForm.find(i => i.name === "password").value
      const bycryptedpw = bcrypt.hashSync(pw, 8);
      return {
        firstname: this.userForm.find(i => i.name === "firstname").value,
        lastname: this.userForm.find(i => i.name === "lastname").value,
        username: this.userForm.find(i => i.name === "username").value,
        email: this.userForm.find(i => i.name === "email").value,
        password: bycryptedpw,
      }
    },
    async registerUser() {
      const user = this.getUserData()
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      await this.$axios.post(`${this.$store.getters.getApiBaseUrl}user`, user, {headers})
          .then((res) => {
            this.formSubmitted = true
          })
          .catch(err => {
                this.error.errorSubmit = true
              }
          )
    }
  }
}
</script>
<style lang="scss" scoped>
section.formcontainer {
  position: relative;
  min-height: 89vh;
  div.msg {
    padding: $ga-around;
  }
  form {
    margin: $ga-around;
    @include content();
    button{
      background-color: $co-akzent;
    }
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
