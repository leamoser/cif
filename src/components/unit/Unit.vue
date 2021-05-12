<template>
  <div class="unit_container">
    <div class="identifier">
      <p>{{unitPosition}} / {{numberOfUnits}}</p>
    </div>
    <div class="unit">
      <pre>{{activeUnit}}</pre>
    </div>
    <div class="controls" v-if="numberOfUnits > 1">
      <button v-if="this.unitPosition > 1" @click="previousUnit"> &lt;- previous</button>
      <button v-if="this.unitPosition <= this.numberOfUnits - 1" @click="nextUnit">next -></button>
    </div>
  </div>
</template>
<script>
export default{
  name: 'Unit',
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