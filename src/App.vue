<template>
  <SizeOverlay v-show="smallScreen" @smallscreen="setScreensize" />
  <Header />
  <router-view/>
  <Footer />
</template>

<script>
import Footer from "./components/structure/Footer.vue";
import Header from "./components/structure/Header";
import SizeOverlay from "./components/structure/SizeOverlay";
export default {
  components: {
    SizeOverlay,
    Header,
    Footer
  },
  data(){
    return{
      smallScreen: false
    }
  },
  methods: {
    setScreensize(size){
      this.smallScreen = !!size;
    }
  }
}
</script>