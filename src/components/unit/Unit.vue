<template>
  <div class="unit_container">
    <div class="identifier">
      <p>{{unitPosition}} / {{numberOfUnits}}</p>
    </div>
    <div class="unit">
      <UnitTheory v-if="activeUnitType === 'theory'" :unit-content="activeUnit"/>
      <UnitExternalExercise v-if="activeUnitType === 'external_exercise'" :unit-content="activeUnit" unit-type="internal" />
      <UnitEditorExercise  v-if="activeUnitType === 'editor_exercise'" :unit-content="activeUnit" unit-type="internal" />
    </div>
    <div class="controls" v-if="numberOfUnits > 1">
      <button v-if="this.unitPosition > 1" @click="previousUnit"> &lt;- previous</button>
      <button v-if="this.unitPosition <= this.numberOfUnits - 1" @click="nextUnit">next -></button>
    </div>
  </div>
</template>
<script>
import UnitTheory from "./UnitTheory.vue";
import UnitExternalExercise from "./UnitExternalExercise";
import UnitEditorExercise from "./UnitEditorExercise";
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
      return this.$store.state.unitsById
    },
    numberOfUnits(){
      return this.units.length
    },
    activeUnit(){
      return this.units[this.unitPosition - 1]
    },
    activeUnitType(){
      return this.activeUnit?.type
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
    this.unitPosition = this.$route.query.up
  }
}
</script>