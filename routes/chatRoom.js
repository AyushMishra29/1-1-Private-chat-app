const express = require('express');
const router = express.Router();
// controllers
const chatRoom = require('../controllers/chatRoom.js')

router.get('/', chatRoom.getRecentConversation);
router.get('/:roomId', chatRoom.getConversationByRoomId);
router.post('/initiate', chatRoom.initiate);
router.post('/:roomId/message', chatRoom.postMessage);
router.put('/:roomId/mark-read', chatRoom.markConversationReadByRoomId);


module.exports = router;