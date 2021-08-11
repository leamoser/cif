<template>
  <section class="mainsection home" id="home">
    <FrontIntro />
    <HomeLoggedOut v-if="!loggedIn" />
    <TitleDesc v-if="loggedIn" :title="title" />
    <CompleteCourselist v-if="loggedIn" />
  </section>
</template>

<script>
import FrontIntro from "@/components/content/FrontIntro.vue"
import BigText from '@/components/content/BigText.vue'
import TitleDesc from "../components/content/TitleDesc.vue"
import CompleteCourselist from "../components/course/CompleteCourselist.vue";
import HomeLoggedOut from "../components/content/HomeLoggedOut";
export default {
  name: 'Home',
  components: {
    HomeLoggedOut,
    BigText,
    FrontIntro,
    CompleteCourselist,
    TitleDesc
  },
  data(){
    return{
      title: 'Alle angebotenen Kurse',
    }
  },
  computed: {
    loggedIn(){
      return this.$store.getters.isUserLoggedIn;
    }
  }
}
</script>
