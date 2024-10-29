import React from 'react';

function Message({ conversation }) {
  return (
    <div className="message">
      <h3>{conversation.user_name}</h3>
      <p>{conversation.last_message}</p>
    </div>
  );
}

export default Message;
