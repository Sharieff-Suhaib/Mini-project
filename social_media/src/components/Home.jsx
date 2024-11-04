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
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "./Feed.css";

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    return decodedToken.user_id; 
    localStorage.setItem('user_id', decodedToken.user_id);
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

function Home(){
  const navigate = useNavigate();
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
  useEffect(() => {
    fetchPosts();
  }, []);

    console.log(userId);
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
                      <button>Go to New Post</button>
                    </Link>
                  </div>
                  {posts.map(post => (
                    <Post key={post.id} post={post} />
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