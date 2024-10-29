import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Stories from "./Stories";
import Feed from "./Feed";
import Messages from "./Messages";
import Activities from "./Activities";
import { jwtDecode } from 'jwt-decode';

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

function Home(){
    const userId = getUserIdFromToken();
    console.log(userId);
    return(
        <div>
            <Navbar/>
            
            <div className="grid grid-cols-3 gap-1 col-end-1">
                
                <Sidebar/>
                
                <Feed loggedInUserId={userId}/>
                <Messages loggedInUserId={userId}/>
                
                
            </div>
            <Activities/>
        </div>
    );
}
export default Home;