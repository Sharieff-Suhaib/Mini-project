const pool = require('../config/db');

exports.sendFriendRequest = async (senderId, receiverId) => {
  try {
    const result = await pool.query(
      'INSERT INTO friend_requests (sender_id, receiver_id, status) VALUES ($1, $2, $3) RETURNING *',
      [senderId, receiverId, 'pending']
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.acceptFriendRequest = async (requestId) => {
    try {
      console.log(requestId);
      await pool.query('BEGIN');
      const result = await pool.query(
        'UPDATE friend_requests SET status = $1 WHERE receiver_id = $2 RETURNING *',
        ['accepted', requestId]
      );
      console.log(result);
      const acceptedRequest = result.rows[0];
      console.log(acceptedRequest);
      if (!acceptedRequest) {
        throw new Error('Friend request not found');
      }
  
      const { sender_id, receiver_id } = acceptedRequest;
  
      await pool.query(
        'INSERT INTO friends (user_id, friend_id) VALUES ($1, $2), ($2, $1)',
        [sender_id, receiver_id]
      );
  
      await pool.query('COMMIT');
  
      return acceptedRequest;
    } catch (error) {
      await pool.query('ROLLBACK');
      throw new Error(error.message);
    }
  };

exports.rejectFriendRequest = async (requestId) => {
  try {
    const result = await pool.query(
      'UPDATE friend_requests SET status = $1 WHERE receiver_id = $2 RETURNING *',
      ['rejected', requestId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.listFriends = async (userId) => {
  try {
    const result = await pool.query(
      `SELECT users.user_id, users.username FROM users
       JOIN friends ON users.user_id = friends.friend_id
       WHERE friends.user_id = $1 `,
      [userId]
    );
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.listFriendRequests = async (userId) => {
  try {
    const result = await pool.query(
      `SELECT friend_requests.receiver_id, users.username AS sender FROM friend_requests
       JOIN users ON friend_requests.sender_id = users.user_id
       WHERE friend_requests.receiver_id = $1 AND friend_requests.status = 'pending'`,
      [userId]
    );
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.getFriendPosts = async (userId) => {
  try {
    const result = await pool.query(
      `SELECT posts.*, users.username, users.profile_img FROM posts
       JOIN users ON posts.user_id = users.user_id
       WHERE posts.user_id = $1
       UNION
       SELECT posts.*, users.username, users.profile_img FROM posts
       JOIN friends ON posts.user_id = friends.friend_id
       JOIN users ON posts.user_id = users.user_id
       WHERE friends.user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};