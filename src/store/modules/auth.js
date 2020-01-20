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
		}
	}
}

export default auth