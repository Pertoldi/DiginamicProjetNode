//auth pour authentification
const jwt = require('jsonwebtoken');
const UserToken = require('../../session/token');

module.exports = (req, res, next) => {
	try {
		const token = UserToken.getToken()
		const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
		const isAdmin = decodedToken.isAdmin;
		if (isAdmin) { //Si on a un userId dans le corps de la requête et que celui-ci est différent de l'userId du token
			next();
		} else {
			res.redirect('/')
		}
	} catch (error) {
		res.status(401).json({ error: error | 'Requête non authentifiée !' });  // si il y a une erreur envoie l'erreur, si un pb sans erreur renvoyé -> req non authentifié
	}
};