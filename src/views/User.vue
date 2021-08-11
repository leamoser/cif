<template>
  <MainIntro :title="pageTitle" v-if="user" />
    <div class="profileinfos">
      <ProfileImage />
      <ProfileUserInfo />
    </div>
    <ProfileMarkedCourses v-if="user" />
</template>
<script>
import MainIntro from "../components/content/MainIntro";
import ProfileImage from "../components/user/ProfileImage";
import axios from "axios";
import ProfileUserInfo from "../components/user/ProfileUserInfo";
import ProfileUserStats from "../components/user/ProfileUserStats";
import ProfileFinishedCourses from "../components/user/ProfileFinishedCourses";
import ProfileMarkedCourses from "../components/user/ProfileMarkedCourses";
export default {
  name: 'User',
  components: {
    ProfileMarkedCourses,
    ProfileFinishedCourses,
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
    async getUserInfo(){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const filter = `filter[username][_eq]=${localStorage.getItem('username')}`
      const fields = `fields=id,firstname,lastname,username,email,date_created,marked_course,solved_chapters`;
      await axios.get(`${this.$store.getters.getApiBaseUrl}user?${filter}&${fields}`, {headers})
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
div.profileinfos{
  @include grid(2);
  &>*{
    width: 100%;
  }
}
</style>
