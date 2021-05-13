<template>
  <div class="unit_container">
    <div class="identifier">
      <p>{{unitPosition}} / {{numberOfUnits}}</p>
    </div>
    <div class="unit">
      <UnitTheory v-if="activeUnit.type === 'theory'" :unit-content="activeUnit"/>
      <UnitExternalExercise v-if="activeUnit.type === 'external_exercise'" :unit-content="activeUnit" />
      <UnitEditorExercise  v-if="activeUnit.type === 'editor_exercise'" :unit-content="activeUnit" />
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
  computed:{
    units(){
      return this.$store.state.unitsById
    },
    numberOfUnits(){
      return this.units.length
    },
    activeUnit(){
      return this.units[this.unitPosition - 1]
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
  }
}
</script>