
import React from 'react';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const navigate =useNavigate();
    const handleFriend = (e) => {
        e.preventDefault();
        navigate("/friends");
    }
    const handleHome = (e) => {
        e.preventDefault();
        navigate('/home');
      }
      const handleProfile = (e) => {
        e.preventDefault();
        navigate("/profile");
      }
    return (
        <div >
            <div >
                
                <div onClick={handleHome} className="p-2 hover:bg-gray-200 rounded">Home</div>
                <div onClick={handleProfile} className="p-2 hover:bg-gray-200 rounded">Profile</div>
                <div onClick={handleFriend} className="p-2 hover:bg-gray-200 rounded">Friends</div>
            </div>
        </div>
    );
};

export default Sidebar;

