import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Stories from "./Stories";
import Feed from "./Feed";
import Messages from "./Messages";
import Activities from "./Activities";
import { jwtDecode } from 'jwt-decode';
import { Link } from "react-router-dom";
import { getPosts } from "../services/api";
import Post from "./Post";
import Comment from './Comment';
import LikeButton from './LikeButton';
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "./Feed.css";

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

function Home(){
  const userId = getUserIdFromToken();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try{
        const data = await getPosts();
        setPosts(data.posts);
    }
    catch(error){
        console.log(error.message);
    }
  }
  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };
  useEffect(() => {
    fetchPosts();
  }, []);

    return(
      <div className="home">
        <div className="navbar">
            <Navbar/>
        </div>
              <div className="fullpage">
                <div className="side">
                  <Sidebar/>
                </div>
                <div className="post">
                  <div className="newpost">
                    <Link to="/post2">
                      <button>Create a new post</button>
                    </Link>
                  </div>
                  {posts.map(post => (
                    <div className="main-post-content">
                    <Post key={post.id} post={post} userId={userId} onDelete={handleDelete}/>
                    <div className="post-actions">
                      <LikeButton postId={post.id} />
                      <Comment postId={post.id}  />
                    </div>
                    </div>
                  ))}
                </div>
              </div>
                  
              <div className="activities">
                <Activities/>
              </div>
      </div>
    );
}
export default Home;