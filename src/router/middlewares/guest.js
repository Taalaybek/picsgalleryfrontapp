import store from '@/store/index'

export function guest({ next, store }){
	store.commit('auth_detectViaCookies')
	if(store.getters.checkAuth){
		return next({
			name: 'owner'
		})
	}
	
	return next()
}