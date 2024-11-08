import React from 'react';
import './Post.css';

function Post({ post }) {
  console.log(post);
  return (
    <div className="post">
      <div className="post-header">
        <img src={`http://localhost:5000/uploads/${post.profile_img}`} alt="Profile" className="profile-img" />
        <div className="user-info">
          <h3>{post.username}</h3>
        </div>
      </div>
      <div className="post-content">
        <p>{post.caption}</p>
        {post.image_url && <img src={`http://localhost:5000/uploads/${post.image_url}`} alt="Post" />}
      </div>
    </div>
  );
}

export default Post;