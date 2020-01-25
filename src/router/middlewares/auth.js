import store from '@/store/index'

export function auth({ next, store }){
	store.dispatch('checkAuthorization')
	if(!store.getters.checkAuth){
		return next({
			name: 'login'
		})
	}
	
	return next()
}
