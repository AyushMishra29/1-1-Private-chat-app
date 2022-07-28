const express = require('express');
const router = express.Router();
// controllers
const user = require('../controllers/user.js')

router.get('/', user.onGetAllUsers);
router.post('/', user.onCreateUser);
router.get('/:id', user.onGetUserById);
router.delete('/:id', user.onDeleteUserById);

module.exports = router;