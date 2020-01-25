class TokenServiceErrors extends Error {
	constructor(message) {
		super(message)
		this.name = 'TokensServiceException'
	}
}

export default TokenServiceErrors
