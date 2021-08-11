<template>
  <router-link v-if="course" :to="courseLink">
    <div class="course_box" :class="{'sml': !loggedIn}">
      <div class="box_content">
        <h3 class="title">{{ course.title }}</h3>
        <Infobar :languages="course.languages" :chapter-count="chapterCount"/>
        <div class="content-small gc" v-html="course.description"></div>
      </div>
      <div class="badge_leiste" v-if="loggedIn && courseStatus">
        <div class="badge" :class="courseStatus.badgetext"><p class="code small">{{ courseStatus.badgetext }}</p></div>
        <div class="more">
          <p class="code small">{{ courseStatus.more }}</p>
          <img src="/img/webicons/go_dark.svg" alt="Icon weiter"/>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
import Infobar from "./Infobar.vue";
import axios from "axios";

export default {
  name: 'courseBox',
  components: {
    Infobar
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      courseUrl: '/course/',
      solvedChapters: null,
      solvedChapterCount: null,
      chapterCountLoaded: false,
      dataloaded: false,
      chapterBadged: {
        open: {
          badgetext: "open",
          more: 'ansehen',
          value: 0
        },
        inProgress: {
          badgetext: 'in progress',
          more: 'weiter',
          value: 0
        },
        done: {
          badgetext: 'done',
          more: 'nochmals',
          value: 0
        },
      }
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    courseLink() {
      return this.course.id ? this.courseUrl + this.course.id : null
    },
    chapterIDs() {
      let allChapters = [];
      this.course.chapter.forEach(details => {
        if (details?.chapter_id?.status === 'published') {
          allChapters.push(details.chapter_id.id)
        }
      })
      return allChapters
    },
    chapterCount() {
      return this.chapterIDs.length || null
    },
    courseStatus() {
      console.log(this.solvedChapterCount)
      if (!this.chapterCountLoaded) return null
      if (!this.solvedChapterCount) return this.chapterBadged["open"]
      else if (this.solvedChapterCount === this.chapterCount) return this.chapterBadged["done"]
      else if (this.solvedChapterCount === 0) return this.chapterBadged["open"]
      return this.chapterBadged["inProgress"]
    }
  },
  methods: {
    async getFinishedChapters(id) {
        const headers = {"Authorization": `Bearer ${this.$store.getters.getApiToken}`};
        const filter_user = `filter[user_id][_eq]=${id}`;
        const filter_chapter = `filter[chapter_id][_in]=${this.chapterIDs.toString()}`
        const fields = `fields=chapter_id`;
        await axios.get(`${this.$store.getters.getApiBaseUrl}user_chapter?${filter_user}&${filter_chapter}&${fields}`, {headers})
            .then((response) => {
              this.chapterCountLoaded = true
              this.solvedChapters = response.data.data
              this.solvedChapterCount = response.data.data.length
            })
    },
  },
  mounted() {
    const userid = localStorage.getItem('userid');
    if(userid) this.getFinishedChapters(userid);
  }

}
</script>
<style lang="scss" scoped>
a {
  @include linkreset();

  div.course_box {
    position: relative;
    padding: $ga-inner;
    height: 400px;

    &.sml {
      height: 350px;
    }

    background-color: $co-akzent;
    @include flex(column, flex-start, space-between);

    div.box_content {
      div {
        margin-top: 15px;
      }
    }
  }

  div.badge_leiste {
    @include flex(row, center, space-between);
    width: 100%;

    div.badge {
      color: $co-bg;
      padding: 4px 15px 7px 14px;
      border-radius: 50px;

      &.done {
        background-color: $co-pos;
      }

      &.progress {
        background-color: $co-neutral;
      }

      &.open {
        background-color: $co-neg;
      }
    }

    div.more {
      @include flex(row, center, flex-end);
      gap: 10px;

      img {
        @include icon(0, 12px)
      }
    }
  }
}

</style>