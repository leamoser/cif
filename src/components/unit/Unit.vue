<template>
  <div class="unit_container">
    <mark>{{unitPosition}}/{{numberOfUnits}}</mark>
    <div class="unit">
      <pre>{{ units[unitPosition - 1] }}</pre>
    </div>
    <button v-if="this.unitPosition > 1" @click="previousUnit"> &lt;- previous</button>
    <button v-if="this.unitPosition <= this.numberOfUnits - 1" @click="nextUnit">next -></button>
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