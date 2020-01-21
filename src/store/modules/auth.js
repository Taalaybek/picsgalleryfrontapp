import Vue from 'vue'

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
			}

			state.isAuthenticated = true
		}
	},

	actions: {
		auth_register (context, data) {
			context.commit('setRequestStatus', true)
			return new Promise(function (resolve, reject) {
				window.axios.post('auth/register', data)
					.then(response => {
						context.commit('setRequestStatus', false)
						return resolve(response)
					})
					.catch(error => {
						context.commit('setRequestStatus', false)
						return reject(error)
					})
			})
		},

		auth_login (context, data) {
			context.commit('setRequestStatus', true)
			return new Promise((resolve, reject) => {
				window.axios.post('auth/login', data)
				.then(response => {

					context.commit('setRequestStatus', false)
					Vue.$cookies.set('token_type', response.data.token_type)
					Vue.$cookies.set('access_token', response.data.access_token)
					Vue.$cookies.set('refresh_token', response.data.refresh_token)
					Vue.$cookies.set('expires_in', response.data.expires_in)
					Vue.$cookies.set('token', response.data.token_type+' '+response.data.access_token)
					context.commit('auth_detectViaCookies')

					return resolve(response)
				})
				.catch(error => {
					context.commit('setRequestStatus', false)
					return reject(error)
				})
			})
		}
	}
}

export default auth