<template>
  <section class="mainsection home" id="home">
    <frontIntro />
    <bigText text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." />
    <frontCourselist />
  </section>
</template>

<script>
// @ is an alias to /src
import bigText from '@/components/bigText.vue'
import frontIntro from "../components/front/frontIntro.vue"
import frontCourselist from "../components/front/frontCourselist.vue";

export default {
  name: 'Home',
  components: {
    bigText,
    frontIntro,
    frontCourselist
  }
}
</script>
