import store from '@/store/index'

export function guest({ next, store }){
	store.dispatch('checkAuthorization')
	if(store.getters.checkAuth){
		return next({
			name: 'owner'
		})
	}
	
	return next()
}