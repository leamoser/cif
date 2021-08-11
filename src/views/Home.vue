<template>
  <section>
    <div id="intro" :class="{ 'intro_minimized': loggedIn }">
      <FrontIntro />
      <HomeLoggedOut v-if="!loggedIn" />
      <div id="imagecontainer"><img v-if="introImageSrc" :src="introImageSrc" /></div>
      <ScrollInfo title="für mehr Infos scrollen" />
    </div>
    <TitleDesc v-if="loggedIn" :title="title" />
    <CompleteCourselist />
  </section>
</template>

<script>
import FrontIntro from "@/components/content/FrontIntro.vue"
import BigText from '@/components/content/BigText.vue'
import TitleDesc from "../components/content/TitleDesc.vue"
import CompleteCourselist from "../components/course/CompleteCourselist.vue";
import HomeLoggedOut from "../components/content/HomeLoggedOut";
import ScrollInfo from "../components/content/ScrollInfo";
export default {
  name: 'Home',
  components: {
    ScrollInfo,
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
    },
    introImageSrc(){
      if(this.loggedIn){
        return '/img/webicons/computer_heart.svg'
      }else{
        return '/img/webicons/computer_code.svg'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
section{
  div#intro{
    margin-bottom: $ga-around;
    height: calc( 100vh - calc( #{$ga-around} * 2 ) );
    &.intro_minimized{
      height: calc( 70vh - calc( #{$ga-around} * 2 ) );
    }
    position: relative;
    div#imagecontainer{
      height: 100%;
      width: 35%;
      position: absolute;
      right: 0;
      top: 0;
      @include flex(column,center,center);
    }
  }
  padding: $ga-around;
}
</style>
