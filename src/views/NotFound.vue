<template>
  <section class="mainsection notfound" id="notfound">
    <MainIntro title="Error 404" />
    <TitleDesc title="Seite nicht gefunden" description="Diese Seite existiert leider nicht mehr oder hat noch nie existiert." />
    <router-link :to="{name: 'Home'}">
      <button><p class="code small">Zurück&nbsp;zur&nbsp;Startseite</p></button>
    </router-link>
  </section>
</template>

<script>
import MainIntro from "../components/content/MainIntro";
import TitleDesc from "../components/content/TitleDesc";
export default {
  name: "NotFound",
  components: {TitleDesc, MainIntro}
}
</script>

<style lang="scss" scoped>
</style>