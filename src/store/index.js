import { createStore } from 'vuex'
import axios from "axios"

export default createStore({
  state: {
  },
  mutations: {
    getCode(state, content){
      console.log(content)
    }
  },
  actions: {
    getCode({ commit }) {
      axios.get('http://188.166.165.104/items/users?access_token=hallo').then(response => {
        commit('getCode', response.data.data);
      })
    }
  },
  modules: {
  }
})
