const pool = require('../config/db');

const createMessage = async (senderId, receiverId, messageText) => {
  const result = await pool.query(
    `INSERT INTO messages (sender_id, receiver_id, message_text, created_at) 
     VALUES ($1, $2, $3, NOW()) RETURNING *`,
    [senderId, receiverId, messageText]
  );
  return result.rows[0];
};
const findConversations = async (userId) => {
  const result = await pool.query(
    `SELECT DISTINCT ON (receiver_id, sender_id) 
      receiver_id, sender_id, message_text, created_at 
     FROM messages 
     WHERE sender_id = $1 OR receiver_id = $1 
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

const findConversation = async (userId1, userId2) => {
  const result = await pool.query(
    `SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2) 
     OR (sender_id = $2 AND receiver_id = $1) ORDER BY created_at`,
    [userId1, userId2]
  );
  return result.rows;
};

module.exports = {
  createMessage,
  findConversations,
  findConversation,
};
