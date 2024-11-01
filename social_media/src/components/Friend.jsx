import React, { useState, useEffect } from 'react';
import { getFriends, getPendingRequests, sendFriendRequest, acceptFriendRequest, rejectFriendRequest } from '../services/api';
import './Friend.css';
import { jwtDecode } from 'jwt-decode';

const Friend = () => {
    const [username, setUsername] = useState('');
    const [friends, setFriends] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
      
        try {
          const decodedToken = jwtDecode(token);
          //console.log(decodedToken);
          return decodedToken.user_id; 
        } catch (error) {
          console.error("Failed to decode token", error);
          return null;
        }
      };

    const fetchFriends = async () => {
        const userId = getUserIdFromToken();
        try {
            //console.log(userId)
            const friendsList = await getFriends(userId);
            //console.log(friendsList);
            setFriends(friendsList);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const fetchPendingRequests = async () => {
        const userId = getUserIdFromToken();
        try {
            const requests = await getPendingRequests(userId);
            //console.log(requests);
            setPendingRequests(requests);
        } catch (error) {
            console.error('Error fetching pending requests:', error);
        }
    };

    const handleSendFriendRequest = async () => {
        const userId = getUserIdFromToken();
        try {
            await sendFriendRequest(userId, username);
            alert('Friend request sent');
            fetchPendingRequests();
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    const handleAcceptFriendRequest = async (requestId) => {
        try {
            console.log(requestId)
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

    useEffect(() => {
        fetchPendingRequests();
        fetchFriends();
    }, []);

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
                    //console.log(request.receiver_id),
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
                    console.log(friend),
                    <li key={friend.user_id} className="friend-item">{friend.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default Friend;