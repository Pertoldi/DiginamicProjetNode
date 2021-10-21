const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
	res.render('index')
})

router.get('/connect', (req, res) => {
	res.render('connect')
})

router.get('/animaux', (req, res) => {
	res.render('animaux')
})

module.exports = router