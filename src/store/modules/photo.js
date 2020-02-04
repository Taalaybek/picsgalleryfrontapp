import Vue from 'vue'

const photo = {
	namespaced: true,

	state: {
	 photo: {}
	},

	getters: {
		getPhoto: state => state.photo
	},

	mutations: {
		setNewPhoto(state, payload) {
			state.photo = payload
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
				 	return reject(error)
				 })
		 })
		}
	}
}

export default photo
