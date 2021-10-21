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
		res.redirect('/')
		// L'erreur personalisé n'est pas pertinente et est bloquante
		// res.status(401).json({ error: error | 'Requête non authentifiée en tant qu\'admin!' });  // si il y a une erreur envoie l'erreur, si un pb sans erreur renvoyé -> req non authentifié
	}
};