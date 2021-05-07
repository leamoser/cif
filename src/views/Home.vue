<template>
  <section class="mainsection home" id="home">
    <FrontIntro />
    <BigText text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." />
    <FrontCourselist />
  </section>
</template>

<script>
import BigText from '@/components/BigText.vue'
import FrontIntro from "@/components/front/FrontIntro.vue"
import FrontCourselist from "@/components/front/FrontCourselist.vue";

export default {
  name: 'Home',
  components: {
    BigText,
    FrontIntro,
    FrontCourselist
  }
}
</script>
