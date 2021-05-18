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
      <div id="prev" v-if="unitPosition > 1" @click="previousUnit"><img src="/img/webicons/arrow.svg"></div>
      <div id="next" v-if="unitPosition <= numberOfUnits - 1" @click="nextUnit"><img src="/img/webicons/arrow.svg"></div>
    </div>
  </div>
</template>

<script>
import UnitTheory from "./UnitTheory.vue";
import UnitExternalExercise from "./UnitExternalExercise.vue";
import UnitEditorExercise from "./UnitEditorExercise.vue";
export default{
  name: 'Unit',
  components: {UnitEditorExercise, UnitExternalExercise, UnitTheory},
  props: {
    chapterID: {
      type: Number,
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
      this.$router.push({path: '/chapter/' + this.chapterID, query:{up: this.unitPosition}})
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
      return this.units[this.unitPosition - 1] || null
    },
    activeUnitType(){
      return this.activeUnit?.type || null
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
    }
  },
  mounted() {
    this.$store.dispatch('getAllUnitsById', this.chapterID);
    this.unitPosition = this.$route.query.up || 1
  }
}
</script>

<style lang="scss" scoped>
div.unit_container{
  padding: $ga-top-l $ga-around;
  position: relative;
  border-top: $bo-standard;
  border-bottom: $bo-standard;
  min-height: 90vh;
  overflow: hidden;
  .identifier{
    position: absolute;
    top: -1px;
    right: -1px;
    background-color: $co-akzent-dark;
    color: $co-bg;
    padding: $btn-big;
    border: $bo-standard;
    border-bottom-left-radius: $btn-big-radius;
  }
  .controls{
    cursor: pointer;
    position: absolute;
    width: 100%;
    bottom: -1px;
    left: -1px;
    div{
      background-color: $co-akzent-light-50;
      padding: $btn-big;
      border: $bo-standard;
      &#next{
        float: right;
        margin-right: -2px;
        border-top-left-radius: $btn-big-radius;
        img{
          @include icon(0deg,$ic-m);
        }
      }
      &#prev{
        float: left;
        border-top-right-radius: $btn-big-radius;
        img{
          @include icon(180deg,$ic-m);
        }
      }
    }
  }
}
</style>