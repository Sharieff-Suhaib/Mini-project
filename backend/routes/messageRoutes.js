const express = require("express");
const { sendMessage,getMessages,getConversations, getConversation } = require("../controllers/messageController"); 
const router = express.Router();

router.post("/send", sendMessage); 
// router.get("/user/:userId", getConversations);
// router.get("/:userId1/:userId2", getConversation);
router.get('/:userId/:friendId',getMessages);
module.exports = router;
