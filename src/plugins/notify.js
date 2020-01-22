import store from '@/store/index'

const Notify = {
	install: function (Vue, options) {
		
		Vue.prototype.$notify = this
		Vue.$notify = this
		
		Vue.component('v-notify', ()=>import('@/components/Notify'))
	},

	set: function (options) {
		store.commit('setNotifyData', options)

		return this;
	}
}
export default Notify
