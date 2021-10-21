const express = require('express');
const UserToken = require('../../session/token');
const jwt = require('jsonwebtoken')
const router = express.Router();

// TODO clean, userToken test
// UserToken.setToken("Haloa")
// console.log(UserToken.getToken());


let token = UserToken.getToken()
console.log('token is :', token)
let isAdmin = false

function fnIsAdmin() {
	if (!!token) {
		const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
		isAdmin = decodedToken.isAdmin;
	} else {
		isAdmin = false
	}	
}

router.get('/', (req, res) => {
	 fnIsAdmin()
	 console.log(isAdmin);
	res.render('index', { userToken: UserToken.getToken(), isAdmin: isAdmin })
})

router.get('/connect', (req, res) => {
	 fnIsAdmin()
	res.render('connect',  { userToken: UserToken.getToken(), isAdmin  })
})

router.get('/animaux', (req, res) => {
	 fnIsAdmin()
	res.render('animaux',  { userToken: UserToken.getToken(), isAdmin  })
})

module.exports = router