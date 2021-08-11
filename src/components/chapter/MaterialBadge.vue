<template>
  <div class="badge_leiste" v-if="materialInfo && linktext">
    <div v-if="solved" class="badge"><p class="code small">done</p></div>
    <div v-else></div>
    <div class="more">
      <p class="code small">{{linktext}}</p>
      <img src="/img/webicons/go_light.svg" alt="Icon Weiter" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: 'MaterialBadge',
  props: {
    linktext: {
      type: String,
      required: true
    },
    materialInfo: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      solved: false
    }
  },
  methods: {
    async isSolved(){
      const headers = { "Authorization": `Bearer ${this.$store.getters.getApiToken}` };
      const filter_1 = `filter[user_id][_eq]=${this.materialInfo.userId}`;
      const filter_2 = `filter[${this.materialInfo.otherIdName}][_eq]=${this.materialInfo.otherId}`;
      await axios.get(`${this.$store.getters.getApiBaseUrl}${this.materialInfo.table}?${filter_1}&${filter_2}`, {headers})
          .then(response => {
            if(response.data.data.length !== 0){
              this.solved = true
            }
          })
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.isSolved()
    })
  }
}
</script>
<style lang="scss" scoped>
</style>