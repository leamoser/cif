<template>
  <Header />
  <router-view/>
  <Footer />
</template>

<script>
import Footer from "./components/structure/Footer.vue";
import Header from "./components/structure/Header";
export default {
  components: {
    Header,
    Footer
  }
}
</script>