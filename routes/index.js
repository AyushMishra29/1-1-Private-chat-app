const express = require('express');
const router = express.Router();
// controllers
const user = require('../controllers/user.js')
// middlewares
const { encode } = require('../middlewares/jwt.js');

router.post('/login/:userId', encode, (req, res, next) => { });

module.exports = router;