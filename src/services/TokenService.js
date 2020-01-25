import Vue from 'vue'
import Cookies from 'vue-cookies'
import TokenServiceErrors from '@/errors/TokenServiceErrors'

class TokenService {

	static ACCESS_TOKEN = 'access_token'
	static REFRESH_TOKEN = 'refresh_token'
	static TOKEN_TYPE = 'token_type'

	constructor() {
		this.cookies = Cookies
	}

	/**
	 * Returns access token
	 *
	 * @return String
	 */
	getAccessToken() {
		return this.cookies.get(TokenService.ACCESS_TOKEN)
	}

	/**
	 * Accepts access token and
	 * token's expires time and
	 * store into cookies
	 *
	 * @param String token 
	 * @param Integer expire
	 * @return this
	 */
	setAccessToken(token, expire) {
		this.cookies.set(TokenService.ACCESS_TOKEN, token, expire / 60)

		return this
	}

	/**
	 * Checks for the existence
	 * of the access token
	 *
	 * @return Boolean
	 */
	hasAccessToken() {
		return this.cookies.isKey(TokenService.ACCESS_TOKEN)
	}

	/**
	 * Accepts refresh token
	 * and store into cookies
	 *
	 * @param string token
	 * @return this
	 */
	setRefreshToken(token) {
		this.cookies.set(TokenService.REFRESH_TOKEN, token)

		return this
	}

	/**
	 * Returns refresh token
	 *
	 * @return String
	 */
	getRefreshToken() {
		return this.cookies.get(TokenService.REFRESH_TOKEN)
	}

	/**
	 * Checks for the existence
	 * of the refresh token
	 *
	 * @return Boolean
	 */
	hasRefreshToken() {
		return this.cookies.isKey(TokenService.TOKEN_TYPE)
	}

	/**
	 * Accepts token type
	 * and store into cookies
	 *
	 * @param String type
	 * @return this
	 */
	setTokenType(type) {
		this.cookies.set(TokenService.TOKEN_TYPE, type)

		return this
	}

	/**
	 * Returns token type
	 * @return String
	 */
	getTokenType() {
		return this.cookies.get(TokenService.TOKEN_TYPE)
	}

	/**
	 * Checks for the existence
	 * of the token type
	 *
	 * @return Boolean
	 */
	hasTokenType() {
		return this.cookies.isKey(TokenService.TOKEN_TYPE)
	}

	/**
	 * Accepts object and spreads its properties
	 * access_token, refresh_token and token_type are string.
	 * expires_in is time in milliseconds
	 *
	 * @param Object param 
	 * @return this
	 */
	setFullAuthorization({ access_token, refresh_token, token_type, expires_in }) {
		this.setAccessToken(access_token, expires_in)
		this.setTokenType(token_type)
		this.setRefreshToken(refresh_token)

		return this
	}

	/**
	 * Determines authentication
	 * @return Boolean
	 */
	isAuthenticated() {
		return this.hasTokenType() && this.hasAccessToken()
	}

	/**
	 * Returns full authorization string
	 * token type with access token
	 *
	 * @return String | null
	 */
	getFullAuthorization() {
		if (this.isAuthenticated()) {
			return `${this.getTokenType()} ${this.getAccessToken()}`
		}

		return null
	}

	/**
	 * Determines token authorization
	 * into axios instance
	 *
	 * @return this
	 */
	setHeaders() {
		if (this.getFullAuthorization() == null) {
			throw new TokenServiceErrors('Token are not available')
		}

		window.axios.defaults.headers.common['Authorization'] = this.getFullAuthorization()
		Vue.axios.defaults.headers.common['Authorization'] = this.getFullAuthorization()

		return this
	}

	/**
	 * Removes all authorization 
	 * data from cookies
	 * @return this
	 */
	cleanTokens() {
		this.cookies.remove(TokenService.ACCESS_TOKEN)
		this.cookies.remove(TokenService.REFRESH_TOKEN)
		this.cookies.remove(TokenService.TOKEN_TYPE)
		delete window.axios.defaults.headers.common['Authorization']
		delete Vue.axios.defaults.headers.common['Authorization']

		return this
	}

}

export default new TokenService()
