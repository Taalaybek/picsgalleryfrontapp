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
    notify: {
      color: '',
      content: ''
    }
  },
  mutations: {
    setRequestStatus (state, bool) {
      state.requestStatus = bool
    },
    setNotifyData(state, payload) {
      state.notify.color = payload.color
      state.notify.content = payload.content
    },
    clearNotification(state) {
      state.notify.color = ''
      state.notify.content = ''
    }
  },
  actions: {
  },
  getters: {
    getRequestStatus: state => state.requestStatus,
    getNotify: state => state.notify
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
