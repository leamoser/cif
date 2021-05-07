import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    //API-SETTING
    standartStatus: 'published',
    apiBaseUrl: process.env.VUE_APP_API_COLLECTION_URL,
    apiAdminUrl: process.env.VUE_APP_API_BASE_URL,
    apiToken: process.env.VUE_APP_API_TOKEN,
    //BASIC
    appName: 'CIF*',
    appSlogan: 'Lerne online die tollsten Frontend-Programmiersprachen.',
    //KURSE
    allCourses: {}
  },

  getters: {

  },

  mutations: {
    GET_ALL_COURSES(state, allCourses){
      state.allCourses = allCourses
    }
  },

  actions: {
    getAllCourses({ commit }){
      const headers = {
        "Authorization": `Bearer ${this.state.apiToken}`
      };
      axios.get(`${this.state.apiBaseUrl}course?filter[status][_eq]=${this.state.standartStatus}`, { headers })
          .then(response => {
            commit('GET_ALL_COURSES', response.data.data)
          })
    }
  },

  modules: {
  }
})
