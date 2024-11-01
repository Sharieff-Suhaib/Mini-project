import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css'; 

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [receiverId, setReceiverId] = useState('');

    const fetchMessages = async () => {
        const userId = localStorage.getItem('user_id');
        try {
            const response = await axios.get(`http://localhost:5000/api/messages/messages/${userId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        const senderId = localStorage.getItem('user_id');
        try {
            await axios.post('http://localhost:5000/api/messages/send-message', {
                sender_id: senderId,
                receiver_id: receiverId,
                content: message,
            });
            setMessage('');
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="chat">
            <h2>Chat</h2>
            <input
                type="text"
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender_id}:</strong> {msg.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;