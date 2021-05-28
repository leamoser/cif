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
import Impressum from "../views/Impressum";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title: 'CIF* - Online Frontendentwicklung lernen'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{
      title: 'CIF* - About'
    }
  },
  {
    path: '/impressum/',
    name: 'Impressum',
    component: Impressum,
    meta:{
      title: 'CIF* - Impressum'
    }
  },
  {
    path: '/user/',
    name: 'User',
    component: User,
    meta:{
      title: 'CIF* - Profil'
    }
  },
  {
    path: '/course/:id',
    name: 'Course',
    component: Course,
    meta:{
      title: 'CIF* - Kurs'
    }
  },
  {
    path: '/chapter/:id',
    name: 'Chapter',
    component: Chapter,
    meta:{
      title: 'CIF* - Kapitel'
    }
  },
  {
    path: '/editorexercise/:id',
    name: 'EditorExercise',
    component: EditorExercise,
    meta:{
      title: 'CIF* - Übung'
    }
  },
  {
    path: '/externalexercise/:id',
    name: 'ExternalExercise',
    component: ExternalExercise,
    meta:{
      title: 'CIF* - Übung'
    }
  },
  {
    path: '/quiz/:id',
    name: 'Quiz',
    component: Quiz,
    meta:{
      title: 'CIF* - Quiz'
    }
  },
  {
    path: '/login/',
    name: 'Login',
    component: Login,
    meta:{
      title: 'CIF* - Login'
    }
  },
  {
    path: '/register/',
    name: 'Register',
    component: Register,
    meta:{
      title: 'CIF* - Registrieren'
    }
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
