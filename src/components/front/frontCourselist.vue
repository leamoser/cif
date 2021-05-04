<template>
  <div class="course_list">
    <div class="intro_text">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
    <div class="courses">
      <courseBox v-for="course in courses" :key="course.id" :course="course" />
    </div>
  </div>
</template>


<script>
import courseBox from "../courseBox.vue";

export default{

  name: 'frontCourselist',

  components: {
    courseBox
  },

  data(){
    return {
      title: 'Alle angebotenen Kurse',
      description: 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
    }
  },

  computed: {
    courses(){
      return this.$store.state.allCourses
    }
  },

  methods: {
  },

  mounted() {
    this.$store.dispatch('getAllCourses');
  }

}
</script>