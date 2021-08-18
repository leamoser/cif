<template>
  <div class="unit_container" v-if="unitPosition && units && numberOfUnits && activeUnit && activeUnitType">
    <div class="slide_fix">
      <div class="btn-dbl" @click="toggleSlide">
        <p class="code small">{{ pin.text }}</p>
        <img class="right" :src="pin.src" alt="Icon Anheften">
      </div>
    </div>
    <div class="unit">
      <UnitTheory v-if="activeUnitType === 'theory'" :unit-content="activeUnit"/>
      <UnitExternalExercise v-if="activeUnitType === 'external_exercise'" :unit-content="activeUnit"
                            unit-type="internal"/>
      <UnitEditorExercise :key="$route" v-if="activeUnitType === 'editor_exercise'" :unit-content="activeUnit" unit-type="internal"/>
    </div>
    <div class="control_leiste">
      <div class="btn-dbl prev" v-if="numberOfUnits > 1 && showPrevButton" @click="previousUnit">
        <img class="left" src="/img/webicons/go_dark.svg">
        <p class="code small">Vorheriger&nbsp;Slide</p>
      </div>
      <div class="btn identifier">
        <p class="code small">{{ unitPosition }} / {{ numberOfUnits }}</p>
      </div>
      <div class="btn-dbl next" v-if="numberOfUnits > 1 && showNextButton" @click="nextUnit">
        <p class="code small">nächster&nbsp;Slide</p>
        <img class="right" src="/img/webicons/go_dark.svg">
      </div>
      <FinalizeChapter v-if="isLastUnit" :chapter-i-d="chapterID" :backlink="backlink"/>
    </div>
  </div>
  <hr id="scrollposition">
</template>

<script>
import UnitTheory from "./UnitTheory.vue";
import UnitExternalExercise from "./UnitExternalExercise.vue";
import UnitEditorExercise from "./UnitEditorExercise.vue";
import FinalizeChapter from "../chapter/FinalizeChapter";
export default {
  name: 'Unit',
  components: {FinalizeChapter, UnitEditorExercise, UnitExternalExercise, UnitTheory},
  props: {
    chapterID: {
      type: Number,
      required: true
    },
    backlink: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      unitPosition: 1,
      slideFixed: false
    }
  },
  watch: {
    unitPosition: function () {
      this.$router.push({path: '/chapter/' + this.chapterID, query: {up: this.unitPosition.toString()}})
    },
    $route(from, to) {
      this.slideFixed = false
    }
  },
  computed: {
    units() {
      return this.$store.state.unitsById || null
    },
    numberOfUnits() {
      return this.units.length || null
    },
    activeUnit() {
      return this.units[this.unitPosition - 1].unit_id || null
    },
    activeUnitType() {
      return this.activeUnit?.type || null
    },
    isLastUnit() {
      return this.numberOfUnits === Math.trunc(this.unitPosition) || null
    },
    showPrevButton() {
      return this.unitPosition > 1 || null
    },
    showNextButton() {
      return this.unitPosition <= this.numberOfUnits - 1 || null
    },
    pin() {
      if (this.slideFixed) {
        document.querySelector('#scrollposition').scrollIntoView(false);
        this.$injection.disableScrolling();
        return {
          src: '/img/webicons/pin_active.svg',
          text: 'Slide lösen'
        }
      } else {
        this.$injection.enableScrolling();
        return {
          src: '/img/webicons/pin.svg',
          text: 'Slide fixieren'
        }
      }
    }
  },
  methods: {
    nextUnit() {
      if (this.unitPosition <= this.numberOfUnits - 1) {
        this.unitPosition++
      }
    },
    previousUnit() {
      if (this.unitPosition > 1) {
        this.unitPosition--
      }
    },
    toggleSlide() {
      this.slideFixed = this.slideFixed !== true;
    }
  },
  mounted() {
    this.$store.dispatch('getAllUnitsById', this.chapterID);
    this.unitPosition = this.$route.query.up || 1
  }
}
</script>

<style lang="scss" scoped>
hr#scrollposition{
  visibility: hidden;
  border: 0px solid transparent;
  position: absolute;
  margin-top: $ga-around;
}
div.unit_container {
  border-top: $bo-standard;
  border-bottom: $bo-standard;
  padding: $ga-around;
  min-height: calc(100vh - calc(#{$ga-around} * 2));
  position: relative;
  overflow: hidden;
  div.slide_fix {
    div.btn-dbl {
      position: absolute;
      top: -1px;
      right: -1px;
      img {
        @include btnicon(0, 12px, 8px);
      }
    }
  }

  div.unit{
    max-height: 85vh;
    overflow: scroll;
    padding-bottom: 100px;
  }

  div.control_leiste {
    height: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 37%);
    @include flex(row, center, center);
    div.prev {
      position: absolute;
      left: -1px;
      bottom: -1px;
      img {
        @include btnicon(180deg, 12px, 8px);
      }
    }
    div.identifier {
      width: auto;
      margin-bottom: -1px;
    }
    div.next {
      position: absolute;
      right: -1px;
      img {
        @include btnicon(0, 12px, 8px);
      }
    }
  }



}
</style>