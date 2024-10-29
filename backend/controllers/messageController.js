const Message = require("../models/messages");
const sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    const message = await Message.createMessage(senderId, receiverId, content);
    res.json({ message });
  } catch (err) {
    res.status(500).json({ error: "Unable to send message" });
  }
};

const getConversations = async (req, res) => {
  const userId = req.params.userId;
  try {
    const conversations = await Message.findConversations(userId);
    res.json({ conversations });
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch conversations" });
  }
};
const getConversation = async (req, res) => {
  const { userId1, userId2 } = req.params;
  try {
    const conversation = await Message.findConversation(userId1, userId2);
    res.json({ conversation });
  } catch (err) {
    res.status(500).json({ error: "Unable to find the conversation" });
  }
};

module.exports = {
  sendMessage,
  getConversations,
  getConversation,
};
