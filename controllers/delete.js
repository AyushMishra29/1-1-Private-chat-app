
const deleteRoomById = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await ChatRoomModel.remove({ _id: roomId });
        const messages = await ChatMessageModel.remove({ chatRoomId: roomId })
        return res.status(200).json({ 
          success: true, 
          message: "Operation performed succesfully",
          deletedRoomsCount: room.deletedCount,
          deletedMessagesCount: messages.deletedCount,
        });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
}
    
const deleteMessageById = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await ChatRoomModel.remove({ _id: roomId });
        const messages = await ChatMessageModel.remove({ chatRoomId: roomId })
        return res.status(200).json({ 
          success: true, 
          message: "Operation performed succesfully",
          deletedRoomsCount: room.deletedCount,
          deletedMessagesCount: messages.deletedCount,
        });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
}

module.exports = {
    deleteRoomById,
    deleteMessageById
}