import Vue from 'vue'
import { UNDEFINED_ERROR } from '@/services/constants'

const album = {
	namespaced: true,
	state: {
	 lastAlbum: {}
	},

	getters: {
		getLastAlbum: state => state.lastAlbum
	},

	mutations: {
		setNewAlbum(state, album) {
			state.lastAlbum = album
		},
		deleteLastAlbum(state) {
			state.lastAlbum = {}
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
		}
	}
}

export default album
