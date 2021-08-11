<template>
  <div class="unit_container" v-if="unitPosition && units && numberOfUnits && activeUnit && activeUnitType">
    <div class="identifier">
      <p class="code">{{unitPosition}} / {{numberOfUnits}}</p>
    </div>
    <div class="unit">
      <UnitTheory v-if="activeUnitType === 'theory'" :unit-content="activeUnit"/>
      <UnitExternalExercise v-if="activeUnitType === 'external_exercise'" :unit-content="activeUnit" unit-type="internal" />
      <UnitEditorExercise v-if="activeUnitType === 'editor_exercise'" :unit-content="activeUnit" unit-type="internal" />
    </div>
    <div class="controls" v-if="numberOfUnits > 1">
      <div id="prev" v-if="showPrevButton" @click="previousUnit"><img src="/img/webicons/arrow.svg"></div>
      <div id="next" v-if="showNextButton" @click="nextUnit"><img src="/img/webicons/arrow.svg"></div>
    </div>
    <FinalizeChapter v-if="isLastUnit" :chapter-i-d="chapterID" :backlink="backlink" />
  </div>
</template>

<script>
import UnitTheory from "./UnitTheory.vue";
import UnitExternalExercise from "./UnitExternalExercise.vue";
import UnitEditorExercise from "./UnitEditorExercise.vue";
import FinalizeChapter from "../chapter/FinalizeChapter";
export default{
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
  data(){
    return{
      unitPosition: 1
    }
  },
  watch: {
    unitPosition: function (){
      this.$router.push({path: '/chapter/' + this.chapterID, query:{up: this.unitPosition.toString()}})
    }
  },
  computed:{
    units(){
      return this.$store.state.unitsById || null
    },
    numberOfUnits(){
      return this.units.length || null
    },
    activeUnit(){
      return this.units[this.unitPosition - 1].unit_id || null
    },
    activeUnitType(){
      return this.activeUnit?.type || null
    },
    isLastUnit(){
      return this.numberOfUnits === Math.trunc(this.unitPosition) || null
    },
    showPrevButton(){
      return this.unitPosition > 1 || null
    },
    showNextButton(){
      return this.unitPosition <= this.numberOfUnits - 1 || null
    }
  },
  methods: {
    nextUnit(){
      if(this.unitPosition <= this.numberOfUnits - 1){
        this.unitPosition++
      }
    },
    previousUnit(){
      if(this.unitPosition > 1){
        this.unitPosition--
      }
    },
  },
  mounted() {
    this.$store.dispatch('getAllUnitsById', this.chapterID);
    this.unitPosition = this.$route.query.up || 1
  }
}
</script>

<style lang="scss" scoped>
</style>