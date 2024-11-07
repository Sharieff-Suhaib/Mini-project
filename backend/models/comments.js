const pool = require('../config/db');

const createComment = async (user_id, post_id, comment_text) => {
    const result = await pool.query(
        "INSERT INTO comments (user_id, post_id, comment_text) VALUES ($1, $2, $3) RETURNING *",
        [user_id, post_id, comment_text]
    );
    return result.rows[0];
};

const findByPostId = async (post_id) => {
    const result = await pool.query(
        "SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.user_id WHERE post_id = $1",
        [post_id]
    );
    return result.rows;
};

module.exports = {
    createComment,
    findByPostId
};