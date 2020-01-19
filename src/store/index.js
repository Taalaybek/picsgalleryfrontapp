import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*** MODULE IMPORTING ***/
import auth from './modules/auth'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: auth
  }
})
