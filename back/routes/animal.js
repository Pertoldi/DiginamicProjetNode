
const express = require('express');
const router = express.Router();
const authAdmin = require('../../middlewares/authAdmin');
const multer = require('../../middlewares/multer-config');      // permet de gérer les files upload

router.post('/new', authAdmin, multer, (req, res) => {
	console.log(req.body);
	res.redirect('/admin/ajout-animal')
})

module.exports = router