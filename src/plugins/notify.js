import Vue from 'vue'
import store from '@/store/index'

const Notify = {
	install: function (Vue, options) {
		Vue.component('v-notify', ()=>import('@/components/Notify'))
		
		Vue.prototype.$notify = (options) => {
			store.commit('setNotifyData', options)
		}
	}
}
export default Notify
