const express = require('express');
const UserToken = require('../../session/token');
const jwt = require('jsonwebtoken')
const router = express.Router();

// TODO clean, userToken test
// UserToken.setToken("Haloa")
// console.log(UserToken.getToken());




function fnIsAdmin() {
	let token = UserToken.getToken()
	let isAdmin = false
	if (!!token) {
		const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
		isAdmin = decodedToken.isAdmin;
	}
	return isAdmin

}

router.get('/', (req, res) => {
	res.render('index', { userToken: UserToken.getToken(), isAdmin: fnIsAdmin() })
})

router.get('/connect', (req, res) => {
	res.render('connect', { userToken: UserToken.getToken(), isAdmin: fnIsAdmin() })
})

router.get('/animaux', (req, res) => {
	res.render('animaux', { userToken: UserToken.getToken(), isAdmin: fnIsAdmin() })
})

router.get('/admin/ajout-animaux', (req, res) => {
	res.render('ajout-animaux', { userToken: UserToken.getToken(), isAdmin: fnIsAdmin() })
})

module.exports = router