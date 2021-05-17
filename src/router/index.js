import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Course from "../views/Course.vue"
import Chapter from "../views/Chapter.vue"
import EditorExercise from "../views/EditorExercise.vue";
import ExternalExercise from "../views/ExternalExercise.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User
  },
  {
    path: '/course/:id',
    name: 'Course',
    component: Course
  },
  {
    path: '/chapter/:id',
    name: 'Chapter',
    component: Chapter
  },
  {
    path: '/editorexercise/:id',
    name: 'EditorExercise',
    component: EditorExercise
  },
  {
    path: '/externalexercise/:id',
    name: 'ExternalExercise',
    component: ExternalExercise
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
