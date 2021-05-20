<template>
  <MainIntro :title="pageTitle" v-if="user" />
    <div class="profilestats">
      <ProfileImage />
      <ProfileUserInfo :user="user" />
      <ProfileUserStats :user="user" />
    </div>
    <ProfileActiveCourses v-if="user" />
    <ProfileFinishedCourses v-if="user" />
    <ProfileMarkedCourses v-if="user" />
</template>

<script>
import MainIntro from "../components/content/MainIntro";
import ProfileImage from "../components/user/ProfileImage";
import axios from "axios";
import ProfileUserInfo from "../components/user/ProfileUserInfo";
import ProfileUserStats from "../components/user/ProfileUserStats";
import ProfileActiveCourses from "../components/user/ProfileActiveCourses";
import ProfileFinishedCourses from "../components/user/ProfileFinishedCourses";
import ProfileMarkedCourses from "../components/user/ProfileMarkedCourses";
export default {
  name: 'User',
  components: {
    ProfileMarkedCourses,
    ProfileFinishedCourses,
    ProfileActiveCourses,
    ProfileUserStats,
    ProfileUserInfo,
    ProfileImage,
    MainIntro},
  data(){
    return{
      user: null
    }
  },
  computed: {
    pageTitle(){
      return `Profil von ${localStorage.getItem('username')}` || null
    }
  },
  methods: {
    getUserInfo(){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const filter = `filter[username][_eq]=${localStorage.getItem('username')}`
      const fields = `fields=id,firstname,lastname,username,email,date_created,marked_course,solved_chapters`;
      axios.get(`${this.$store.state.apiBaseUrl}user?${filter}&${fields}`, {headers})
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
  div.profilestats{
    padding: $ga-around;
    display: grid;
    grid-gap: $ga-inner;
    grid-template-columns: 3fr 4fr 5fr;
    >*{
      width: 100%;
    }
  }
</style>
