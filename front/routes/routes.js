const express = require('express');
const UserToken = require('../../session/token');
const jwt = require('jsonwebtoken')
const router = express.Router();
const authAdmin = require('../../middlewares/authAdmin');
const Animal = require('../../back/models/animal')




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
	res.render('index', { userToken: UserToken.getToken(), isAdmin: fnIsAdmin() })// Les parametres servent à la gestion du nav
})

router.get('/connect', (req, res) => {
	res.render('connect', { userToken: UserToken.getToken(), isAdmin: fnIsAdmin() })
})

router.get('/animaux', async (req, res) => {
	const animals = await Animal.find()
	res.render('animaux', { userToken: UserToken.getToken(), isAdmin: fnIsAdmin(), animals })
})

router.get('/admin/ajout-animal', authAdmin, (req, res) => {
	res.render('admin-ajout-animal', { userToken: UserToken.getToken(), isAdmin: fnIsAdmin() })
})

router.get('/admin/modifier-supprimer-animaux', authAdmin, async (req, res) => {
	const animals = await Animal.find()
	res.render('admin-animaux', { userToken: UserToken.getToken(), isAdmin: fnIsAdmin(), animals })
})

router.get('/admin/modifier-animal/:id', authAdmin, async (req, res) => {
	id = req.params.id
	const animal = await Animal.findById(id)
	res.render('admin-modifier-animal', { userToken: UserToken.getToken(), isAdmin: fnIsAdmin(), animal })
})

module.exports = router