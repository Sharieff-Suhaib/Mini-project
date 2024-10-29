import React from 'react';
import './Comment.css';

function Comment({ comment }) {
  return (
    <div className="comment">
      <p><strong>{comment.user_name}</strong> {comment.comment_text}</p>
    </div>
  );
}

export default Comment;
