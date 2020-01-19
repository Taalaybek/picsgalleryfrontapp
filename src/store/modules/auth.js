const auth = {
	state: {
		isAuthenticated: false
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