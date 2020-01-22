import store from '@/store/index'

export function auth({ next, store }){
	store.commit('auth_detectViaCookies')
	if(!store.getters.checkAuth){
		return next({
			name: 'login'
		})
	}
	
	return next()
}
