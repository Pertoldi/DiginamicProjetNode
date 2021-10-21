class UserToken {
	static token = ""
	static getToken() {
		return this.token
	}

	static setToken(newToken){
		this.token = newToken
	}
}

module.exports = UserToken

// Note: I could use private variable and getter/setter,but i'm not comfortable with them, i needed nore time