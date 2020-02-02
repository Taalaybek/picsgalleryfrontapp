import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'vue-cookies'

Vue.use(Vuex)

/*** MODULE IMPORTING ***/
import auth from './modules/auth'
import user from './modules/user'
import album from './modules/album'
import photo from './modules/photo'

export default new Vuex.Store({
  state: {
    request: false,
    overlay: false,
    notify: {
      color: '',
      content: ''
    }
  },
  mutations: {
    requestTrue (state) {
      state.request = true
    },
    requestFalse (state) {
      state.request = false
    },
    setNotifyData(state, payload) {
      state.notify.color = payload.color
      state.notify.content = payload.content
    },
    clearNotification(state) {
      state.notify.color = ''
      state.notify.content = ''
    },
    overlayTrue(state) {
      state.overlay = true
    },
    overlayFalse(state) {
      state.overlay = false
    }
  },
  actions: {
  },
  getters: {
    getRequest: state => state.request,
    getNotify: state => state.notify,
    overlay: state => state.overlay
  },
  modules: {
    auth: auth,
    user: user,
    album: album,
    photo: photo
  },
  plugins: [createPersistedState()]
})
