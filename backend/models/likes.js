const pool = require('../config/db');

const createLike = async (user_id, post_id) => {
    const result = await pool.query(
        "INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *",
        [user_id, post_id]
    );
    return result.rows[0];
};

const countLikesByPostId = async (post_id) => {
    const result = await pool.query(
        "SELECT COUNT(*) FROM likes WHERE post_id = $1",
        [post_id]
    );
    return result.rows[0].count;
};

const findLikeByUserAndPost = async (user_id, post_id) => {
    const result = await pool.query(
        "SELECT * FROM likes WHERE user_id = $1 AND post_id = $2",
        [user_id, post_id]
    );
    return result.rows[0];
};

const deleteLike = async (user_id, post_id) => {
    const result = await pool.query(
        "DELETE FROM likes WHERE user_id = $1 AND post_id = $2 RETURNING *",
        [user_id, post_id]
    );
    return result.rows[0];
};

module.exports = {
    createLike,
    countLikesByPostId,
    findLikeByUserAndPost,
    deleteLike
};