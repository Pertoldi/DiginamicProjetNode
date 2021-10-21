const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


router.post('/create', userCtrl.create)
router.post('/connect', userCtrl.connect)
router.get('/disconnect', userCtrl.disconnect)


module.exports = router