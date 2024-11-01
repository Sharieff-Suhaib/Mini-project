const Friend = require("../models/friend");

const sendFriendRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const request = await Friend.sendFriendRequest(senderId, receiverId);
    res.status(201).json({ message: 'Friend request sent', request });
  } catch (error) {
    res.status(500).json({ error: "Unable to send friend request" });
  }
};

const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;
  console.log(requestId);
  try {
    
    const request = await Friend.acceptFriendRequest(requestId);
    res.status(200).json({ message: 'Friend request accepted', request });
  } catch (error) {
    res.status(500).json({ error: "Unable to accept friend request" });
  }
};

const rejectFriendRequest = async (req, res) => {
  const { requestId } = req.body;
  try {
    const request = await Friend.rejectFriendRequest(requestId);
    res.status(200).json({ message: 'Friend request rejected', request });
  } catch (error) {
    res.status(500).json({ error: "Unable to reject friend request" });
  }
};

const listFriends = async (req, res) => {
  const { userId } = req.params;
  try {
    const friends = await Friend.listFriends(userId);
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch friends" });
  }
};

const listFriendRequests = async (req, res) => {
  const { userId } = req.params;
  try {
    const requests = await Friend.listFriendRequests(userId);
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch friend requests" });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  listFriends,
  listFriendRequests,
};