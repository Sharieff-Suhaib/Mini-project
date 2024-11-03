const Message = require("../models/messages");
// const sendMessage = async (req, res) => {
//   const { senderId, receiverId, content } = req.body;
//   try {
//     const message = await Message.createMessage(senderId, receiverId, content);
//     res.json({ message });
//   } catch (err) {
//     res.status(500).json({ error: "Unable to send message" });
//   }
// };

// const getConversations = async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     const conversations = await Message.findConversations(userId);
//     res.json({ conversations });
//   } catch (err) {
//     res.status(500).json({ error: "Unable to fetch conversations" });
//   }
// };
// const getConversation = async (req, res) => {
//   const { userId1, userId2 } = req.params;
//   try {
//     const conversation = await Message.findConversation(userId1, userId2);
//     res.json({ conversation });
//   } catch (err) {
//     res.status(500).json({ error: "Unable to find the conversation" });
//   }
// };


// module.exports = {
//   sendMessage,
//   getConversations,
//   getConversation,
// };


const { insertMessage, selectMessages } = require('../models/messages.js'); 

const sendMessage = async (req, res) => {
  const { senderId, receiverId, messageText } = req.body;
  try {
    const message = await insertMessage(senderId, receiverId, messageText);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: "Unable to send message" });
  }
};

const getMessages = async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const messages = await selectMessages(userId, friendId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve messages" });
  }
};

module.exports = {
  sendMessage,
  getMessages
};

