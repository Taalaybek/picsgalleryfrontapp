import Vue from 'vue'

const album = {
	namespaced: true,
	state: {
	 lastAlbum: {},
	 currentUserAlbums: {}
	},

	getters: {
		getLastAlbum: state => state.lastAlbum,
		getCurrentUserAlbums: state => state.currentUserAlbums
	},

	mutations: {
		setNewAlbum(state, album) {
			state.lastAlbum = album
		},
		deleteLastAlbum(state) {
			state.lastAlbum = {}
		},
		setCurrentUserAlbums(state, list) {
			state.currentUserAlbums = list
		}
	},

	actions: {
		createNewAlbum(context, data) {
			return new Promise((resolve, reject) => {
				window.axios.post('/albums', data)
					.then(response => {
						context.commit('setNewAlbum', response.data)
						return resolve(response)
					})
					.catch(error => {
						return reject(error)
					})
			})
		},

		fetchAlbumsOfCurrentUser(context) {
			context.commit('overlayTrue', null, {root: true})
			return new Promise((resolve, reject) => {
				window.axios.get('/albums/authenticatedUserAlbums')
					.finally(() => context.commit('overlayFalse', null, {root: true}))
					.then(({ data }) => {
						context.commit('setCurrentUserAlbums', data)
						return resolve(true)
					})
					.catch(error => {
						return reject(error)
					})
			})
		}
	}
}

export default album
