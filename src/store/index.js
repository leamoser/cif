import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    //API-SETTING
    standartStatus: 'published',
    apiBaseUrl: process.env.VUE_APP_API_COLLECTION_URL,
    apiAdminUrl: process.env.VUE_APP_API_BASE_URL,
    apiToken: process.env.VUE_APP_API_TOKEN,
    apiAssetUrl: process.env.VUE_APP_API_ASSETS_URL,
    //BASIC
    appName: 'CIF*',
    appSlogan: 'Lerne online die tollsten Frontend-Programmiersprachen.',
    //KURSE
    allCourses: {},
    unitsById: {},
    activeCourse: {
      id: 1,
      title: ''
    },
    activeChapter: {
      id: 1,
      title: ''
    }
  },

  getters: {

  },

  mutations: {
    GET_ALL_COURSES(state, allCourses){
      state.allCourses = allCourses
    },
    GET_ALL_UNITS_BY_CHAPTER_ID(state, unitsById){
      state.unitsById = unitsById
    },
    CHANGE_ACTIVE_COURSE(state, course){
      state.activeCourse.id = course.id
      state.activeCourse.title = course.title
    },
    CHANGE_ACTIVE_CHAPTER(state, chapter){
      state.activeChapter.id = chapter.id
      state.activeChapter.title = chapter.title
    }
  },

  actions: {
    getAllCourses({ commit }){
      const headers = {
        "Authorization": `Bearer ${this.state.apiToken}`
      };
      const filter = `?filter[status][_eq]=${this.state.standartStatus}`
      const fields = `&fields=id,status,title,description,languages,chapter.chapter_id.id,chapter.chapter_id.status`
      axios.get(`${this.state.apiBaseUrl}course${filter}${fields}`, { headers })
          .then(response => {
            commit('GET_ALL_COURSES', response.data.data)
          })
    },
    getAllUnitsById({ commit }, chapterId){
      const headers = {
        "Authorization": `Bearer ${this.state.apiToken}`
      };
      const filter = `?filter[chapter_id][_eq]=${chapterId}`
      const fields = `&fields=id,title,theory,editor_exercise,external_exercise,type`
      axios.get(`${this.state.apiBaseUrl}unit${filter}${fields}`, { headers })
          .then(response => {
            commit('GET_ALL_UNITS_BY_CHAPTER_ID', response.data.data)
          })
    },
    changeActiveCourse({commit}, course){
      commit('CHANGE_ACTIVE_COURSE', course)
    },
    changeActiveChapter({commit}, chapter){
      commit('CHANGE_ACTIVE_CHAPTER', chapter)
    }
  },

  modules: {
  }
})
