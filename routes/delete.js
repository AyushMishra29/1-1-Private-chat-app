const express = require('express');
const router = express.Router();
// controllers
const deleteController = require('../controllers/delete.js')

router.delete('/room/:roomId', deleteController.deleteRoomById);
router.delete('/message/:messageId', deleteController.deleteMessageById);



module.exports = router;