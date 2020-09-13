import Vue from 'vue'

const photo = {
	namespaced: true,

	state: {
	 photo: {},
	 tempPhotos: new Array()
	},

	getters: {
		getPhoto: state => state.photo,
		getTempPhotos: state => state.tempPhotos,
		getTemporaryPhotosId: state => {
			const array = []
			if (state.tempPhotos.length !== 0) {
				state.tempPhotos.forEach(photo => {
					array.push(photo.id)
				})

				return array
			}

			return array
		}
	},

	mutations: {
		setNewPhoto(state, payload) {
			state.photo = payload
		},

		setTempPhotos(state, payload) {
			if (state.tempPhotos.length == 0) {
				state.tempPhotos = [payload]
			} else if (state.tempPhotos instanceof Array && state.tempPhotos.length > 0) {
				state.tempPhotos.push(payload)
			}
		},

		clearPhotoTemps(state) {
			state.tempPhotos = new Array()
		}
	},

	actions: {
		createNewPhotoAfterAlbum({ state, commit, rootState, rootGetters }, data) {
		 return new Promise((resolve, reject) => {
		 	window.axios.post(`/photos/${rootGetters['album/getLastAlbum'].id}`, data, { 'Content-type': 'multipart/form-data' })
			 	.then(({data}) => {
				 	commit('setNewPhoto', data)
					return resolve(true)
				 })
				 .catch(error => {
				 	if (error.response.status == 500) {
					 Vue.$notify.set({content: process.env.VUE_APP_UNDEFINED_ERROR, color: 'error'})
					}

				 	if (error.response.status == 404) {
				 		Vue.$notify.set({
							content: process.env.VUE_APP_RESOURCE_NOT_FOUND,
							color: 'error'
						})
					}

				 	return reject(error)
				 })
		 })
		}
	}
}

export default photo
