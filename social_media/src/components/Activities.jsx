// SuggestionsSidebar.jsx
import React from 'react';

const SuggestionsSidebar = () => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="mb-4">
                <h4 className="font-bold">Suggestions For You</h4>
                <div className="flex justify-between items-center mt-2">
                    <span>Emery Farley</span>
                    <button className="text-blue-500">Follow</button>
                    <button className="text-red-500">Dismiss</button>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span>Alice Wells</span>
                    <button className="text-blue-500">Follow</button>
                    <button className="text-red-500">Dismiss</button>
                </div>
            </div>
            <div className="mb-4">
                <h4 className="font-bold">Latest Activities</h4>
                <p>Andrea changed their cover picture - 1 min ago</p>
                <p>Leland Walker liked a post - 1 min ago</p>
            </div>
            <div>
                <h4 className="font-bold">Online Friends</h4>
                <p>Collins Fischer</p>
                <p>Christena Mills</p>
            </div>
        </div>
    );
};

export default SuggestionsSidebar;
