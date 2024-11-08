import React, { useState, useEffect } from 'react';
import { toggleLike, getLikesCount } from '../services/api';
import './LikeButton.css';
import { jwtDecode } from 'jwt-decode';
const LikeButton = ({ postId }) => {
    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
    
        try {
          const decodedToken = jwtDecode(token);
          return decodedToken.user_id;
        } catch (error) {
          console.error("Failed to decode token", error);
          return null;
        }
      };
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const userId = getUserIdFromToken();
  useEffect(() => {
    getLikesCount(postId)
      .then(count => setLikesCount(count))
      .catch(error => console.error(error));
  }, [postId]);

  const handleToggleLike = () => {
    toggleLike(userId, postId)
      .then(data => {
        setLiked(data.liked);
        return getLikesCount(postId);
      })
      .then(count => setLikesCount(count))
      .catch(error => console.error(error));
  };

  return (
    <div className="like-button-container">
      <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleToggleLike}>
        ❤️ {likesCount}
      </button>
    </div>
  );
};

export default LikeButton;