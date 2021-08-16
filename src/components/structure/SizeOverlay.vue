<template>
  <section>
    <TitleDesc :title="title" :description="desciption" />
  </section>
</template>
<script>
import TitleDesc from "../content/TitleDesc";
export default {
  name: 'SizeOverlay',
  components: {TitleDesc},
  data(){
    return{
      title: 'Dein Bildschirm oder dein Browserfenster ist zu klein🥶',
      desciption: 'Diese Platform ist für grosse Screens entwickelt worden. Bitte arbeite auf einem Laptop mit genügend grossem Bildschirm.'
    }
  },
  emits: ['smallscreen'],
  methods: {
    getScreensize(){
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      if(width >= 1000){
        this.$emit('smallscreen', false)
        this.$injection.enableScrolling()
      }else{
        this.$emit('smallscreen', true)
        this.$injection.disableScrolling()
      }
    }
  },
  created() {
    window.addEventListener("resize", this.getScreensize);
  },
  unmounted() {
    window.removeEventListener("resize", this.getScreensize);
  },
  mounted() {
    this.getScreensize()
  }
}
</script>
<style lang="scss" scoped>
section{
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: $co-akzent;
  @include flex(column,center,center);
  z-index: 30;
  *{
    width: 70%;
    text-align: center;
  }
}
</style>