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
    appClaim: '* Code is fun',
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
    },
    //USER
    userIsLoggedIn: false,
    userInfos: {}
  },

  getters: {
    getApiToken: state => {
      return state.apiToken || null
    },
    getUserInfos: state => {
      return state.userInfos || null
    },
    isUserLoggedIn: state => {
      return state.userIsLoggedIn || null
    },
    getUserMarkedCourses: state => {
      return state.userInfos.marked_course || null
    }
  },

  mutations: {
    //CONTENT
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
    },
    //USER
    SET_USER_ACTIVE(state,chapter){
      state.userIsLoggedIn = true
    },
    SET_USER_INACTIVE(state,chapter){
      state.userIsLoggedIn = false
    },
    GET_USER_INFORMATION_BY_USERNAME(state, userInfos){
      state.userInfos = userInfos
    },
    CLEAR_USER_INFORMATION(state){
      state.userInfos = {}
    }
  },

  actions: {
    //CONTENT
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
    },
    //USER
    setUserActive({commit}){
      commit('SET_USER_ACTIVE')
    },
    setUserInactive({commit}){
      commit('SET_USER_INACTIVE')
    },
    getUserInformationByUsername({commit}, username){
      const headers = {
        "Authorization": `Bearer ${this.state.apiToken}`
      };
      const filter = `?filter[username][_eq]=${username}`
      const fields = `&fields=id,firstname,lastname,username,email,marked_course,solved_chapters`
      axios.get(`${this.state.apiBaseUrl}user${filter}${fields}`, { headers })
          .then(response => {
            commit('GET_USER_INFORMATION_BY_USERNAME', response.data.data[0])
          })
    },
    clearUserInfo({commit}){
      commit('CLEAR_USER_INFORMATION');
    }
  },

  modules: {
  }
})
