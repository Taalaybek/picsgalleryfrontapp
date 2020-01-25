import Vue from 'vue'
import router from '@/router/index'
import TokenService from '@/services/TokenService'
import {UNDEFINED_ERROR} from '@/services/constants'

const user = {
	state: {
		attributes: '',
		user: ''
	},

	getters: {
		getAttributes: state => state.attributes,
		getUser: state => state.user
	},

	mutations: {
		setAttributes(state, attributes) {
			state.attributes = attributes
		},
		setUser(state, object) {
			state.user = object
		}
	},

	actions: {
		fetchUserData(context) {
			context.commit('overlayTrue')
			return new Promise((resolve, reject) => {
				window.axios.get('auth/user')
					.finally(_ => context.commit('overlayFalse'))
					.then(response => {
						context.commit('setUser', response.data)
						context.commit('setAttributes', response.data.attributes)
						return resolve(response)
					})
					.catch(error => {
						if (error.response.status == 500) {
							Vue.$notify.set({content: UNDEFINED_ERROR, color: 'error'})
						}

						return reject(error)
					})
			})
		}
	}
}

export default user