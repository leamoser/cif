<template>
  <div class="bubble_ct" v-if="content">
    <div class="bubble green" data-id="1">
      <h2>{{content[0].title}}</h2>
    </div>
    <div class="bubble rosa" data-id="2">
      <p>{{content[0].text}}</p>
    </div>
    <div class="bubble blue" data-id="3">
      <img :src="imagelink_01" :alt="content[1].title" />
    </div>
    <div class="bubble darkrosa" data-id="4">
      <h2>{{content[2].title}}</h2>
    </div>
    <div class="bubble blue" data-id="5">
      <img :src="imagelink_02" :alt="content[3].title" />
    </div>
    <div class="bubble rosa" data-id="6">
      <p>{{content[2].text}}</p>
    </div>
    <div class="bubble blue" data-id="7">
      <img :src="imagelink_03" :alt="content[4].title" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeLoggedOut",
  computed: {
    content(){
      return this.$store.getters.getContentPageByPageslug('frontpage') || null
    },
    imagelink_01(){
      return this.$store.getters.getApiAssetUrl + this.content[1].image
    },
    imagelink_02(){
      return this.$store.getters.getApiAssetUrl + this.content[3].image
    },
    imagelink_03(){
      return this.$store.getters.getApiAssetUrl + this.content[4].image
    }
  }
}
</script>

<style lang="scss" scoped>
div.bubble_ct{
  position: relative;
  padding: 0 $ga-around;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 250px;
  grid-template-areas:
      "titel1 text1 text1 text1"
      "bild1 titel2 titel2 bild2"
      "bild1 text2 text2 bild3";
  grid-gap: $ga-inner;
  .bubble{
    border: $bo-standard;
    height: 100%;
    text-align: center;
    padding: 50px;
    @include flex(row,center,center);
    >*{
      width: 100%;
    }
    border-radius: 300px;
    //gridareas
    &[data-id='1']{ grid-area: titel1 }
    &[data-id='2']{ grid-area: text1 }
    &[data-id='3']{ grid-area: bild1 }
    &[data-id='4']{ grid-area: titel2 }
    &[data-id='5']{ grid-area: bild2 }
    &[data-id='6']{ grid-area: text2 }
    &[data-id='7']{ grid-area: bild3 }
    //colors
    &.blue{background-color: $co-akzent-dark}
    &.green{background-color: $co-pos}
    &.rosa{background-color: $co-akzent-light-50}
    &.darkrosa{background-color: $co-akzent-light}
  }
}
</style>