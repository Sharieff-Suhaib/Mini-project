import React, { useState, useEffect } from 'react';
import Post from './Post';
import './Feed.css';
import { getPosts } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    return decodedToken.user_id; 
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};
function Feed() {
  const userId = getUserIdFromToken();
  const [posts, setPosts] = useState([]);
  const [caption,setCaption] = useState("");
  const [file,setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPosts = async () => {
    try{
        const data = await getPosts();
        console.log(data);
        setPosts(data.posts);
    }
    catch(error){
        console.log(error.message);
    }
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
        if (!caption || !file) {
            alert("Please provide both caption and image.");
            return;
        }
        const formData = new FormData();
        formData.append('caption',caption);
        formData.append('image',file);
        formData.append('user_id',userId);
        try{
          setIsSubmitting(true);
          const response = await axios.post('http://localhost:5000/api/posts/create',formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log("Post created successfully",response.data);
          alert("Post created successfully");
          setCaption("");
          setFile(null);
          document.getElementById("file-upload").value = null;
          fetchPosts();
        }
        catch(error){
          console.error("Error creating posts ",error);
          alert("Failed to create post ");
        }
        finally{
          setIsSubmitting(false);
        }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }
  const handleCaptionChange = async (e) =>{
    setCaption(e.target.value);
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
        <div className="file-upload-wrapper">
          <form onSubmit={handleSubmit}>
            <h3>Create a post?</h3>
            <textarea 
            value = {caption}
            placeholder="What's on your mind?"
            onChange={handleCaptionChange}
            ></textarea>
            <label htmlFor="file-upload" className="file-upload-label">
                <span className="file-upload-text">Choose File</span>
                <input onChange={handleFileChange} id="file-upload" className="file-upload-input" type="file" />
            </label>
            <button className="post-button"type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting.." : "Post"}
            </button>
          </form>
        </div>


        <div className="feed">
        {posts.map(post => (
            <Post key={post.id} post={post} />
        ))}
        </div>
    </div>
  );
}

export default Feed;
