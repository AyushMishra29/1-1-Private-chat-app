const express = require('express');
const router = express.Router();
// controllers
const user = require('../controllers/user.js')

router.get('/', user.onGetAllUsers);
router.post('/', user.onCreateUser);
router.get('/:userId', user.onGetUserById);
router.delete('/:userId', user.onDeleteUserById);

module.exports = router;