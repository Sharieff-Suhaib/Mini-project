
import React from 'react';

const Stories = () => {
    const stories = [
        { name: 'John Doe', img: 'url_to_image1' },
        { name: 'Eveline Baker', img: 'url_to_image2' },
        { name: 'Jesse George', img: 'url_to_image3' },
        { name: 'Turner Paul', img: 'url_to_image4' },
        { name: 'Marie Riddle', img: 'url_to_image5' },
    ];

    return (
        <div className="flex space-x-2 overflow-x-auto p-4">
            {stories.map((story, index) => (
                <div key={index} className="flex flex-col items-center">
                    <img
                        src={story.img}
                        alt={story.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                    />
                    <span className="text-xs mt-1">{story.name}</span>
                </div>
            ))}
        </div>
    );
};

export default Stories;

