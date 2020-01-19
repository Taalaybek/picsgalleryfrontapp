const auth = {
	state: {
		isAuthenticated: true
	},

	getters: {
		checkAuth: state => {
			return state.isAuthenticated;
		}
	},

	mutations: {
	
	},

	actions: {
	
	}
}

export default auth