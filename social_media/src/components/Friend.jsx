import React, { useState, useEffect } from 'react';
import { getFriends, getPendingRequests, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getMessages, sendMessage } from '../services/api.js';
import './Friend.css'; 
import './Chat.css'; 
import { jwtDecode } from 'jwt-decode';

const Friend = () => {
  const [username, setUsername] = useState('');
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  console.log(pendingRequests);
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    try {
      const decodedToken = jwtDecode(token);
      //console.log(decodedToken);
      return decodedToken.user_id; 
      //localStorage.setItem('user_id', decodedToken.user_id);
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  };

  const fetchFriends = async () => {
    const userId = getUserIdFromToken();
    try {
      const friendsList = await getFriends(userId);
      setFriends(friendsList);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const fetchPendingRequests = async () => {
    const userId = getUserIdFromToken();
    try {
      const requests = await getPendingRequests(userId);
      setPendingRequests(requests);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  const handleSendFriendRequest = async () => {
    const userId = getUserIdFromToken();
    try {
      await sendFriendRequest(userId, username);
      fetchPendingRequests();
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleAcceptFriendRequest = async (requestId) => {
    try {
      console.log(requestId);
      await acceptFriendRequest(requestId);
      fetchPendingRequests();
      fetchFriends();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectFriendRequest = async (requestId) => {
    try {
      await rejectFriendRequest(requestId);
      fetchPendingRequests();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  const fetchMessages = async (friendId) => {
    const userId = getUserIdFromToken();
    try {
        console.log(friendId);
      const messages = await getMessages(userId, friendId);
      setMessages(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
console.log(pendingRequests)
  const handleSendMessage = async () => {
    const userId = getUserIdFromToken();
    try {
        console.log(selectedFriend);
      await sendMessage(userId, selectedFriend.user_id, messageText);
      
      setMessageText('');
      fetchMessages(selectedFriend.user_id);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
    fetchFriends();
  }, []);

  useEffect(() => {
    if (selectedFriend) {
      fetchMessages(selectedFriend.user_id);
    }
  }, [selectedFriend]);

  return (
    <div className="friend-container">
      <h2>Send Friend Request</h2>
      <div className="send-request">
        <input
          type="text"
          placeholder="Enter username or ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSendFriendRequest}>Send Request</button>
      </div>

      <h2>Pending Friend Requests</h2>
      <ul className="pending-requests">
        {pendingRequests.map((request) => (
          <li key={request.receiver_id} className="request-item">
            {request.sender}
            <button onClick={() => handleAcceptFriendRequest(request.receiver_id)}>Accept</button>
            <button onClick={() => handleRejectFriendRequest(request.receiver_id)}>Reject</button>
          </li>
        ))}
      </ul>

      <h2>Friends</h2>
      <ul className="friends-list">
        {friends.map((friend) => (
          <li key={friend.user_id} className="friend-item" onClick={() => setSelectedFriend(friend)}>
            {friend.username}
          </li>
        ))}
      </ul>

      {selectedFriend && (
        <div className="chat-container">
            
          <h2>Chat with {selectedFriend.username}</h2>
          <div className="messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender_id === getUserIdFromToken() ? 'sent' : 'received'}`}>
                <p>{message.message_text}</p>
                <span>{new Date(message.created_at).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
          <div className="send-message">
            <input
              type="text"
              placeholder="Type a message"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Friend;