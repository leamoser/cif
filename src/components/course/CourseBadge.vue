<template>
  <div class="badge_leiste" v-if="chapterDetails && courseStatus">
    <div class="badge" :class="courseStatus.badgetext"><p class="code small">{{courseStatus?.badgetext}}</p></div>
    <div class="more">
      <p class="code small">{{courseStatus?.more}}</p>
      <img src="/img/webicons/go_light.svg" alt="Icon Weiter" />
    </div>
  </div>
</template>
<script>
export default{
  name: 'courseBadge',
  props: {
    chapterDetails: {
      type: Object,
      required: true
    }
  },
  computed: {
    courseStatus(){
      if(this?.chapterDetails?.solvedChapterCount === this?.chapterDetails?.chapterCount){
        return {
          badgetext: 'done',
          more: 'nochmals'
        }
      }else if(this?.chapterDetails?.solvedChapterCount >= 1 && this?.chapterDetails?.solvedChapterCount !== this?.chapterDetails?.chapterCount){
        return {
          badgetext: 'in progress',
          more: 'weiter'
        }
      }else if(this?.chapterDetails?.solvedChapterCount === 0){
        return {
          badgetext: 'open',
          more: 'ansehen'
        }
      }else{
        return null
      }
    }
  }
}
</script>
<style lang="scss" scoped>
div.badge_leiste{
  padding-top: $ga-inner;
  @include flex(row,center,space-between);
  div.badge{
    padding: $btn-small;
    border: $bo-standard;
    border-radius: $btn-small-radius;
    &.open{
      background-color: $co-neg;
    }
    &.progress{
      background-color: $co-akzent-dark;
    }
    &.done{
      background-color: $co-pos;
    }
  }
  div.more{
    @include flex(row,center,flex-end);
    img{
      transition: 0.5s;
      margin-left: 15px;
    }
  }
  @include basic_hover{
    div.more img{
      margin-left: 5px;
    }
  }
}
</style>