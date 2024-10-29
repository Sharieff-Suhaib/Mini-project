import React, { useState, useEffect } from 'react';
import Message from './Message';
import './Messages.css';
import { sendMessage } from '../services/api';

function Messages({ loggedInUserId }) { 
  //console.log(loggedInUserId);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState([]); 
  const [newMessage, setNewMessage] = useState('');
  const [receiverId, setReceiverId] = useState(''); 

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await fetch(`/api/conversations/user/${loggedInUserId}`); 
      const data = await response.json();
      setConversations(data.conversations);
    };
    
    fetchConversations();
  }, [loggedInUserId]);

  const loadConversation = async (userId2) => {
    const response = await fetch(`/api/conversations/${loggedInUserId}/${userId2}`);
    const data = await response.json();
    setSelectedConversation(data.conversation);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (receiverId && newMessage) {
        const messageData = {
          senderId: loggedInUserId,
          receiverId,
          content: newMessage
        };
        const response = await sendMessage(messageData);
        if (response.message) {
          setConversations(prev => [...prev, response.message]);
          loadConversation(receiverId); 
        }
        setNewMessage('');
        setReceiverId(''); 
      } else {
        alert('Please select a receiver and enter a message');
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  return (
    <div className="messages">
      <h2>Your Conversations</h2>
      
      <form onSubmit={handleSendMessage} className="send-message-form">
        <input 
          type="text" 
          placeholder="Receiver ID" 
          value={receiverId} 
          onChange={(e) => setReceiverId(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Type your message" 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          required 
        />
        <button type="submit">Send Message</button>
      </form>

      <div className="conversation-list">
        {conversations.map(convo => (
          <div key={convo.receiver_id} className="conversation" onClick={() => loadConversation(convo.receiver_id)}>
            <h3>Friend {convo.receiver_id}</h3>
            <p>Last message: {convo.message_text}</p>
          </div>
        ))}
      </div>

      <div className="selected-conversation">
        {selectedConversation.length > 0 && (
          <div>
            {selectedConversation.map(message => (
              <div key={message.id} className="message">
                <p><strong>{message.sender_id}:</strong> {message.message_text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;

