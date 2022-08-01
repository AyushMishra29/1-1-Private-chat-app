const express = require('express');
const router = express.Router();
// controllers
const user = require('../controllers/user.js')
// middlewares
const { encode } = require('../middlewares/jwt.js');

router.post('/login/:userId', encode, (req, res) => {
    return res.status(200).json({
        success: true,
        authorization: req.authToken,
      });
  });

module.exports = router;