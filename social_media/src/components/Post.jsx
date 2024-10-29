import React from 'react';
import Comment from './Comment';
import './Post.css';

function Post({ post }) {
  return (
    <div className="post">
      <div className="post-header">
        <h3>{post.user_id}</h3>
      </div>
      <div className="post-content">
        <p>{post.caption}</p>
        {post.image_url && <img src={`http://localhost:5000/uploads/${post.image_url}`} alt="Post" />}
      </div>
      
    </div>
  );
}

export default Post;

