import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Course from "../views/Course.vue"
import Chapter from "../views/Chapter.vue"
import EditorExercise from "../views/EditorExercise.vue";
import ExternalExercise from "../views/ExternalExercise.vue";
import Quiz from "../views/Quiz.vue";
import Login from "../views/Login";
import Register from "../views/Register";

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
    path: '/user/',
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
  {
    path: '/quiz/:id',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/login/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register/',
    name: 'Register',
    component: Register
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  },
  routes
})

export default router
