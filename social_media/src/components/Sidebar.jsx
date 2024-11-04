
import React from 'react';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const navigate =useNavigate();
    const handleFriend = (e) => {
        e.preventDefault();
        navigate("/friends");
    }
    return (
        <div >
            <div >
                <div onClick={handleFriend} className="p-2 hover:bg-gray-200 rounded">Friends</div>
                <div className="p-2 hover:bg-gray-200 rounded">Groups</div>
                <div className="p-2 hover:bg-gray-200 rounded">Marketplace</div>
                <div className="p-2 hover:bg-gray-200 rounded">Watch</div>
                <div className="p-2 hover:bg-gray-200 rounded">Memories</div>
            </div>
        </div>
    );
};

export default Sidebar;

