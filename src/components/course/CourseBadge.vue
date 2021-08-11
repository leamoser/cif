<template>
  <div class="badge_leiste" v-if="courseStatus">
    <div class="badge" :class="courseStatus.badgetext"><p class="code small">{{courseStatus?.badgetext}}</p></div>
    <div class="more">
      <p class="code small">{{courseStatus?.more}}</p>
      <img src="/img/webicons/go_dark.svg" alt="Icon weiter" />
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
  @include flex(row,center,space-between);
  width: 100%;
  div.badge{
    color: $co-bg;
    padding: 4px 15px 7px 14px;
    border-radius: 50px;
    &.done{
      background-color: $co-pos;
    }
    &.progress{
      background-color: $co-neutral;
    }
    &.open{
      background-color: $co-neg;
    }
  }
  div.more{
    @include flex(row,center,flex-end);
    gap: 10px;
  }
}
</style>