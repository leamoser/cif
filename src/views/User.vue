<template>
  <MainIntro :title="pageTitle" />
  <section class="mainsection">
    <div class="profilestats" v-if="user">
      <ProfileImage />
      <ProfileUserInfo :user="user" />
      <ProfileUserStats :user="user" />
    </div>
  </section>
</template>

<script>
import MainIntro from "../components/content/MainIntro";
import ProfileImage from "../components/user/ProfileImage";
import axios from "axios";
import ProfileUserInfo from "../components/user/ProfileUserInfo";
import ProfileUserStats from "../components/user/ProfileUserStats";
export default {
  name: 'User',
  components: {ProfileUserStats, ProfileUserInfo, ProfileImage, MainIntro},
  data(){
    return{
      user: null
    }
  },
  computed: {
    pageTitle(){
      return `Profil von ${localStorage.getItem('username')}`
    }
  },
  methods: {
    getUserInfo(){
      const headers = {
        "Authorization": `Bearer ${this.$store.state.apiToken}`
      };
      const filter = `?filter[username][_eq]=${localStorage.getItem('username')}`
      const fields = `&fields=id,firstname,lastname,username,email,date_created,marked_course,solved_chapters`;
      axios.get(`${this.$store.state.apiBaseUrl}user/${filter}${fields}`, {headers})
          .then(response => {
            this.user = response.data.data[0];
          })
    }
  },
  mounted() {
    this.getUserInfo();
  }
}
</script>
<style lang="scss" scoped>
section{
  padding: $ga-around;
  div.profilestats{
    @include grid(3);
  }
}
</style>
