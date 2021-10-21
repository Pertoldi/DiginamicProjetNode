const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/connect', userCtrl.connect)
router.post('/create', userCtrl.create)


module.exports = router