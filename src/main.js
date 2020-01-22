import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VeeValidate from 'vee-validate'
import VueCookies from 'vue-cookies'
import Notify from './plugins/notify'

Vue.use(VeeValidate)
Vue.use(VueCookies)
Vue.use(Notify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
