import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'vue-cookies'

Vue.use(Vuex)

/*** MODULE IMPORTING ***/
import auth from './modules/auth'

export default new Vuex.Store({
  state: {
    requestStatus: false,
    globalMessage: ''
  },
  mutations: {
    setRequestStatus (state, bool) {
      state.requestStatus = bool
    },
    setGlobalMessage (state, message) {
      state.globalMessage = message
    },
    cleanGlobalMessage(state) {
      state.globalMessage = ''
    }
  },
  actions: {
  },
  getters: {
    getRequestStatus: state => state.requestStatus,
    getGlobalMessage: state => state.globalMessage
  },
  modules: {
    auth: auth
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, 60*60*24),
      removeItem: key => Cookies.remove(key)
    }
  })]
})
