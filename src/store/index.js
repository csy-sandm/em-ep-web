import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuShowState: false
  },
  mutations: {
    setMenuShowFalse (state) {
      state.menuShowState = false
    },
    setMenuShowTrue (state) {
      state.menuShowState = true
    }
  },
  actions: {
  },
  modules: {
  }
})
