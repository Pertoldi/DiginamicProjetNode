
const express = require('express');
const router = express.Router();
const authAdmin = require('../../middlewares/authAdmin');
const multer = require('../../middlewares/multer-config');      // permet de gérer les files upload
const animalCtrl = require('../controllers/animal')


router.post('/new', authAdmin, multer, animalCtrl.create)

module.exports = router