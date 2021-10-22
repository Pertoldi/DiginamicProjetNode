
const express = require('express');
const router = express.Router();
const authAdmin = require('../../middlewares/auth-admin');
const multer = require('../../middlewares/multer-config');      // permet de gérer les files upload
const animalCtrl = require('../controllers/animal')


router.post('/new', authAdmin, multer, animalCtrl.create)
router.get('/delete/:id', authAdmin, animalCtrl.delete)
router.post('/update/:id', authAdmin, multer, animalCtrl.update)

module.exports = router