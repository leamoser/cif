<template>
  <MainIntro :title="pageTitle" />
</template>

<script>
import MainIntro from "../components/content/MainIntro";
export default {
  name: 'User',
  components: {MainIntro},
  computed: {
    pageTitle(){
      return `Profil von ${localStorage.getItem('username')}`
    }
  }
}
</script>
