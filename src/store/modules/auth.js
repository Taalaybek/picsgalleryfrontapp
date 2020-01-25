import Vue from 'vue'
import router from '@/router/index'
import TokenService from '@/services/TokenService'
import { UNDEFINED_ERROR, INVALID_TOKEN } from '@/services/constants'

const auth = {
	state: {
		isAuthenticated: false
	},

	getters: {
		checkAuth: state => state.isAuthenticated
	},

	mutations: {
		auth_success (state) {
			state.isAuthenticated = true
		},

		auth_error (state) {
			state.isAuthenticated = false
		}
	},

	actions: {
		register (context, data) {
			context.commit('requestTrue')
			return new Promise(function (resolve, reject) {
				window.axios.post('auth/register', data)
					.finally(_=> context.commit('requestFalse'))
					.then(response => {
						Vue.$notify.set({content: `${response.data.message} Check yout email`, color: 'success'})
						return resolve(response)
					})
					.catch(error => reject(error))
			})
		},

		login (context, data) {
			context.commit('requestTrue')
			return new Promise((resolve, reject) => {
				window.axios.post('auth/login', data)
				.finally(() => context.commit('requestFalse'))
				.then(({data})=> {
					TokenService.setFullAuthorization(data).setHeaders()
					return resolve(true)
				})
				.then(response => {
					context.dispatch('fetchUserData')
					return resolve(response)
				})
				.catch(({response}) => {
					if (response.status === 401) {
						Vue.$notify.set({content: response.data.message, color: 'error'})
					}

					if (response.status === 500) {
						Vue.$notify.set({content: UNDEFINED_ERROR, color: 'error'})
					}
					return reject(response)
				})
			})
		},

		auth_logout (context) {
			context.commit('overlayTrue')
			context.dispatch('checkAuthorization')
			return new Promise((resolve, reject) => {
				window.axios.get('auth/logout')
					.finally(_ => context.commit('overlayFalse'))
					.then(response => {
						context.commit('auth_error')
						TokenService.cleanTokens()
						Vue.$notify.set({content: response.data.message, color: 'success'})
						return resolve(response)
					})
					.catch(error => {
						if (error.response.status == 401) {
							context.commit('auth_error')
							TokenService.cleanTokens()
							Vue.$notify.set({content: INVALID_TOKEN, color: 'error'})
							router.push('/login')
						}

						if (error.response.status == 500) {
							Vue.$notify.set({content: UNDEFINED_ERROR, color: 'error'})
						}

						return reject(error)
					})
			})
		},

		checkAuthorization(context) {
			if (TokenService.isAuthenticated()) {
				TokenService.setHeaders()
				context.commit('auth_success')
			} else {
				TokenService.cleanTokens()
				context.commit('auth_error')
			}
		}
	}
}

export default auth