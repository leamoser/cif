<template>
  <section class="mainsection home" id="home">
    <FrontIntro />
    <HomeLoggedOut v-if="!loggedIn" />
    <BigText v-if="loggedIn" :text="bigText" />
    <TitleDesc v-if="loggedIn" :title="title" :description="desc" />
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
      bigText: 'Programmieren lernen kann auch Spass machen. Mit CIF* spielerisch erfolge feiern und besser werden.',
      title: 'Alle angebotenen Kurse',
      desc: 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
    }
  },
  computed: {
    loggedIn(){
      return this.$store.getters.isUserLoggedIn;
    }
  }
}
</script>
