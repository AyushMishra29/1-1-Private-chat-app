const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema(
  {
    userIds: {
        type: Array,
    },
    type: {
        type: String,
        enum: ["consumer-to-consumer" , "consumer-to-support"]
        },
    chatInitiator: {
          type: String,
         },
  },
  {
    timestamps: true,
    collection: "chatrooms",
  }
);

chatRoomSchema.statics.initiateChat = async function (
	userIds, type, chatInitiator
) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      type,
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        chatRoomId: availableRoom._doc._id,
        type: availableRoom._doc.type,
      };
    }

    const newRoom = await this.create({ userIds, type, chatInitiator });
    return {
      isNew: true,
      message: 'creating a new chatroom',
      chatRoomId: newRoom._doc._id,
      type: newRoom._doc.type,
    };
  } catch (error) {
    console.log('error on start chat method', error);
    throw error;
  }
}

module.exports = mongoose.model("Chatroom", chatRoomSchema);

