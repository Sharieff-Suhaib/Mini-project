import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { fetchCommentsByPostId, addComment } from '../services/api';
import './Comment.css';
const Comment = ({ postId }) => {
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

  const userId = getUserIdFromToken();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      fetchCommentsByPostId(postId)
        .then(data => setComments(data))
        .catch(error => console.error(error));
    }
  }, [postId, showComments]);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    addComment(userId,postId, newComment)
      .then(data => {
        setComments([...comments, data]);
        setNewComment('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="comment-section">
      <button className="toggle-comments" onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <div className="comments">
          <h3>Comments</h3>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <strong>{comment.username}</strong>: {comment.comment_text}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={handleAddComment}>Comment</button>
        </div>
      )}
    </div>
  );
};

export default Comment;