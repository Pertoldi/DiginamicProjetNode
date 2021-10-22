//auth pour authentification
const jwt = require('jsonwebtoken');
const UserToken = require('../session/token');

module.exports = (req, res, next) => {
	try {
		const token = UserToken.getToken()
		const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
		const isAdmin = decodedToken.isAdmin;
		if (isAdmin) {
			next();
		} else {
			res.redirect('/')
		}
	} catch (error) {
		console.error('error -> ', error);
		res.redirect('/')
	}
};