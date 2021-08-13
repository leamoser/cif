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
import NotFound from "../views/NotFound";
import About from "../views/About";
import Howto from "../views/Howto";
const appName = 'CIF*'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title: `${appName} - Online Frontendentwicklung lernen`
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta:{
      title: `${appName} - About`
    }
  },
  {
    path: '/impressum/',
    name: 'Impressum',
    component: Impressum,
    meta:{
      title: `${appName} - Impressum`
    }
  },
  {
    path: '/how-to/',
    name: 'How To',
    component: Howto,
    meta:{
      title: `${appName} - How To`
    }
  },
  {
    path: '/user/',
    name: 'User',
    component: User,
    meta:{
      title: `${appName} - Profil`
    }
  },
  {
    path: '/course/:id',
    name: 'Course',
    component: Course,
    meta:{
      title: `${appName} - Kurs`
    }
  },
  {
    path: '/chapter/:id',
    name: 'Chapter',
    component: Chapter,
    meta:{
      title: `${appName} - Kapitel`
    }
  },
  {
    path: '/editorexercise/:id',
    name: 'EditorExercise',
    component: EditorExercise,
    meta:{
      title: `${appName} - Übung`
    }
  },
  {
    path: '/externalexercise/:id',
    name: 'ExternalExercise',
    component: ExternalExercise,
    meta:{
      title: `${appName} - Übung`
    }
  },
  {
    path: '/quiz/:id',
    name: 'Quiz',
    component: Quiz,
    meta:{
      title: `${appName} - Quiz`
    }
  },
  {
    path: '/login/',
    name: 'Login',
    component: Login,
    meta:{
      title: `${appName} - Login`
    }
  },
  {
    path: '/register/',
    name: 'Register',
    component: Register,
    meta:{
      title: `${appName} - Registrieren`
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: `${appName} - Error 404`
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  },
  routes
})

export default router
