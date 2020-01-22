import Vue from 'vue'
import router from '@/router/index'

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
		},
		auth_detectViaCookies (state) {
			if (Vue.$cookies.isKey('access_token') && Vue.$cookies.get('access_token')) {
				state.isAuthenticated = true
			} else {
				state.isAuthenticated = false
			}
		}
	},

	actions: {
		auth_register (context, data) {
			context.commit('requestTrue')
			return new Promise(function (resolve, reject) {
				window.axios.post('auth/register', data)
					.then(response => {
						context.commit('requestFalse')
						Vue.$notify.set({content: `${response.data.message} Check yout email`, color: 'success'})
						return resolve(response)
					})
					.catch(error => {
						context.commit('requestFalse')
						return reject(error)
					})
			})
		},

		auth_login (context, data) {
			context.commit('requestTrue')
			return new Promise((resolve, reject) => {
				window.axios.post('auth/login', data)
				.then(response => {

					context.commit('requestFalse')
					Vue.$cookies.set('token_type', response.data.token_type)
					Vue.$cookies.set('access_token', response.data.access_token, response.data.expires_in / 60)
					Vue.$cookies.set('refresh_token', response.data.refresh_token, response.data.expires_in / 60)
					context.commit('auth_detectViaCookies')

					return resolve(response)
				})
				.catch(error => {
					context.commit('requestFalse')
					if (error.response.status === 401) {
						Vue.$notify.set({content: error.response.data.message, color: 'error'})
					}

					if (error.response.status === 500) {
						Vue.$notify.set({content: 'The server is not responding', color: 'error'})
					}
					return reject(error)
				})
			})
		},

		auth_logout (context) {
			context.commit('overlayTrue')
			return new Promise((resolve, reject) => {
				window.axios.get('auth/logout', { headers: { 'Authorization': `${Vue.$cookies.get('token_type')} ${Vue.$cookies.get('access_token')}` }})
					.then(response => {
						context.commit('overlayFalse')
						context.commit('auth_error')
						context.dispatch('auth_cleanCookies')
						Vue.$notify.set({content: response.data.message, color: 'success'})
						return resolve(response)
					})
					.catch(error => {
						context.commit('overlayFalse')
						if (error.response.status == 401) {
							context.commit('auth_error')
							context.dispatch('auth_cleanCookies')
							Vue.$notify.set({content: 'Invalid access token', color: 'error'})
							router.push('/login')
						}

						if (error.response.status == 500) {
							Vue.$notify.set({content: 'The server is not responding', color: 'error'})
						}

						return reject(error)
					})
			})
		},

		auth_cleanCookies () {
			Vue.$cookies.remove('token_type')
			Vue.$cookies.remove('access_token')
			Vue.$cookies.remove('refresh_token')
		}
	}
}

export default auth